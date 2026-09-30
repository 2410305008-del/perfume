const { readData, writeData } = require('../utils/storage');

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email address is required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const subscribers = await readData('subscribers.json', []);

    if (subscribers.some(s => s.email === cleanEmail)) {
      return res.json({
        success: true,
        message: 'You are already a distinguished member of our Private Atelier circle!'
      });
    }

    subscribers.push({
      email: cleanEmail,
      subscribedAt: new Date().toISOString()
    });

    await writeData('subscribers.json', subscribers);
    console.log(`[Newsletter] Subscribed: ${cleanEmail}`);

    res.status(201).json({
      success: true,
      message: 'Welcome to the Private Circle. Your 10% voucher code SCENT10 is active.'
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ success: false, message: 'Error subscribing to newsletter' });
  }
};

module.exports = {
  subscribeNewsletter
};
