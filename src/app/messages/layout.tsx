'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Inbox from './Inbox'

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const isOnConversation = pathname !== '/messages'
  const hideInbox = isMobile && isOnConversation
  const hideThread = isMobile && !isOnConversation

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Inbox (sidebar) */}
      <div
        className={`${
          hideInbox ? 'hidden' : 'flex'
        } w-full md:w-1/3 border-r overflow-y-auto z-10 bg-white`}
      >
        <Inbox />
      </div>

      {/* Conversation */}
      <div
        className={`${
          hideThread ? 'hidden' : 'flex'
        } w-full md:w-2/3 flex-col overflow-y-auto z-20 bg-white`}
      >
        {children}
      </div>
    </div>
  )
}
