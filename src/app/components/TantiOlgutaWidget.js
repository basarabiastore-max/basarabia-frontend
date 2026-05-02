'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import TantiOlgutaAnchor from './TantiOlgutaAnchor'
import TantiOlgutaPanel from './TantiOlgutaPanel'
import TantiOlgutaLimitModal from './TantiOlgutaLimitModal'

const STORAGE_MESSAGES = 'basarabia_olguta_messages'
const STORAGE_OPEN = 'basarabia_olguta_open'
const STORAGE_MSG_COUNT = 'olguta_msg_count'
const SESSION_USER_MSG_LIMIT = 15

const GREETING = {
  role: 'assistant',
  content:
    'Bine ai venit la Basarabia, dragă! Sunt Tanti Olguța. Cu ce te pot ajuta?',
}

export default function TantiOlgutaWidget() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [isLoading, setIsLoading] = useState(false)
  const [userMsgCount, setUserMsgCount] = useState(0)
  const [showLimitModal, setShowLimitModal] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const storedMsgs = sessionStorage.getItem(STORAGE_MESSAGES)
      if (storedMsgs) {
        const parsed = JSON.parse(storedMsgs)
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed)
      }
      if (sessionStorage.getItem(STORAGE_OPEN) === 'true') setIsOpen(true)
      const storedCount = sessionStorage.getItem(STORAGE_MSG_COUNT)
      if (storedCount !== null) {
        const n = parseInt(storedCount, 10)
        if (Number.isFinite(n) && n >= 0) setUserMsgCount(n)
      }
    } catch {
      // sessionStorage unavailable — start fresh
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    try {
      sessionStorage.setItem(STORAGE_MESSAGES, JSON.stringify(messages))
    } catch {}
  }, [messages, mounted])

  useEffect(() => {
    if (!mounted) return
    try {
      sessionStorage.setItem(STORAGE_OPEN, isOpen ? 'true' : 'false')
    } catch {}
  }, [isOpen, mounted])

  useEffect(() => {
    if (!mounted) return
    try {
      sessionStorage.setItem(STORAGE_MSG_COUNT, String(userMsgCount))
    } catch {}
  }, [userMsgCount, mounted])

  // Gate called by Panel before each user send. Returns true if allowed.
  const onBeforeSend = useCallback(() => {
    if (userMsgCount >= SESSION_USER_MSG_LIMIT) {
      setShowLimitModal(true)
      return false
    }
    setUserMsgCount((c) => c + 1)
    return true
  }, [userMsgCount])

  const handleLimitClose = useCallback(() => {
    setShowLimitModal(false)
    setMessages([GREETING])
    setUserMsgCount(0)
  }, [])

  if (!mounted) return null
  if (pathname === '/') return null

  return (
    <>
      {isOpen ? (
        <TantiOlgutaPanel
          messages={messages}
          setMessages={setMessages}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          onClose={() => setIsOpen(false)}
          onBeforeSend={onBeforeSend}
          onResetCount={() => setUserMsgCount(0)}
        />
      ) : (
        <TantiOlgutaAnchor onClick={() => setIsOpen(true)} />
      )}
      {showLimitModal && (
        <TantiOlgutaLimitModal onClose={handleLimitClose} />
      )}
    </>
  )
}
