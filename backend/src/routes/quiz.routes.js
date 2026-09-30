const express = require('express');
const router = express.Router();
const { getQuizRecommendation } = require('../controllers/quizController');

router.post('/recommend', getQuizRecommendation);

module.exports = router;
