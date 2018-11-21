const mongoose = require('mongoose');
// const validator = require('validator');

const schema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  bookmarks: {
    type: Array,
  },
  notes: {
    type: Array
  },
  shared: {
    type: Array
  }

});

module.exports = mongoose.model('user', schema);