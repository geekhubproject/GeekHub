const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const uuid = require('uuid/v4');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./modules/stack-overflow/routes');
const gitRouter = require('./modules/github/routes');
const mediumRouter = require('./modules/medium/routes');
const userRouter = require('./modules/user/routes');

const mongoose = require('./models/mongodb/connect');
const passportLocal = require('./modules/common/auth/passport-local');
const passportJWT = require('./modules/common/auth/passport-jwt');

const app = express();

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware');
    console.log(req.sessionID);
    return uuid(); // use UUIDs for session IDs
  },
  store: new MongoStore({ mongooseConnection: mongoose.connection , ttl: 24 * 60 * 60}),
  secret: 'keyboard cat',
  resave: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
  saveUninitialized: true,
}));

app.use(logger('dev'));
app.use(cors({origin: 'geek-hub.herokuapp.com', credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());



// app.use('/', indexRouter);
app.use('/github', gitRouter);
app.use('/medium', mediumRouter);
app.use('/user', userRouter);


module.exports = app;
