'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

// import Dashboard from '@/components/Dashboard'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkProfile = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (!user || error) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

      if(!profile) {
        router.push('/onboarding')
      } else setLoading(false)
    }
    checkProfile()
  }, [])

  if (loading) {
    return <p className='p-6'> Loading...</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>
      {/* dashboard content here */}
    </div>
  )
}