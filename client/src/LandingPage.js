import React from "react"
import { Link } from "react-router-dom"
import "./LandingPage.css"
import heroImage from './assets/hero-image.jpg'
import "./ContactPage.css"


const landingPage = () => {
  return (
  <div className="landing-container">
    <section className="hero">
      <div className="hero-content">
        <h1>Swap Skills, Learn New Things</h1>
        <p>Connect with others, teach or learn new skills without paying a cent</p>
        <button className="cta-btn">Get Started</button>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="Swapping skills" />
      </div>
    </section>

    <section id="about" className="about-section">
      <h2>About Swapped</h2>
      <p>Swapped is a platform for people to exchange their skills with others. Whether you want to teach or learn, this is the place to do it. </p>
    </section>
  </div>
  )
}
export default landingPage