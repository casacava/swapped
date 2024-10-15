import React from "react"
import "./LandingPage.css"

const LandingPage = () => {
  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">
          <h1>Swapped</h1>
        </div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-buttons">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Swap Skills, Learn New Things</h1>
          <p>Connect with others, teach or learn new skills without paying a cent.</p>
          <button className="cta-btn">Get Started</button>
        </div>
        <div className="hero-image">
          <img src="/images/hero-img.png" alt="Swapping skills" />
        </div>
      </section>

      <section id="about" className="about-section">
        <h2>About Swapped</h2>
        <p>Swapped is a platform for people to exchange their skills with others. Whether you want to teach or learn, this is the place to make it happen!</p>
      </section>

      <footer className="footer">
        <p>© 2024 Swapped. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage