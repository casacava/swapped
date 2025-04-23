'use client'

import { useState } from 'react'
import UsernameInput from '@/components/UsernameInput'
import GenderSelect from '@/components/GenderSelect'
import BioInput from '@/components/BioInput'
import SkillsMultiSelect from '@/components/SkillsMultiSelect'
import ZipcodeInput from '@/components/ZipcodeInput'


export default function OnboardingPage() {
  const [username, setUsername] = useState('')
  const [gender, setGender] = useState('')
  const [bio, setBio] = useState('')
  const [skillsOffered, setSkillsOffered] = useState<string[]>([])
  const [skillsWanted, setSkillsWanted] = useState<string[]>([])
  const [zipcode, setZipcode] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ username }) // eventually submit this to Supabase
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create your profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <UsernameInput value={username} onChange={setUsername} />
        <GenderSelect value={gender} onChange={setGender} />
        <BioInput value={bio} onChange={setBio} />
        <SkillsMultiSelect
          label="Skills You Can Offer"
          selectedSkills={skillsOffered}
          onChange={setSkillsOffered}
        />

        <SkillsMultiSelect
          label="Skills You Want to Learn"
          selectedSkills={skillsWanted}
          onChange={setSkillsWanted}
        />
        <ZipcodeInput value={zipcode} onChange={setZipcode} />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Continue
        </button>
      </form>
    </div>
  )
}