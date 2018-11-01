const express = require('express');
const router = express.Router();
const medium = require('../medium/index');

router.get('/top-stories', medium.topStories);
router.get('/top-stories/:limit', medium.topStories);
router.get('/top-stories/next/:next', medium.topStories);
// router.get('/gen-stories', routes.genDocuments);

module.exports = router;
