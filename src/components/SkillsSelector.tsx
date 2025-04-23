'use client'

import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from '@/lib/utils'


type SkillCategory = {
  label: string
  options: string[]
}

const skillCategories: SkillCategory[] = [
  { label: '🧘 physical activity', options: ['Yoga', 'Pilates', 'Personal Training'] },
  { label: '🗣️ languages', options: ['Spanish', 'English'] },
  { label: '🎨 crafty', options: ['Knitting', 'Painting', 'Pottery / Sculpting'] },
  { label: '📚 educational', options: ['Math', 'Physics', 'Science', 'Reading & Writing', 'JavaScript'] },
  { label: '🍳 misc', options: ['Cooking'] },
  { label: '🎶 music', options: ['Guitar', 'Piano', 'Singing'] }
]

export default function SkillsSelector({
  offered,
  wanted,
  setOffered,
  setWanted,
}: {
  offered: string[]
  wanted: string[]
  setOffered: (skills: string[]) => void
  setWanted: (skills: string[]) => void
}) {
  const toggle = (list: string[], setList: (s: string[]) => void, skill: string) => {
    if (list.includes(skill)) {
      setList(list.filter((s) => s !== skill))
    } else {
      setList([...list, skill])
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Skills you want to learn</h3>
        {skillCategories.map((cat) => (
          <div key={cat.label} className="mb-3">
            <p className="font-bold text-sm mb-1">{cat.label}</p>
            <div className="flex flex-wrap gap-2">
              {cat.options.map((skill) => (
                <Badge
                  key={`wanted-${skill}`} // ← 🔧 unique key
                  variant="outline"
                  onClick={() => toggle(wanted, setWanted, skill)}
                  className={cn(
                    'cursor-pointer border rounded-full px-3 py-1 text-sm transition-all',
                    wanted.includes(skill) && 'bg-[#BFA7E2] text-[#403F7A]'
                  )}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-2">Skills you can offer</h3>
        {skillCategories.map((cat) => (
          <div key={cat.label} className="mb-3">
            <p className="font-bold text-sm mb-1">{cat.label}</p>
            <div className="flex flex-wrap gap-2">
              {cat.options.map((skill) => (
                <Badge
                  key={`offered-${skill}`} // ← 🔧 unique key
                  variant="outline"
                  onClick={() => toggle(offered, setOffered, skill)}
                  className={cn(
                    'cursor-pointer border rounded-full px-3 py-1 text-sm transition-all',
                    offered.includes(skill) && 'bg-[#BFA7E2] text-[#403F7A]'
                  )}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}