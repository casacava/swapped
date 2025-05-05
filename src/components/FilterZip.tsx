'use client'

import { useEffect, useState, ChangeEvent } from 'react'

export default function FilterZip({
  zipcode,
  setZipcode,
}: {
  zipcode: string
  setZipcode: (zip: string) => void
}) {
  const [inputValue, setInputValue] = useState(zipcode)

  useEffect(() => {
    const handler = setTimeout(() => {
      setZipcode(inputValue.trim())
    }, 300)

    return () => clearTimeout(handler)
  }, [inputValue, setZipcode])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <input
      type="text"
      placeholder="Filter by Zipcode"
      value={inputValue}
      onChange={handleChange}
      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  )
}
