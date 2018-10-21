const express = require('express');
const router = express.Router();
const routes = require('./index');
const passport = require('passport');

router.post('/login', routes.login);
router.get('/profile/', passport.authenticate('jwt', {session: false}), routes.profile);
router.post('/register', routes.register);

module.exports = router;