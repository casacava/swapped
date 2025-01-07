import React from 'react'
import { Link } from 'react-router-dom'
import "../css/HomePage.css"

const HomePage = () => {
  return (
    <div id="homepage-container">
      <header>
        <nav>
          <ul id="homepage-nav">
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/message">Message</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>
      <main id="homepage-content">
        <h1>Welcome to Swapped!</h1>
        <p>Explore skill swaps, connect with others, and grow your expertise.</p>
      </main>
    </div>
  )
}

export default HomePage