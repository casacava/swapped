'use client'

import { useRouter } from 'next/navigation'

export default function ConfirmEmailPage() {
  const router = useRouter()

  return (
    <div className="max-w-md mx-auto mt-20 text-center space-y-6">
      <h1 className="text-2xl font-semibold">🎉 Almost there!</h1>
      <p className="text-gray-600">
        We just sent a confirmation link to your email. Please click the link in that email to finish setting up your account.
      </p>
      <p className="text-sm text-gray-500">
        Once confirmed, come back and log in here:
      </p>
      
      <button
        onClick={() => router.push('/login')}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
      >
        ✅ I&apos;ve confirmed my email — Log in
      </button>
      <p className="text-sm text-gray-400 mt-2">Didn&apos;t receive it? Check your spam folder.</p>

    </div>
  )
}
