'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/supabaseClient'
import ConversationPreview from '@/components/ConversationPreview'

type Conversation = {
  id: string
  skill_tag: string
  last_message_at: string
  other_user: {
    username: string
  };
  last_message?: {
    content: string
    sent_at: string
  };
};

export default function MessagesPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])

  useEffect(() => {
    async function fetchData() {
      const { data: sessionData } = await supabase.auth.getSession()
      const userId = sessionData.session?.user.id ?? null
      setUserId(userId)
      if (!userId) return

      const { data: convs, error } = await supabase
        .from('conversations')
        .select(`
          id,
          skill_tag,
          last_message_at,
          user1_id,
          user2_id,
          last_message:messages(content, sent_at),
          other_user:profiles!conversations_user2_id_fkey(username)
        `)
        .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
        .order('last_message_at', { ascending: false })

      if (error) {
        console.error('Failed to fetch conversations:', error)
        return
      }

      // Normalize other user
      const normalized = convs.map((c: any) => {
        return {
          id: c.id,
          skill_tag: c.skill_tag,
          last_message_at: c.last_message_at,
          last_message: c.last_message,
          other_user: {
            username: c.other_user?.username ?? 'Unknown User',
          },
        };
      });

      setConversations(normalized)
    }

    fetchData()
  }, [])

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/3 border-r overflow-y-auto">
        <h2 className="text-xl font-serif p-4">Messages</h2>

        {conversations.length === 0 ? (
          <p className="p-4 text-gray-500">No messages yet.</p>
        ) : (
          conversations.map((conv) => (
            <ConversationPreview
              key={conv.id}
              conversationId={conv.id}
              skill={conv.skill_tag}
              otherUserName={conv.other_user.username}
              lastMessage={conv.last_message?.content ?? 'No messages yet'}
              lastMessageTime={
                conv.last_message?.sent_at
                  ? new Date(conv.last_message.sent_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : ''
              }
            />
          ))
        )}
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
        Select a conversation
      </div>
    </div>
  )
}