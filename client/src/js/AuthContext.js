import React, { createContext, useState, useEffect } from 'react'
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(!!localStorage.getItem('token'))

  useEffect(() =>{
    const handleStorageChange = () => {
      setIsSignedIn(!!localStorage.getItem('token'))
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  )
}