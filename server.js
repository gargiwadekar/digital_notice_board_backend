const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoute = require('./routes/auth');
const noticeRoute = require('./routes/notice');
const usersRoute = require('./routes/users'); // Added to fix missing module error

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/notices', noticeRoute);
app.use('/api/users', usersRoute); // Added route

// Default root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
