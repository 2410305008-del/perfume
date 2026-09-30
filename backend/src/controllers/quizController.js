const { readData } = require('../utils/storage');

const getQuizRecommendation = async (req, res) => {
  try {
    const { vibe, occasion } = req.body;
    const products = await readData('products.json', []);

    let match = products.find(p => p.quizVibe === vibe);
    if (!match) {
      match = products.find(p => p.quizOccasion === occasion) || products[0];
    }

    res.json({
      success: true,
      matchScore: '98%',
      recommendation: match
    });
  } catch (error) {
    console.error('Error calculating recommendation:', error);
    res.status(500).json({ success: false, message: 'Error calculating recommendation' });
  }
};

module.exports = {
  getQuizRecommendation
};
