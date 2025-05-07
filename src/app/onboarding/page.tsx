'use client'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/supabaseClient'
import { useState, useEffect } from 'react'
import UsernameInput from '@/components/onboarding/UsernameInput'
import GenderSelect from '@/components/onboarding/GenderSelect'
import BioInput from '@/components/onboarding/BioInput'
import SkillsSelector from '@/components/onboarding/SkillsSelector'
import ZipcodeInput from '@/components/onboarding/ZipcodeInput'
import AvatarUploader from '@/components/profile/AvatarUploader'


export default function OnboardingPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [gender, setGender] = useState('')
  const [bio, setBio] = useState('')
  const [skillsOffered, setSkillsOffered] = useState<string[]>([])
  const [skillsWanted, setSkillsWanted] = useState<string[]>([])
  const [zipcode, setZipcode] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const redirectIfProfileExists = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUserId(user.id)
  
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
  
      if (profile) {
        router.push('/dashboard')
      }
    }
    redirectIfProfileExists()
  }, [])
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // get current user ID
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (!user || userError) {
      setError('unable to get user info. Please try again.')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
    .from('profiles')
    .insert({
      id: user.id,
      username,
      gender,
      bio,
      zipcode,
      avatar_url: avatarUrl,
      skills_offered: skillsOffered,
      skills_wanted: skillsWanted,
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    //redirect
    router.push('/dashboard')
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create your profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <UsernameInput value={username} onChange={setUsername} />
        <GenderSelect value={gender} onChange={setGender} />
        <BioInput value={bio} onChange={setBio} />
        <SkillsSelector
          offered={skillsOffered}
          wanted={skillsWanted}
          setOffered={setSkillsOffered}
          setWanted={setSkillsWanted}
        />
        <ZipcodeInput value={zipcode} onChange={setZipcode} />
        {userId && (
          <AvatarUploader userId={userId} onUploadComplete={setAvatarUrl} />
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          {loading ? 'Saving...' : 'Finish Onboarding'}
        </button>
      </form>
    </div>
  )
}