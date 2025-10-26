const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoute = require('./routes/auth');
const noticeRoute = require('./routes/notice');
const usersRoute = require('./routes/users');

dotenv.config(); // Load environment variables
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/notices', noticeRoute);
app.use('/api/users', usersRoute);

// Default root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
