'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/supabaseClient';
import { useRouter } from 'next/navigation';

type Props = {
  conversationId: string;
  senderId: string;
};

export default function MessageInput({ conversationId, senderId }: Props) {
  const [text, setText] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const { error } = await supabase.from('messages').insert({
      conversation_id: conversationId,
      sender_id: senderId,
      content: trimmed,
    });

    if (!error) {
      setText('');
      router.refresh(); // Reload page to re-fetch messages
    } else {
      console.error('Error sending message:', error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 border rounded-xl px-4 py-2"
        placeholder="Type your message..."
        maxLength={2000}
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-xl disabled:opacity-50"
        disabled={!text.trim()}
      >
        Send
      </button>
    </form>
  )
}