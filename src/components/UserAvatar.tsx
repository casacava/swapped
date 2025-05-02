import Image from 'next/image'

type Props = {
  avatarUrl?: string
  username?: string
  size?: number
  className?: string
}

export default function UserAvatar({
  avatarUrl,
  username = 'user',
  size = 40,
  className = ''
}: Props) {
  const fallbackUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${username}`

  return (
    <img
      src={avatarUrl || fallbackUrl}
      alt={`${username}'s avatar`}
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
    />
  )
}
