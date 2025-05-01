import Link from 'next/link'
import { formatTimestamp } from '@/lib/formatTimestamp'

type Props = {
  conversationId: string
  skill: string
  otherUserName: string
  lastMessage: string
  lastMessageTime: string | null
  isActive?: boolean
};

export default function ConversationPreview({
  conversationId,
  skill,
  otherUserName,
  lastMessage,
  lastMessageTime,
  isActive = false,
}: Props) {
  console.log('lastMessageTime:', lastMessageTime);
  return (
    <Link href={`/messages/${conversationId}`}>
      <div
        className={`p-4 border-b transition ${
          isActive ? 'bg-indigo-50' : 'hover:bg-gray-50'
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="font-semibold">{otherUserName}</div>
            <div className="text-sm text-gray-600">{skill}</div>
            <div className="text-sm text-gray-500 mt-1 truncate">{lastMessage}</div>
          </div>
          <div className="text-xs text-gray-400">
          {lastMessageTime ? formatTimestamp(lastMessageTime) : ''}
          </div>
        </div>
      </div>
    </Link>
  )
}
