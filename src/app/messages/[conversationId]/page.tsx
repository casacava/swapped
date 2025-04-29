'use client'

import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase/supabaseClient"
import MessageBubble from "@/components/MessageBubble"
import MessageInput from "@/components/MessageInput"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Message = {
  id: string
  content: string
  sender_id: string
  sent_at: string
};

export default function ConversationPage() {
  const params = useParams()
  const conversationId = params.conversationId as string
  const [messages, setMessages] = useState<Message[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const { data: sessionData } = await supabase.auth.getSession()
      const userId = sessionData.session?.user.id ?? null
      setUserId(userId)

      if (!userId) return

      const { data: fetchedMessages, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('sent_at', { ascending: true })

      if (error || !fetchedMessages) {
        router.push("/404")
        return
      }

      setMessages(fetchedMessages)
    }

    fetchData()
  }, [conversationId, router])

  useEffect(() => {
    if (!conversationId) return
  
    const channel = supabase
    .channel(`conversation-${conversationId}`, {
      config: {
        broadcast: {
          self: true,
        },
      },
    })
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        const newMessage = payload.new as Message;
        setMessages((prev) => [...prev, newMessage]);
      }
    )
    .subscribe();
  
    return () => {
      supabase.removeChannel(channel);
    }
  }, [conversationId])

  if (!userId) return null

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 border-b text-lg font-semibold">Conversation</header>

      <main className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            content={msg.content}
            isSender={msg.sender_id === userId}
          />
        ))}
      </main>

      <footer className="p-4 border-t">
        <MessageInput conversationId={conversationId} senderId={userId} />
      </footer>
    </div>
  )
}