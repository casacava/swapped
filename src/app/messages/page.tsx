export default function MessagesPage() {
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/3 border-r overflow-y-auto">
        <h2 className="text-xl font-serif p-4">Messages</h2>
        {/* TODO: Map through conversation previews */}
        <p className="p-4 text-gray-500">No messages yet.</p>
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
        Select a conversation
      </div>
    </div>
  )
}