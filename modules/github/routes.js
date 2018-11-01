const express = require('express');
const router = express.Router();
const routes = require('./index');

router.get('/top-stories', routes.topStories);
router.get('/top-stories/:limit', routes.topStories);
router.get('/top-stories/next/:next', routes.topStories);
// router.get('/gen-stories', routes.genDocuments);

module.exports = router;
