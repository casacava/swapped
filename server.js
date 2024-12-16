// express server

const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
const User = require('./models/User') // example user

// middleware
app.use(express.json()) // to parse JSON requests

app.get('/', (req, res) => {
  res.send('Swapped is running!')
});

// Sign-in route
app.post('/api/auth/signin', async (req, res) => {
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

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
