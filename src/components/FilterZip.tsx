'use client'

import { ChangeEvent } from 'react'

export default function FilterZip({
  zipcode,
  setZipcode,
}: {
  zipcode: string
  setZipcode: (zip: string) => void
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setZipcode(e.target.value)
  }

  return (
    <input
      type="text"
      placeholder="Filter by Zipcode"
      value={zipcode}
      onChange={handleChange}
      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  )
}
