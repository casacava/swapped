// app/messages/Inbox.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/supabaseClient';
import ConversationPreview from '@/components/ConversationPreview';
import { usePathname } from 'next/navigation';
import Link from 'next/link'

export default function Inbox() {
  const [userId, setUserId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const pathname = usePathname();
  const activeConversationId = pathname.startsWith('/messages/')
    ? pathname.split('/messages/')[1]
    : null;

  useEffect(() => {
    async function fetchData() {
      const { data: sessionData } = await supabase.auth.getSession();
      const currentUserId = sessionData.session?.user.id ?? null;
      setUserId(currentUserId);
      if (!currentUserId) return;

      const { data, error } = await supabase
        .from('conversation_previews')
        .select('*')
        .or(`user1_id.eq.${currentUserId},user2_id.eq.${currentUserId}`)
        .order('last_message_sent_at', { ascending: false });

      if (error) {
        console.error('Error fetching conversation previews:', error);
        return;
      }

      setConversations(data || []);
    }

    fetchData();
  }, []);

  return (
    <div className="w-full border-r overflow-y-auto">
      <div className="flex items-center justify-between px-4 pt-4">
        <Link
          href="/dashboard"
          className="text-sm text-indigo-600 hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <h2 className="text-xl font-serif p-4">Messages</h2>

      {conversations.length === 0 ? (
        <p className="p-4 text-gray-500">No conversations yet.</p>
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
            isActive={conv.conversation_id === activeConversationId}
          />
        ))
      )}
    </div>
  );
}
