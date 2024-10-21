// src/ContactPage.js

import React, {useState} from 'react'
import './ContactPage.css'

let ContactPage = () => {
  let [formData, setFormData] = useState({ name: '', email: '', message: ''})

  let handleChange =(e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  let handleSubmit =(e) => {
    e.preventDefault()
    console.log('Form Data', formData)
    //gotta add functionality here to send form data to server, email, idk figure it out later
  }

  return (
    <div className='contact-container'>
      <h1>Contact Us</h1>
      <p>If you have any questions or inquiries, feel free to reach out using the form below</p>
      <form onSubmit={handleSubmit} className='contact-form'>

        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='message'>Message</label>
          <input
          type="text"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
          />
        </div>
        <button type="submit" className='submit-btn'>Send Message</button>
      </form>
    </div>
  )
}

export default ContactPage