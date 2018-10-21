const express = require('express');
const router = express.Router();
const github = require('../github/index');

router.get('/top-stories', github.topStories);
router.get('/top-stories/:limit', github.topStories);
// router.get('/gen-stories', routes.genDocuments);

module.exports = router;
