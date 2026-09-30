const { readData, writeData } = require('../utils/storage');

const submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, inquiryNature, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    const inquiry = {
      id: `INQ-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      phone: (phone || '').trim(),
      inquiryNature: inquiryNature || 'Personal Fragrance Consultation',
      message: message.trim(),
      status: 'received'
    };

    const inquiries = await readData('inquiries.json', []);
    inquiries.unshift(inquiry);
    await writeData('inquiries.json', inquiries);

    console.log(`[Inquiry Received] From ${inquiry.name} (${inquiry.email})`);

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received by our master atelier. We shall respond within 24 hours.',
      inquiry
    });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ success: false, message: 'Error submitting inquiry' });
  }
};

const getInquiries = async (req, res) => {
  try {
    const inquiries = await readData('inquiries.json', []);
    res.json({ success: true, count: inquiries.length, inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ success: false, message: 'Error retrieving inquiries' });
  }
};

module.exports = {
  submitInquiry,
  getInquiries
};
