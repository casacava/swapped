'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/supabaseClient'

type Props = {
  userId: string
  currentAvatarUrl?: string
  onUploadComplete: (url: string) => void
};

export default function AvatarUploader({ userId, currentAvatarUrl, onUploadComplete }: Props) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentAvatarUrl ?? null)

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)

    const fileExt = file.name.split('.').pop()
    const filePath = `${userId}/avatar.${fileExt}`

    console.log("Upload path:", filePath)
    const { data: session } = await supabase.auth.getSession()
    console.log("User session:", session?.session?.user)


    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      console.error('Upload failed:', uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
    const publicUrl = data.publicUrl

    setPreview(publicUrl)
    onUploadComplete(publicUrl)
    setUploading(false)
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Upload Profile Picture
      </label>

      <div className="flex items-center gap-4">
        <label className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition">
          Choose File
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
      </div>

      {preview && (
        <div className="flex justify-center pt-2">
          <img
            src={preview}
            alt="Avatar preview"
            className="rounded-full w-24 h-24 object-cover border"
          />
        </div>
      )}
    </div>
  )
}
