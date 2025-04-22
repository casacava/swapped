export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Swapped 👋</h1>
      <p className="mb-4 text-lg text-gray-700 text-center max-w-md">
        A community where you can exchange skills and knowledge without money.
      </p>
      <div className="flex gap-4">
        <a
          href="/signup"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </a>
        <a
          href="/login"
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
        >
          Log In
        </a>
      </div>
    </main>
  )
}