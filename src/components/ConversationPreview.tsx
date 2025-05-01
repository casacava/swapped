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
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <div className="font-semibold truncate">{otherUserName}</div>
            <div className="text-sm text-gray-600 truncate">{skill}</div>
            <div className="text-sm text-gray-500 mt-1 truncate">{lastMessage}</div>
          </div>
          <div className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0 pt-1">
            {lastMessageTime ? formatTimestamp(lastMessageTime) : ''}
          </div>
        </div>
      </div>
    </Link>
  )
}
