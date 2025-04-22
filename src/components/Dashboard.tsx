'use client'

import { useState } from 'react'
import MatchTabs from './MatchTabs'
import ProfilePreview from './ProfilePreview'
import RecentMessages from './RecentMessages'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'learn' | 'share'>('learn')

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-indigo-800">Welcome to Swapped ✨</h1>
        <button className="text-sm text-gray-500 hover:underline">Log Out</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <MatchTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="space-y-4">
          <ProfilePreview />
          <RecentMessages />
        </div>
      </div>
    </div>
  )
}