'use client'

type SkillCategory = {
  label: string
  options: string[]
}

const skillCategories: SkillCategory[] = [
  { label: '🧘 Physical Activity', options: ['Yoga', 'Pilates', 'Personal Training'] },
  { label: '🗣️ Languages', options: ['Spanish', 'English'] },
  { label: '🎨 Crafty', options: ['Knitting', 'Painting', 'Pottery / Sculpting'] },
  { label: '📚 Educational', options: ['Math', 'Physics', 'Science', 'Reading & Writing', 'JavaScript'] },
  { label: '🍳 Misc', options: ['Cooking'] },
  { label: '🎶 Music', options: ['Guitar', 'Piano', 'Singing'] }
]

export default function SkillsMultiSelect({
  label,
  selectedSkills,
  onChange,
}: {
  label: string
  selectedSkills: string[]
  onChange: (skills: string[]) => void
}) {
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter((s) => s !== skill))
    } else {
      onChange([...selectedSkills, skill])
    }
  }

  return (
    <div className="mb-4">
      <label className="block font-medium text-sm mb-1">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {skillCategories.map((category) => (
          <div key={category.label}>
            <p className="font-semibold text-sm mb-1">{category.label}</p>
            {category.options.map((skill) => (
              <label key={skill} className="block text-sm">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                  className="mr-2"
                />
                {skill}
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
