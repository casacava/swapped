'use client'

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function Signup () {
  const router = useRouter()

  const [formData, setFormData] = useState({ email: '', password: '', confirm: ''})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ... formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (formData.password !== formData.confirm) {
      setError("passwords don't match")
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signUp({
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
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8 md:p-10 flex flex-col gap-6">
        <h1 className="text-3xl font-serif text-[#403F7A] font-bold">Join Swapped</h1>
        <p className="text-gray-600 font-light">
          Exchange your skills with others — no money involved, just community 🤝
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#BFA7E2]"
            value={formData.confirm}
            onChange={handleChange}
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F36C5E] text-white py-3 rounded-xl font-semibold hover:bg-[#e45b4d] transition-all duration-200"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-[#403F7A] font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>
    </main>
  )
}