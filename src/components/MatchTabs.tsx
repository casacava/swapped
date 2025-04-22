'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import MatchCard from './MatchCard'

type Profile = {
  id: string
  username: string
  bio: string
  skills_offered: string[]
  skills_wanted: string[]
}

export default function MatchTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: 'learn' | 'share'
  setActiveTab: (tab: 'learn' | 'share') => void
}) {
  const [matches, setMatches] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true)

      // Get current user ID
      const { data: user } = await supabase.auth.getUser()
      const userId = user?.user?.id

      if (!userId) return

      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('skills_offered, skills_wanted')
        .eq('id', userId)
        .single()

      if (!currentProfile) return

      const skillField = activeTab === 'learn' ? 'skills_offered' : 'skills_wanted'
      const targetSkills = activeTab === 'learn' ? currentProfile.skills_wanted : currentProfile.skills_offered

      // Fetch matching users
      const { data: matchProfiles } = await supabase
        .from('profiles')
        .select('*')
        .not('id', 'eq', userId)
        .overlaps(skillField, targetSkills)

      setMatches(matchProfiles || [])
      setLoading(false);
    };

    fetchMatches()
  }, [activeTab])

  return (
    <div>
      <div className="flex mb-4 space-x-2">
        <button
          onClick={() => setActiveTab('learn')}
          className={`px-4 py-2 rounded-full ${
            activeTab === 'learn' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Looking to Learn
        </button>
        <button
          onClick={() => setActiveTab('share')}
          className={`px-4 py-2 rounded-full ${
            activeTab === 'share' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Happy to Share
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading matches...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              name={match.username}
              skills={activeTab === 'learn' ? match.skills_offered : match.skills_wanted}
              bio={match.bio}
            />
          ))}
        </div>
      )}
    </div>
  )
}