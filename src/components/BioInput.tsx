'use client'

export default function BioInput({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const maxChars = 250

  return (
    <div className="mb-4">
      <label className="block font-medium text-sm mb-1">Bio</label>
      <textarea
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= maxChars) onChange(e.target.value)
        }}
        className="w-full px-3 py-2 border rounded-lg shadow-sm resize-none"
        rows={4}
        placeholder="Tell others a bit about you..."
      />
      <div className="text-sm text-right text-gray-500">
        {value.length} / {maxChars}
      </div>
    </div>
  )
}