'use client'

import { supabase } from '@/lib/supabase/supabaseClient'

export function GoogleSignInButton() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center"
    >
      <img
        src="/google.svg"
        alt="Sign in with Google"
        className="w-[180px] h-auto"
      />
    </button>
  )
}