const mongoose = require('mongoose');
// const validator = require('validator');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  data: {
    type: JSON,
  }
});

module.exports = mongoose.model('notes', schema);