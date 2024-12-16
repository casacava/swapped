// express server

const express = require('express')
const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
const User = require('./models/User')
// const router = express.Router
const authRoutes = require('./routes/authRoutes')

// middleware
app.use(express.json()) // to parse JSON requests

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

// Sign-Up Route
app.use(authRoutes)

module.exports = router

// connect to MongoDB
const dbURI = process.env.MONGO_URI || 'mongodb+srv://cassiopeiacavazos:XQxtEBiTgMSPCuWv@swappedcluster.ibrp7.mongodb.net/?retryWrites=true&w=majority&appName=SwappedCluster';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use(authRoutes);

app.get('/', (req, res) => {
  res.send('Swapped is running!')
});


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
