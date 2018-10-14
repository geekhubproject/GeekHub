const express = require('express');
const router = express.Router();
const github = require('../apps/github');
const medium = require('../apps/medium');

router.get('/top-stories', github.topStories);
router.get('/top-stories/:limit', github.topStories);
router.get('/gen-stories', medium.genDocuments);

module.exports = router;
