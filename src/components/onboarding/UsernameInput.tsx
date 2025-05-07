'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/supabaseClient'

export default function UsernameInput({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const [available, setAvailable] = useState<boolean | null>(null)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    if (!value || value.length < 3) {
      setAvailable(null)
      return
    }

    const timeout = setTimeout(async () => {
      setChecking(true)

      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', value.toLowerCase())
      
        if (error) {
          console.error('error checking username availability', error)
          setAvailable(null)
        } else {
          setAvailable(data.length === 0)
        }

      setChecking(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <div className="mb-4">
      <label className="block font-medium text-sm mb-1">Username</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg shadow-sm"
        placeholder="Choose a username"
      />
      {checking && <p className="text-sm text-gray-500 mt-1">Checking...</p>}
      {!checking && available === true && (
        <p className="text-sm text-green-600 mt-1">✅ Username is available</p>
      )}
      {!checking && available === false && (
        <p className="text-sm text-red-600 mt-1">❌ Username is taken</p>
      )}
    </div>
  )
}