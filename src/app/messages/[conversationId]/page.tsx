import { useParams } from "next/navigation"

export default function ConversationPage() {
  const params = useParams()
  const conversationId = params?.conversationId

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b text-lg font-semibold">
        Conversation: {conversationId}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* TODO: Map messages */}
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <form className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border rounded-xl px-4 py-2"
          />
          <button type="submit" className="text-white bg-indigo-600 px-4 py-2 rounded-xl">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}