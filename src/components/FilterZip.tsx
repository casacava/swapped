'use client'

import { useEffect, useState, ChangeEvent } from 'react'
import { X } from 'lucide-react'

export default function FilterZip({
  zipcode,
  setZipcode,
}: {
  zipcode: string
  setZipcode: (zip: string) => void
}) {
  const [inputValue, setInputValue] = useState(zipcode)
  const [error, setError] = useState(false)

  const isValidZip = (zip: string) => /^\d{5}$/.test(zip.trim())

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = inputValue.trim()
      
      if (trimmed === '') {
        setZipcode('')
        setError(false)
      } else if (isValidZip(trimmed)) {
        setZipcode(trimmed)
        setError(false)
      } else {
        setZipcode('')
        setError(true)
      }
    }, 300)

    return () => clearTimeout(handler)
  }, [inputValue, setZipcode])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const numericOnly = raw.replace(/\D/g, '')
    setInputValue(numericOnly)
  }

  const handleClear = () => {
    setInputValue('')
    setZipcode('')
    setError(false)
  }

  return (
    <div className="flex flex-col w-[150px] relative">
      <input
        type="text"
        placeholder="Filter by Zipcode"
        value={inputValue}
        onChange={handleChange}
        maxLength={5}
        className={`px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-400'
            : 'border-gray-300 focus:ring-indigo-400'
        }`}
      />

      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
          aria-label="Clear zipcode"
        >
          <X size={14} />
        </button>
      )}


      {error && (
        <p className="text-sm text-red-500 mt-1">Please enter a valid 5-digit zipcode</p>
      )}
    </div>
  )
}
