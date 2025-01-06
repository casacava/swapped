const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router()

// sign up router
router.post('/api/auth/signup', async (req, res) => {
  console.log('Signup route hit')
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
  console.error('Error during signup:', error)
  res.status(500).json({ message: 'server error', error})
}
})

// handles skill selection + updates user profile
router.post('/api/auth/skills', async (req, res) => {
  const { userId, skills } = req.body

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' })

    user.skills = skills // Update skills
    await user.save()

    res.status(200).json({ message: 'Skills updated successfully!', user })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})


// Sign-in route
router.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }); // Fetch user from database
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
})

module.exports = router