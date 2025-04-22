'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ProfilePreview() {
  const username = 'Cass Cav'
  const bio = 'Frontend dev + Pilates lover!'
  const skills = ['JavaScript', 'Pilates', 'Cooking']

  const badgeStyles = [
    'bg-[#F36C5E] text-white', // Coral filled
    'border border-[#F36C5E] text-[#F36C5E]', // Coral outline
  ]

  return (
    <Card className="rounded-2xl shadow-md bg-white">
      <CardContent className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-indigo-900">Your Profile</h3>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-base font-semibold text-indigo-800">{username}</div>
            <p className="text-sm text-muted-foreground">{bio}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map((skill, i) => (
            <span
              key={i}
              className={`text-sm px-3 py-1 rounded-full font-medium ${badgeStyles[i % badgeStyles.length]}`}
            >
              {skill}
            </span>
          ))}
        </div>

        <Button variant="secondary" className="w-full mt-2 transition-all hover:scale-[1.02] hover:bg-indigo-50 hover:text-indigo-900">
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  )
}