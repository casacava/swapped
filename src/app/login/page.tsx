'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/supabaseClient'
import { GoogleSignInButton } from '@/components/GoogleSignInButton'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <main className="min-h-screen bg-[#FDF7F2] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 md:p-10 flex flex-col gap-6">
        <h1 className="text-3xl font-serif text-[#403F7A] font-bold">Welcome Back</h1>
        {/* <GoogleSignInButton /> */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BFA7E2]"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BFA7E2]"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F36C5E] text-white py-3 rounded-xl font-semibold hover:bg-[#e45b4d] transition-all duration-200"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <div className="relative">
          <hr className="my-4 border-gray-300" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-gray-500 text-sm">or</span>
        </div>
        <GoogleSignInButton />
        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{' '}
          <a href="/signup" className="text-[#403F7A] font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  )
}