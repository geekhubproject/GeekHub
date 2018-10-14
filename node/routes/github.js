const express = require('express');
const router = express.Router();
const github = require('../apps/github');

/* GET users listing. */
router.get('/git-top-stories', github.topStories);
router.get('/git-gen-stories', github.genDocuments);

module.exports = router;
