const mongoose = require('mongoose');

const FoodListingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Veg', 'Non-Veg'],
    required: true,
  },
  expiry: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,
  },
  location: {
    address: String,
    latitude: Number,
    longitude: Number,
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'picked_up', 'expired'],
    default: 'available',
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  claimDate: {
    type: Date,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('FoodListing', FoodListingSchema);