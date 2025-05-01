export function formatTimestamp(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()

  const msInDay = 1000 * 60 * 60 * 24
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = diffInMs / msInDay

  if (diffInDays < 1) {
    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  } else if (diffInDays < 2) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString([], {
      weekday: 'short'
    })
  }
}