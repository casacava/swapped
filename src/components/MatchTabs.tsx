'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/supabaseClient'
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
      const targetSkills =
        activeTab === 'learn' ? currentProfile.skills_wanted : currentProfile.skills_offered
  
      const { data: matchProfiles, error } = await supabase
        .from('profiles')
        .select('*')
        .not('id', 'eq', userId)
        .overlaps(skillField, targetSkills)
  
      if (error) {
        console.error('Error fetching matches:', error.message)
      }
  
      setMatches(matchProfiles || [])
      setLoading(false)
    }
    fetchMatches()
  }, [activeTab])  

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('learn')}
          className={`px-4 py-2 rounded-full font-medium transition ${
            activeTab === 'learn'
              ? 'bg-[#F36C5E] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Looking to Learn
        </button>
        <button
          onClick={() => setActiveTab('share')}
          className={`px-4 py-2 rounded-full font-medium transition ${
            activeTab === 'share'
              ? 'bg-[#403F7A] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Happy to Share
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500 mt-4">Loading matches...</p>
      ) : matches.length === 0 ? (
        <p className="text-sm text-gray-500 mt-4">No matches yet. Try adding more skills!</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 pt-2">
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