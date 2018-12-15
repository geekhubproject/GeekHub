const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  // _id: String,
  user_id: String,
  score: String,
  createdAt: Number,
  updatedAt: Number,
  subtitle: String,
  tags: String,
  readingTime: Number,
  totalClapCount: Number,
});

module.exports = mongoose.model('so', schema);
