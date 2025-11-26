const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const User = require('../models/User');

router.get('/unverified-ngos', [auth, admin], async (req, res) => {
  try {
    const ngos = await User.find({ 
      role: 'receiver', 
      isVerified: false,
      ngoDocumentUrl: { $ne: null } 
    }).select('-password'); 
    res.json(ngos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.put('/verify-ngo/:id', [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isVerified = true;
    await user.save();

    res.json({ message: 'User verified successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;