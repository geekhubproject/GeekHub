const mongoose = require('mongoose');

const githubSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    description: String,
    created_at: String,
    language: String,
    updated_at: String,
    tags_url: String,
    link: String,
    stars: Number,
    forks: Number,
});

module.exports = mongoose.model('github', githubSchema);