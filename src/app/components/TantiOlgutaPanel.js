'use client'

import { useEffect, useRef, useState } from 'react'

export default function TantiOlgutaPanel({
  messages,
  setMessages,
  isLoading,
  setIsLoading,
  onClose,
}) {
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  useEffect(() => {
    if (!isLoading && inputRef.current) inputRef.current.focus()
  }, [isLoading])

  async function send() {
    const text = input.trim()
    if (!text || isLoading) return

    const userMessage = { role: 'user', content: text }
    const next = [...messages, userMessage]
    setMessages(next)
    setInput('')
    setIsLoading(true)

    try {
      // Send only the conversation excluding the hardcoded greeting (it's not from the API)
      const apiMessages = next.filter(
        (_, i) => !(i === 0 && next[0].role === 'assistant')
      )
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })
      const data = await res.json()
      if (!res.ok || !data.reply) {
        setMessages([
          ...next,
          {
            role: 'assistant',
            content:
              data?.error ||
              'Tanti Olguța se odihnește un moment, încearcă din nou.',
          },
        ])
      } else {
        setMessages([...next, { role: 'assistant', content: data.reply }])
      }
    } catch {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content: 'Tanti Olguța se odihnește un moment, încearcă din nou.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  function handleReset() {
    setMessages([
      {
        role: 'assistant',
        content:
          'Bine ai venit la Basarabia, dragă! Sunt Tanti Olguța. Cu ce te pot ajuta?',
      },
    ])
  }

  return (
    <>
      <style>{`
        @keyframes olgutaPanelIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes olgutaTypingDot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30%           { opacity: 1;   transform: translateY(-3px); }
        }
        @keyframes olgutaHeaderPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(120,200,120,0.5); }
          50%      { box-shadow: 0 0 0 4px rgba(120,200,120,0); }
        }

        .olguta-panel {
          position: fixed;
          bottom: calc(24px + env(safe-area-inset-bottom));
          right: calc(24px + env(safe-area-inset-right));
          z-index: 95;
          width: 380px;
          height: 540px;
          max-height: calc(100vh - 48px);
          display: flex;
          flex-direction: column;
          background: linear-gradient(160deg, #1f0a0a 0%, #2a0e0e 50%, #1a0606 100%);
          border: 1px solid rgba(212,160,23,0.55);
          border-radius: 12px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(212,160,23,0.08);
          font-family: Georgia, "Times New Roman", serif;
          color: #F5E6C8;
          animation: olgutaPanelIn 300ms ease-out both;
          overflow: hidden;
        }

        .olguta-panel-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-bottom: 1px solid rgba(212,160,23,0.2);
          flex-shrink: 0;
        }
        .olguta-panel-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #2a0e0e 0%, #0a0303 75%);
          border: 1px solid rgba(212,160,23,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #D4A017;
          font-size: 0.85rem;
          flex-shrink: 0;
        }
        .olguta-panel-name {
          font-family: var(--font-cinzel, "Cinzel Decorative", serif);
          font-size: 0.85rem;
          letter-spacing: 0.18em;
          color: #D4A017;
          text-transform: uppercase;
          font-weight: 700;
          margin: 0;
          flex: 1;
        }
        .olguta-online-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #78c878;
          animation: olgutaHeaderPulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        .olguta-online-text {
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 0.7rem;
          color: rgba(245,230,200,0.5);
          margin-right: 6px;
        }
        .olguta-close-btn {
          background: transparent;
          border: none;
          color: #A8957A;
          font-size: 1.4rem;
          line-height: 1;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          transition: color 0.2s, background 0.2s;
        }
        .olguta-close-btn:hover {
          color: #D4A017;
          background: rgba(212,160,23,0.08);
        }

        .olguta-conversation {
          flex: 1;
          overflow-y: auto;
          padding: 16px 14px 8px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scrollbar-width: thin;
          scrollbar-color: rgba(212,160,23,0.3) transparent;
        }
        .olguta-conversation::-webkit-scrollbar { width: 6px; }
        .olguta-conversation::-webkit-scrollbar-track { background: transparent; }
        .olguta-conversation::-webkit-scrollbar-thumb {
          background: rgba(212,160,23,0.3);
          border-radius: 3px;
        }

        .olguta-msg {
          max-width: 82%;
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 0.92rem;
          line-height: 1.55;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .olguta-msg-assistant {
          align-self: flex-start;
          background: rgba(60,15,15,0.7);
          border: 1px solid rgba(212,160,23,0.18);
          color: #F5E6C8;
          border-bottom-left-radius: 4px;
        }
        .olguta-msg-user {
          align-self: flex-end;
          background: rgba(212,160,23,0.15);
          border: 1px solid rgba(212,160,23,0.4);
          color: #F5E6C8;
          border-bottom-right-radius: 4px;
        }

        .olguta-typing {
          align-self: flex-start;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(245,230,200,0.6);
          font-style: italic;
          font-size: 0.85rem;
        }
        .olguta-typing-dots {
          display: inline-flex;
          gap: 3px;
        }
        .olguta-typing-dots span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #D4A017;
          animation: olgutaTypingDot 1.2s ease-in-out infinite;
        }
        .olguta-typing-dots span:nth-child(2) { animation-delay: 0.15s; }
        .olguta-typing-dots span:nth-child(3) { animation-delay: 0.3s; }

        .olguta-input-bar {
          flex-shrink: 0;
          border-top: 1px solid rgba(212,160,23,0.2);
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .olguta-input {
          flex: 1;
          background: rgba(0,0,0,0.35);
          border: 1px solid rgba(212,160,23,0.25);
          border-radius: 8px;
          padding: 9px 12px;
          color: #F5E6C8;
          font-family: Georgia, serif;
          font-size: 0.92rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .olguta-input::placeholder { color: rgba(168,149,122,0.6); font-style: italic; }
        .olguta-input:focus { border-color: rgba(212,160,23,0.7); }
        .olguta-input:disabled { opacity: 0.5; }

        .olguta-send-btn {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          background: rgba(212,160,23,0.85);
          border: 1px solid #D4A017;
          border-radius: 50%;
          color: #1a0606;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, transform 0.15s;
        }
        .olguta-send-btn:hover:not(:disabled) {
          background: #D4A017;
          transform: translateY(-1px);
        }
        .olguta-send-btn:disabled {
          background: rgba(168,149,122,0.3);
          border-color: rgba(168,149,122,0.4);
          color: rgba(26,6,6,0.5);
          cursor: not-allowed;
        }

        .olguta-reset {
          flex-shrink: 0;
          padding: 8px 14px 12px;
          text-align: center;
        }
        .olguta-reset-btn {
          background: transparent;
          border: none;
          color: rgba(168,149,122,0.6);
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 0.75rem;
          cursor: pointer;
          transition: color 0.2s;
          padding: 0;
        }
        .olguta-reset-btn:hover { color: #D4A017; }

        @media (max-width: 480px) {
          .olguta-panel {
            width: calc(100vw - 16px);
            right: 8px;
            left: 8px;
            height: 70vh;
            bottom: calc(8px + env(safe-area-inset-bottom));
          }
        }
      `}</style>

      <div className="olguta-panel" role="dialog" aria-label="Tanti Olguța chat">
        <div className="olguta-panel-header">
          <span className="olguta-panel-avatar" aria-hidden="true">✦</span>
          <h3 className="olguta-panel-name">Tanti Olguța</h3>
          <span className="olguta-online-text">online</span>
          <span className="olguta-online-dot" aria-hidden="true" />
          <button
            type="button"
            className="olguta-close-btn"
            onClick={onClose}
            aria-label="Închide conversația"
          >×</button>
        </div>

        <div className="olguta-conversation" ref={scrollRef}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`olguta-msg ${
                m.role === 'user' ? 'olguta-msg-user' : 'olguta-msg-assistant'
              }`}
            >
              {m.content}
            </div>
          ))}
          {isLoading && (
            <div className="olguta-typing">
              <span>Tanti Olguța scrie</span>
              <span className="olguta-typing-dots">
                <span /><span /><span />
              </span>
            </div>
          )}
        </div>

        <div className="olguta-input-bar">
          <input
            ref={inputRef}
            type="text"
            className="olguta-input"
            placeholder="Scrie un mesaj... / Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            maxLength={2000}
            aria-label="Mesaj către Tanti Olguța"
          />
          <button
            type="button"
            className="olguta-send-btn"
            onClick={send}
            disabled={isLoading || !input.trim()}
            aria-label="Trimite"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="olguta-reset">
          <button type="button" className="olguta-reset-btn" onClick={handleReset}>
            🗑 Reîncepe / Restart
          </button>
        </div>
      </div>
    </>
  )
}
