import React from "react"
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from './Layout'
import LandingPage from "./LandingPage"
import AboutPage from "./AboutPage"
import ContactPage from "./ContactPage"


function App() {
  return (
    <Router>
      <Routes>
        {/* All pages should be wrapped in Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          
          {/* About page */}
          <Route path="/about" element={<AboutPage />} />

          {/* Contact page */}
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App