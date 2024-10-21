import React from "react"
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LandingPage from "./LandingPage"
import AboutPage from "./AboutPage"
import ContactPage from "./ContactPage"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  )
}

export default App