'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/supabaseClient'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    };

    handleSession()
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Finishing login...</p>
    </main>
  )
}