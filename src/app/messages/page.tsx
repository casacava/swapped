'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/supabaseClient'
import ConversationPreview from '@/components/ConversationPreview'

type ConversationPreviewRow = {
  conversation_id: string
  skill_tag: string
  user1_id: string
  user2_id: string
  user1_username: string
  user2_username: string
  last_message_content: string | null
  last_message_sent_at: string | null
}

export default function MessagesPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [conversations, setConversations] = useState<ConversationPreviewRow[]>([])

  useEffect(() => {
    async function fetchData() {
      const { data: sessionData } = await supabase.auth.getSession()
      const currentUserId = sessionData.session?.user.id ?? null
      setUserId(currentUserId)
      if (!currentUserId) return

      const { data, error } = await supabase
        .from('conversation_previews')
        .select('*')
        .or(`user1_id.eq.${currentUserId},user2_id.eq.${currentUserId}`)
        .order('last_message_sent_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch conversations:', error)
        return
      }


      setConversations(data || [])
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
              key={conv.conversation_id}
              conversationId={conv.conversation_id}
              skill={conv.skill_tag}
              otherUserName={
                conv.user1_id === userId
                  ? conv.user2_username
                  : conv.user1_username
              }
              lastMessage={conv.last_message_content ?? 'No messages yet'}
              lastMessageTime={
                conv.last_message_sent_at
                  ? new Date(conv.last_message_sent_at).toLocaleTimeString([], {
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