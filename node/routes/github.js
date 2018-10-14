const express = require('express');
const router = express.Router();
const github = require('../apps/github');

router.get('/top-stories', github.topStories);
router.get('/top-stories/:limit', github.topStories);
router.get('/gen-stories', github.genDocuments);

module.exports = router;
