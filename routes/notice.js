const router = require('express').Router();
const Notice = require('../models/Notice');

// GET all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().populate('createdBy', 'username email');
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// POST new notice
router.post('/', async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
    const notice = new Notice({ title, description, createdBy });
    await notice.save();
    res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
