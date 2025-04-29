'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/supabaseClient"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Profile = {
  username: string;
  bio: string;
  skills_offered: string[];
}

export default function ProfilePreview() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: userData } = await supabase.auth.getUser()
      const userId = userData?.user?.id

      if (!userId) return

      const { data: profileData, error} = await supabase
      .from('profiles')
      .select('username, bio, skills_offered')
      .eq('id', userId)
      .single()

      if (error) {
        console.error('failed to fetch profile:', error.message)
      } else setProfile(profileData)
    }

    fetchProfile()
  }, [])

  if (!profile) {
    return (
      <Card className="rounded-2xl shadow-md bg-white">
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Loading profile...</p>
        </CardContent>
      </Card>
    )
  }


  const badgeStyles = [
    'bg-[#F36C5E] text-white', // Coral filled
    'border border-[#F36C5E] text-[#F36C5E]', // Coral outline
  ]

  return (
    <Card className="rounded-2xl shadow-md bg-white">
      <CardContent className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-indigo-900">Your Profile</h3>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{profile.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-base font-semibold text-indigo-800">{profile.username}</div>
            <p className="text-sm text-muted-foreground">{profile.bio}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {profile.skills_offered.map((skill, i) => (
            <span
              key={i}
              className={`text-sm px-3 py-1 rounded-full font-medium ${badgeStyles[i % badgeStyles.length]}`}
            >
              {skill}
            </span>
          ))}
        </div>

        <Button onClick={() => router.push('/profile/edit')} variant="secondary" className="w-full mt-2 transition-all hover:scale-[1.02] hover:bg-indigo-50 hover:text-indigo-900">
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  )
}