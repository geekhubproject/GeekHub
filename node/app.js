var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/stack-overflow');
var gitRouter = require('./routes/github');
var mediumRouter = require('./routes/medium');

const mongo = require('./models/mongodb/connect');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/github', gitRouter);
app.use('/medium', mediumRouter);

module.exports = app;
