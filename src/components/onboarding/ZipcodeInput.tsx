'use client'

export default function ZipcodeInput({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (/^\d{0,5}$/.test(val)) {
      onChange(val)
    }
  }

  return (
    <div className="mb-4">
      <label className="block font-medium text-sm mb-1">Zipcode</label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        inputMode="numeric"
        pattern="\d{5}"
        className="w-full px-3 py-2 border rounded-lg shadow-sm"
        placeholder="Enter your 5-digit zip code"
      />
      <p className="text-sm text-gray-500 mt-1">
        We’ll use this later to help match you with people nearby!
      </p>
    </div>
  )
}
