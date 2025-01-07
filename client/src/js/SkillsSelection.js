import React, { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import "../css/SkillsSelection.css"
import { useNavigate } from 'react-router-dom'

const SkillsSelection = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { userId } = location.state || {} //retrieve userId
  
  const [skills, setSkills] = useState([])
  const allSkills = [
    'yoga',
    'pilates',
    'physical training',
    'spanish',
    'english',
    'knitting',
    'painting',
    'sculpting',
    'math',
    'physics',
    'science',
    'reading + writing',
    'cooking'
  ]

  const handleCheckboxChange = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill)) //remove skill 
    } else {
      setSkills([...skills, skill]) // add skill
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/skills', { userId, skills})
      alert(res.data.message)
      navigate('/home') //redirects user to home after selecting skills
    } catch (error) {
      console.error(error)
      alert('error updating skills, try again')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Select Skills</h2>
      {allSkills.map((skill) => (
        <label key={skill}>
          <input
          type="checkbox"
          value={skill}
          onChange={() => handleCheckboxChange(skill)}
          />
          {skill}
        </label>
      ))}
      <button type='submit'>Save Skills</button>
    </form>
  )
}

export default SkillsSelection