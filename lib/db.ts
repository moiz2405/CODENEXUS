const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://moiz:Getaplace@codenexus.e9xyi.mongodb.net/?retryWrites=true&w=majority&appName=CodeNexus'; // Replace with your URI

async function connectMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports = { connectMongoDB };
