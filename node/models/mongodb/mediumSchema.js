const mongoose = require('mongoose');

const mediumSchema = new mongoose.Schema({
    // _id: String,
    creatorId: String,
    title: String,
    createdAt: Number,
    updatedAt: Number,
    subtitle: String,
    tags: String,
    readingTime: Number,
    totalClapCount: Number,
});

module.exports = mongoose.model('medium', mediumSchema);