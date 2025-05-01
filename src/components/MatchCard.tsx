'use client'

import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/supabaseClient"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type MatchCardProps = {
  name: string
  bio: string
  skills: string[]
  currentUserId: string
  currentUserName: string
  targetUserId: string
  targetUserName: string
  matchedSkill: string
  activeTab: 'learn' | 'share'
}

export default function MatchCard({ 
  name, 
  bio, 
  skills,
  currentUserId,
  currentUserName,
  targetUserId,
  targetUserName,
  matchedSkill,
  activeTab, }: MatchCardProps) {
    const router = useRouter()

    async function handleMessage() {
      const { data: existing, error: existingError } = await supabase
      .from('conversations')
      .select('id')
      .or(`and(user1_id.eq.${currentUserId},user2_id.eq.${targetUserId}),and(user1_id.eq.${targetUserId},user2_id.eq.${currentUserId})`)
      .eq('skill_tag', matchedSkill)
      .maybeSingle()

    let conversationId = existing?.id
    if (!currentUserId || !targetUserId || !matchedSkill) {
      console.error('Missing required data — cannot create conversation.')
      return
    }

    if (!conversationId) {
      const { data: created, error: createError } = await supabase
        .from('conversations')
        .insert({
          user1_id: currentUserId,
          user2_id: targetUserId,
          skill_tag: matchedSkill,
        })
        .select('id')
        .single()

      if (createError) {
        console.error('Error creating conversation:', createError.message)
        return
      }

      conversationId = created.id
      const boilerplate =
      activeTab === 'learn'
        ? `${currentUserName} is connected to ${targetUserName} to learn ${matchedSkill}.`
        : `${targetUserName} is connected to ${currentUserName} to learn ${matchedSkill}.`


      const { error: messageError } = await supabase.from('messages').insert({
        conversation_id: conversationId,
        sender_id: currentUserId,
        content: boilerplate,
      })

      if (messageError) {
        console.error('error sending starter message', messageError.message)
      }
    }
    router.push(`/messages/${conversationId}`)
    }
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition bg-white">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-base font-semibold text-indigo-900">{name}</h3>
            <p className="text-sm text-muted-foreground">{bio}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map((skill, i) => (
            <Badge key={i} className="bg-indigo-50 text-indigo-700">
              {skill}
            </Badge>
          ))}
        </div>

        <Button onClick={handleMessage} variant="default" className="w-full bg-indigo-700 hover:bg-indigo-800">
          Message
        </Button>
      </CardContent>
    </Card>
  )
}