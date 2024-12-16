const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const router = express.Router()

// sign up
router.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, bio, location } = req.body

  try {
    const existingUser = await User.findOne({ email})
    if (existingUser) {
      return res.status(400).json({ message: 'email already exists!'})
    }
  

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    bio,
    location
  })

  await newUser.save()
  res.status(201).json({ message: 'user created successfully!'})
} catch (error) {
  res.status(500).json({ message: 'server error', error})
}
})

module.exports = router