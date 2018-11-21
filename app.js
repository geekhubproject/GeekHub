const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./modules/stack-overflow/routes');
const gitRouter = require('./modules/github/routes');
const mediumRouter = require('./modules/medium/routes');
const userRouter = require('./modules/user/routes');

const mongo = require('./models/mongodb/connect');
const passportLocal = require('./modules/common/auth/passport-local');
const passportJWT = require('./modules/common/auth/passport-jwt');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/github', gitRouter);
app.use('/medium', mediumRouter);
app.use('/user', userRouter);

module.exports = app;
