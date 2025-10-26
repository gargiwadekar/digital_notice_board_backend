const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, length: 10 },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
