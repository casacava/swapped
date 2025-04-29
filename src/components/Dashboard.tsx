'use client'

import { useState } from 'react'
import MatchTabs from './MatchTabs'
import ProfilePreview from './ProfilePreview'
import RecentMessages from './RecentMessages'
import { supabase } from '@/lib/supabase/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'learn' | 'share'>('learn')
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <main className="min-h-screen bg-[#FDF7F2] font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-serif text-indigo-900">
            Welcome to Swapped ✨
          </h1>
          <button onClick={handleLogout} className="text-sm text-gray-600 hover:underline">Log Out</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <MatchTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          <div className="space-y-6">
            <ProfilePreview />
            <RecentMessages />
          </div>
        </div>
      </div>
    </main>
  )
}