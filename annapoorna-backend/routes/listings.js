const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const FoodListing = require('../models/FoodListing');
const upload = require('../middleware/upload');

router.post(
  '/create',
  auth,
  upload.single('foodImage'),
  async (req, res) => {
    if (req.user.role !== 'donor') {
      return res.status(403).json({ message: 'Authorization denied. Only donors can create listings.' });
    }

    try {
      const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;
      
      let locationData = req.body.location;
      if (typeof locationData === 'string') {
        try {
          locationData = JSON.parse(locationData);
        } catch (e) {
          console.error("Location parse error", e);
        }
      }

      const newListing = new FoodListing({
        user: req.user.id,
        title: req.body.title,
        quantity: req.body.quantity,
        type: req.body.type || 'Other',
        expiry: req.body.expiry,
        location: locationData, 
        image: imagePath,
        status: 'available',
        claimedBy: null
      });

      const listing = await newListing.save();
      res.json(listing);

    } catch (err) {
      console.error("Listing Error:", err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/donor', auth, async (req, res) => {
  try {
    const listings = await FoodListing.find({ user: req.user.id }).sort({ datePosted: -1 });
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/explore', auth, async (req, res) => {
  try {
    const listings = await FoodListing.find({ 
      status: 'available',
      user: { $ne: req.user.id } 
    })
    .sort({ datePosted: -1 })
    .populate('user', ['name', 'phone']);

    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/claim/:id', auth, async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id);
    
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    if (listing.status !== 'available') return res.status(400).json({ message: 'Listing already claimed' });
    if (listing.user.toString() === req.user.id) return res.status(400).json({ message: 'Cannot claim your own listing' });

    listing.status = 'claimed';
    listing.claimedBy = req.user.id;
    listing.claimedAt = Date.now();
    
    await listing.save();
    res.json({ success: true, listing });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/claimed', auth, async (req, res) => {
  try {
    const listings = await FoodListing.find({ claimedBy: req.user.id })
      .sort({ claimedAt: -1 })
      .populate('user', ['name', 'phone']);
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id).populate('user', ['name', 'email']);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    if (err.kind === 'ObjectId') return res.status(404).json({ message: 'Listing not found' });
    res.status(500).send('Server Error');
  }
});

module.exports = router;