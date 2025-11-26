const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['donor', 'receiver', 'admin'],
    default: 'donor',
  },
  // ✅ Added missing fields required by auth.js
  phone: { 
    type: String, 
    default: '' 
  },
  address: { 
    type: String, 
    default: '' 
  },
  ngoDocumentUrl: { 
    type: String 
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  avatar: {
    type: String, 
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);