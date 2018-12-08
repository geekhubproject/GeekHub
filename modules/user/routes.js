const express = require('express');
const router = express.Router();
const routes = require('./index');
const middleware  = require('./middleware');
const {authenticate} = middleware;
const parser = require('./../../config/cloudinary');

router.post('/login', routes.login);
router.delete('/logout', routes.logout);
router.get('/profile', authenticate, routes.profile);
router.post('/register', authenticate, routes.register);
router.put('/bookmark', authenticate, routes.bookmark);
router.get('/bookmark', authenticate, routes.getBookmarks);
router.post('/note', authenticate, routes.createNote);
router.get('/note', authenticate, routes.listNotes);
router.put('/note', authenticate, routes.editNote);
router.delete('/note/:id', authenticate, routes.deleteNote);
router.post('/image', parser.single('image'), routes.uploadImage);

module.exports = router;
