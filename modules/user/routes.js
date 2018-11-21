const express = require('express');
const router = express.Router();
const routes = require('./index');
const passport = require('passport');

router.post('/login', routes.login);
router.get('/profile/', passport.authenticate('jwt', {session: false}), routes.profile);
router.post('/register', routes.register);
router.put('/bookmark', routes.bookmark);
router.get('/bookmark/:username', routes.getBookmarks);
router.post('/note', routes.createNote);
router.get('/note/:username', routes.listNotes);
router.put('/note', routes.editNote);

module.exports = router;