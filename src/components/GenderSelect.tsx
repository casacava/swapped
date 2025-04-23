'use client'

export default function GenderSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  return (
    <div className="mb-4">
      <label className="block font-medium text-sm mb-1">Gender</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg shadow-sm"
      >
        <option value="">Select your gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Nonbinary">Nonbinary</option>
        <option value="Prefer not to say">Prefer not to say</option>
      </select>
    </div>
  )
}
