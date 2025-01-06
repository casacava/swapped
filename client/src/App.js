import React from "react"
import './css/App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Layout from './js/Layout'
import LandingPage from "./js/LandingPage"
import AboutPage from "./js/AboutPage"
import ContactPage from "./js/ContactPage"
import SignIn from "./js/SignIn"
import SignUp from "./js/SignUp"
import SkillsSelection from "./js/SkillsSelection"


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

          {/* Sign in */}
          <Route path="/signin" element={<SignIn />} />

          {/* Sign up */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/skills" element={<SkillsSelection />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App