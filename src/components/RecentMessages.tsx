'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase/supabaseClient"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type MessagePreview = {
  conversation_id: string
  skill_tag: string
  last_message_content: string
  last_message_sent_at: string
  user1_id: string
  user2_id: string
  user1_username: string
  user2_username: string
}

export default function RecentMessages() {
  const [userId, setUserId] = useState<string | null>(null)
  const [messages, setMessages] = useState<MessagePreview[]>([])

  useEffect(() => {
    async function fetchMessages() {
      const { data: sessionData } = await supabase.auth.getSession()
      const uid = sessionData.session?.user.id ?? null
      setUserId(uid)
      if (!uid) return

      const { data, error } = await supabase
        .from('conversation_previews')
        .select('*')
        .or(`user1_id.eq.${uid},user2_id.eq.${uid}`)
        .order('last_message_sent_at', { ascending: false})
        .limit(3)

      if (error) {
        console.error('error fetching messages:', error)
        return
      }
      setMessages(data || [])
    }
    fetchMessages()
  }, [])
  return (
    <Card className="rounded-2xl shadow-md bg-white">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-indigo-900">Recent Messages</h3>
          <Link href="/messages" className="text-sm text-indigo-600 hover:underline">
            View all
          </Link>
        </div>

        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages yet. Start swapping!</p>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => {
              const name = msg.user1_id === userId ? msg.user2_username : msg.user1_username;
              return (
                <Link
                  key={msg.conversation_id}
                  href={`/messages/${msg.conversation_id}`}
                  className="flex items-start gap-3 hover:bg-gray-50 rounded-lg p-2 transition"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-indigo-800">{name}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {msg.last_message_content ?? 'No messages yet'}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}