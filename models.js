// Create a user model that will be used to store user data. The user model should have the following properties:
// - username
// - firstName
// - lastName
// - email
// - password
// - profileImage
// - isLoggedIn
// - isVerified
// - tweets
// The tweets property should be an array of objects with the following properties:
// - tweetContent

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String, required: false },
  isLoggedIn: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  tweets: [
    {
      tweetContent: { type: String },
      timeStamp: { type: Date, default: Date.now }
    }
  ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
