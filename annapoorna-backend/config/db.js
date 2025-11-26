const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/annapoorna';
  
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('\n💡 Tip: If connecting to MongoDB fails:');
    console.log('   1. For Atlas: Ensure MONGO_URI is correct and Atlas IP whitelist includes your IP');
    console.log('   2. For local: Ensure MongoDB is running locally (mongod) on port 27017');
    console.log('   3. You can override MONGO_URI in .env to use mongodb://localhost:27017/annapoorna\n');
    process.exit(1);
  }
};

module.exports = connectDB;