const mongoose = require('mongoose');

const FoodListingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  quantity: { type: String, required: true },
  type: {
    type: String,
    // ✅ Added 'Other' to match routes/listings.js default
    enum: ['Veg', 'Non-Veg', 'Other', 'Fruit', 'Bakery'], 
    required: true,
  },
  expiry: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String },
  // ✅ Updated location structure to match most map libraries
  location: {
    lat: Number,
    lng: Number,
    address: String,
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'picked_up', 'expired'],
    default: 'available',
  },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  claimedAt: { type: Date }, // Renamed from claimDate to match routes
  datePosted: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FoodListing', FoodListingSchema);