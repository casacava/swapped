import Link from 'next/link'

type Props = {
  conversationId: string
  skill: string
  otherUserName: string
  lastMessage: string
  lastMessageTime: string
};

export default function ConversationPreview({
  conversationId,
  skill,
  otherUserName,
  lastMessage,
  lastMessageTime,
}: Props) {
  return (
    <Link href={`/messages/${conversationId}`}>
      <div className="p-4 border-b hover:bg-gray-50 transition">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-semibold">{otherUserName}</div>
            <div className="text-sm text-gray-600">{skill}</div>
            <div className="text-sm text-gray-500 mt-1 truncate">{lastMessage}</div>
          </div>
          <div className="text-xs text-gray-400">{lastMessageTime}</div>
        </div>
      </div>
    </Link>
  )
}
