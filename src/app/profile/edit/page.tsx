'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/supabaseClient'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import SkillsSelector from '@/components/SkillsSelector'

export default function EditProfilePage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [skillsOffered, setSkillsOffered] = useState<string[]>([])
  const [skillsWanted, setSkillsWanted] = useState<string[]>([])

  useEffect(() => {
    const loadProfile = async () => {
      const { data: userData } = await supabase.auth.getUser()
      const userId = userData?.user?.id

      if (!userId) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profile) {
        setUsername(profile.username)
        setBio(profile.bio)
        setSkillsOffered(profile.skills_offered || [])
        setSkillsWanted(profile.skills_wanted || [])
      }
    }

    loadProfile()
  }, [])

  const handleSave = async () => {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id

    const { error } = await supabase
      .from('profiles')
      .update({
        username,
        bio,
        skills_offered: skillsOffered,
        skills_wanted: skillsWanted,
      })
      .eq('id', userId)

    if (!error) {
      router.push('/dashboard')
    } else {
      console.error('Failed to update profile:', error.message)
    }
  }

  return (
    <main className="min-h-screen bg-[#FDF7F2] font-sans text-gray-800 flex items-center justify-center py-12">
      <Card className="w-full max-w-xl rounded-2xl shadow-md bg-white">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-serif text-indigo-900">Edit Your Profile</h2>

          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={250}
            />
            <p className="text-xs text-gray-500 text-right">{bio.length}/250</p>
          </div>

          <SkillsSelector
            offered={skillsOffered}
            wanted={skillsWanted}
            setOffered={setSkillsOffered}
            setWanted={setSkillsWanted}
          />

          <Button className="w-full bg-indigo-700 hover:bg-indigo-800" onClick={handleSave}>
            Save Changes
          </Button>
          
          <Button
            variant="ghost"
            className="w-full text-sm text-gray-500 hover:text-indigo-800"
            onClick={() => router.push('/dashboard')}
          >
            ← Back to Dashboard
          </Button>

        </CardContent>
      </Card>
    </main>
  )
}
