'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type MatchCardProps = {
  name: string
  bio: string
  skills: string[]
}

export default function MatchCard({ name, bio, skills }: MatchCardProps) {
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

        <Button variant="default" className="w-full bg-indigo-700 hover:bg-indigo-800">
          Message
        </Button>
      </CardContent>
    </Card>
  )
}