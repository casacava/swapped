const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Store hashed password
  bio: { type: String }, // Optional
  location: { type: String }, // Optional
  skills: [String],
  created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
