import React, { useState } from 'react'
import axios from 'axios'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/signin', { email, password })
      localStorage.setItem('token', response.data.token)
      alert('signed in successfully')
    } catch (err) {
      setError(err.response?.data?.message || 'an error was found, try agin')
    }
  }


return (
  <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px'}}>
    <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Sign In</button>
            </form>
  </div>
)
}

export default SignIn