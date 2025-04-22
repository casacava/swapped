'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Message = {
  name: string
  message: string
}

const mockMessages: Message[] = [
  {
    name: 'Jane Doe',
    message: 'Hey! I’d love to learn Pilates from you!',
  },
  {
    name: 'Alex Kim',
    message: 'Are you free this weekend for a cooking swap?',
  },
]

export default function RecentMessages() {
  return (
    <Card className="rounded-2xl shadow-md bg-white">
      <CardContent className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-indigo-900">Recent Messages</h3>

        {mockMessages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages yet. Start swapping!</p>
        ) : (
          <div className="space-y-3">
            {mockMessages.map((msg, i) => (
              <div key={i} className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{msg.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-indigo-800">{msg.name}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}