var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./modules/stack-overflow/routes');
var gitRouter = require('./modules/github/routes');
var mediumRouter = require('./modules/medium/routes');
var userRouter = require('./modules/user/routes');

const mongo = require('./models/mongodb/connect');
const passportLocal = require('./modules/common/auth/passport-local');
const passportJWT = require('./modules/common/auth/passport-jwt');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/github', gitRouter);
app.use('/medium', mediumRouter);
app.use('/user', userRouter);

module.exports = app;
