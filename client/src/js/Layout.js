import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AuthContext } from './AuthContext'
// import './Layout.css'

let Layout = () => {

  const { isSignedIn } = useContext(AuthContext)
  return (
    <div className="layout">
      <header className="header">
        <nav className="navbar">
          <div className="logo">
          <h1><Link to="/">Swapped</Link></h1>
          </div>
          <ul className="nav-links">
            <li><Link to="/home">Home</Link></li>
            {isSignedIn ? (
              <>
                <li><Link to="/messages">Message</Link></li>
                <li><Link to="/profile">Profile</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </>
            )}
          </ul>
          {!isSignedIn && (
            <div className="nav-buttons">
              {/* Update Login button to link to /signin */}
              <Link to="/signin" className="login-btn">Sign in</Link>
              <Link to="/signup" className='signup-btn'>Sign up</Link>
            </div>
          )}
        </nav>
      </header>

    
      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>&copy; 2024 Swapped. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout