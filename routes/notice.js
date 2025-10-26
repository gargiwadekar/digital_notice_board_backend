const router = require('express').Router();
const Notice = require('../models/Notice');
const jwt = require('jsonwebtoken');

// Auth middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};

// Get all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Add notice
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ error: "Title & Description required" });

    const newNotice = new Notice({ title, description, createdBy: req.userId });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete notice
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Notice deleted" });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
