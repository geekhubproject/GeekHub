const hash = require('../common/auth/bcrypt');
const Users = require('./schema');
const Medium = require('../medium/schema');
const GitHub = require('../github/schema');
const Notes = require('./notes_shema');
const passport = require('passport');
const _ = require('lodash');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const login = (req, res) => {
  passport.authenticate('local',
    (error, user, info) => {
      if (error || !user) res.status(400).json(info);

      /** assigns payload to req.user */
      req.login(user, (error) => {
        if (error) {
          res.status(400).json({error});
        }
        res.sendStatus(200);
      });
    }
  )(req, res);
};

const logout = (req, res) => {
  req.logout();
  res.sendStatus(200);
};

const profile = (req, res) => {
  res.status(200).json(req.user);
};

const register = async (req, res) => {
  try {
    const {username, password, email} = {...req.body};
    if(await checkUser({username})) return res.json({msg:'user already exists'});
    if(await checkUser({email})) return res.json({msg:'Email id already exists'});
    const passwordHash = await hash.genHash(password);
    const user = new Users({
      username,
      password: passwordHash,
      email
    });
    await user.save();
    res.json('Sign up successful');
  }
  catch (e) {
    res.send('form should have all the properties');
  }
};

const checkUser = async (obj) => {
  return Users.findOne(obj,{ password: 0 });
};

const checkAvail = async (username, email) => {
  return await Users.findOne({$or:[{email},{username}]});
};

const validateUser = async (username, password) => {
  const user = await checkUser(username);
  if(user){
    return await hash.verifyHash(password, user.password);
  }
  else{
    return false;
  }
};


const updateBookmark = async (Model, info) => {
  const {action, type, user, id} = {...info};
  let bookmarks = [];
  if(action === 'delete'){
    const index = _.findIndex(user.bookmarks, {type, id});
    if(index >= 0){
      bookmarks = _.filter(user.bookmarks, data =>
        data.id !== user.bookmarks[index].id
      );
    }
    else return false;
  }
  else if(action === 'add'){
    user.bookmarks.push({type, id});
    bookmarks = user.bookmarks;
  }
  await Users.findByIdAndUpdate(user._id, { bookmarks });
  return true;
};


const bookmark = async (req, res) => {
  let model = GitHub;
  if(req.body.type === 'medium') model = Medium;
  const result = await updateBookmark(model, {user:req.user,...req.body});
  if(result) res.sendStatus(200);
  else res.sendStatus(400);
};

const getBookmarks = async (req, res) => {
  const bookmarks = req.user.bookmarks;
  let gitBookmarks =  [];
  let mediumBookmarks = [];
  bookmarks.map(bookmark => {
    if(bookmark.type === 'github') gitBookmarks.push(bookmark.id);
    else mediumBookmarks.push(bookmark.id);
  });
  let result = [];
  result = result.concat(await GitHub.find({_id:{'$in':gitBookmarks}}));
  result = result.concat(await Medium.find({_id:{'$in':mediumBookmarks}}));
  return res.status(200).json({result});
};

const createNote = (req, res) => {
  const note = new Notes({
    title: req.body.title,
    data: req.body.data
  });
  note.save((err, doc) => {
    Users.findById(req.user._id, (err, user) => {
      user.notes.push(doc.id);
      user.save();
      res.json({status:201, result:user});
    });
  });
};

const editNote = (req, res) => {
  const {id, ...updateInfo} = req.body;
  Users.findOne({$and:[{_id:req.user._id}, {notes:{'$in':id}}]}, {password:0}, (err, doc) => {
    if(!err){
      Notes.findByIdAndUpdate(id, {...updateInfo}, (err) => {
        if(!err){
          res.sendStatus(200);
        }
        else{
          res.sendStatus(400);
        }
      });
    }
    else{
      res.sendStatus(400);
    }
  });
};

const listNotes = async (req, res) => {
  const notes = await Notes.find({_id:{'$in':req.user.notes}});
  res.status(200).json({notes});
};

const deleteNote = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const index = user.notes.find(note => true);
  if(index){
    const notes = _.filter(user.notes, note => note !== id);
    await Users.findByIdAndUpdate(user._id, {notes});
    res.sendStatus(200);
  }
  else res.sendStatus(404);
};

module.exports = {
  login,
  logout,
  profile,
  register,
  bookmark,
  getBookmarks,
  createNote,
  listNotes,
  editNote,
  deleteNote
};