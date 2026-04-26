'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import TantiOlgutaAnchor from './TantiOlgutaAnchor'
import TantiOlgutaPanel from './TantiOlgutaPanel'

const STORAGE_MESSAGES = 'basarabia_olguta_messages'
const STORAGE_OPEN = 'basarabia_olguta_open'

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

  useEffect(() => {
    setMounted(true)
    try {
      const storedMsgs = sessionStorage.getItem(STORAGE_MESSAGES)
      if (storedMsgs) {
        const parsed = JSON.parse(storedMsgs)
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed)
      }
      if (sessionStorage.getItem(STORAGE_OPEN) === 'true') setIsOpen(true)
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

  if (!mounted) return null
  if (pathname === '/') return null

  return isOpen ? (
    <TantiOlgutaPanel
      messages={messages}
      setMessages={setMessages}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      onClose={() => setIsOpen(false)}
    />
  ) : (
    <TantiOlgutaAnchor onClick={() => setIsOpen(true)} />
  )
}
