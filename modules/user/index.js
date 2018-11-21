const config = require('../../config');
const uuidv4 = require('uuid/v4');
const hash = require('../common/auth/bcrypt');
const Users = require('./schema');
const Medium = require('../medium/schema');
const GitHub = require('../github/schema');
const Notes = require('./notes_shema');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const login = (req, res) => {
  passport.authenticate('local', { session: false },
    (error, user, info) => {
      if (error || !user)
        res.status(400).json(info);
      else{
        const payload = {
          username: user.username,
          expires: Date.now() + config.jwt.expires,
        };

        /** assigns payload to req.user */
        req.login(payload, {session: false}, (error) => {
          if (error) {
            res.status(400).send({error});
          }
          const token = jwt.sign(JSON.stringify(payload), config.jwt.secret);

          /** assign our jwt to the cookie */
          res.cookie('jwt', token, {httpOnly: true, secure: true});
          res.status(200).json({token});
        });
      }
    }
  )(req, res);
};

const profile = (req, res) => {
  const { user } = req;
  res.status(200).send({ user });
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
    console.log(e);
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


const updateBookmark = async (model, info, callback) => {
  const {action, type, username, id} = {...info};
  let result = '';
  if(action === 'delete'){
    result =  await model.findById(id, function(err, doc) {
      if(!err){
        Users.findOne({username},{password:0}, function(err, record) {
          if(err){
            callback(null);
          }
          const index = _.findIndex(record.bookmarks, {type, id});
          if(index >= 0){
            record.bookmarks = _.filter(record.bookmarks, data =>
              data.id !== record.bookmarks[index].id
            );
            record.save();
            callback(record);
          }
          else{
            callback(null);
          }
        });
      }
      else{
        callback(null);
      }
    });
  }
  else if(action === 'add'){
    await model.findById(id, function(err, doc) {
      if(!err){
        Users.findOne({username},{password:0}, function(err, record) {
          if(err) {
            callback(null);
          }
          else{
            if((_.findIndex(record.bookmarks, {type, id})) === -1){
              record.bookmarks.push({type, id});
              record.save();
              callback(record);
            }
            else{
              callback(null);
            }
          }
        });
      }
      else{
        callback(null);
      }
    });
  }
};


const bookmark = async (req, res) => {
  let model = GitHub;
  if(req.body.type === 'medium') model = Medium;
  await updateBookmark(model, req.body, (record)=> {
    if(!record) res.sendStatus(404);
    else res.status(200).json({status:200, record});
  });
};

const getBookmarks = async (req, res) => {
  let bookmarks = await Users.findOne({username:req.params.username}, 'bookmarks');
  bookmarks = JSON.parse(JSON.stringify(bookmarks.bookmarks)  );
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
    Users.findOne({username:req.body.username}, (err, user) => {
      user.notes.push(doc.id);
      user.save();
      res.json({status:201, result:user});
    });
  });
};

const editNote = (req, res) => {
  const {username, title, data, id} = req.body;
  Users.findOne({$and:[{username},{notes:{'$in':id}}]}, {password:0}, (err, doc) => {
    if(!err){
      Notes.findOneAndUpdate({_id:id}, {title, data}, (err, record) => {
        if(!err){
          res.status(200).json({status:200, msg:'Updated'});
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

const listNotes = (req, res) => {
  Users.findOne({username:req.params.username}, (err, user) => {
    let notes = user.notes;
    Notes.find({_id:{'$in':notes}}, (err, docs) => {
      res.json({notes: docs});
    });
  });
};

module.exports = {
  login,
  profile,
  register,
  bookmark,
  getBookmarks,
  createNote,
  listNotes,
  editNote
};