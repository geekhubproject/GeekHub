const express = require('express');
const router = express.Router();
const github = require('../apps/github');
const medium = require('../apps/medium');

/* GET users listing. */
router.get('/medium-top-stories', github.topStories);
router.get('/medium-gen-stories', medium.genDocuments);

module.exports = router;
