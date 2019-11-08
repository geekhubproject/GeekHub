const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const uuid = require('uuid/v4');
const MongoStore = require('connect-mongo')(session);

const gitRouter = require('./modules/github/routes');
const mediumRouter = require('./modules/medium/routes');
const userRouter = require('./modules/user/routes');

const mongoose = require('./models/mongodb/connect');
const passportLocal = require('./modules/common/auth/passport-local');

const app = express();

app.use(session({
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  secret: 'keyboard cat',
  resave: false,
  cookie: {
    expires: (() => {
      const d = new Date();
      return d.setFullYear(d.getFullYear() + 5)
    })(),
    secure: true,
    sameSite: 'none',
    httpOnly: false
  },
  saveUninitialized: false,
}));

app.use(logger('dev'));
app.use(cors({
  origin: ['http://geek-hub.herokuapp.com', 'https://geek-hub.herokuapp.com', 'http://localhost:8080'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


// app.use('/', indexRouter);
app.use('/github', gitRouter);
app.use('/medium', mediumRouter);
app.use('/user', userRouter);


module.exports = app;
