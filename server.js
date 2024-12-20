// express server

const express = require('express')
const mongoose = require ('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const path = require('path')
const User = require('./models/User')
const authRoutes = require('./routes/authRoutes')

const app = express()
const PORT = process.env.PORT || 3000

require('dotenv').config()

// middleware
app.use(express.json()) // to parse JSON requests
app.use(cors())

// Sign-Up Route
app.use(authRoutes)


// connect to MongoDB
const dbURI = process.env.MONGO_URI
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
