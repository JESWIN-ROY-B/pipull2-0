'use client'

import { useEffect, useState } from 'react'
import { Avatar, StarRating } from './primitives'
import { Button } from '@/components/ui/button'
import { X, Phone, Send, ShieldCheck, PhoneOff, Lock } from 'lucide-react'
import type { WorkerProfile } from '@/lib/pipull-data'

type Msg = { id: number; from: 'me' | 'them'; text: string }

export function MessageModal({
  worker,
  onClose,
}: {
  worker: WorkerProfile | null
  onClose: () => void
}) {
  const [messages, setMessages] = useState<Msg[]>([
    { id: 1, from: 'them', text: 'Namaste! I can take up your gig. What time works for you?' },
  ])
  const [text, setText] = useState('')
  const [calling, setCalling] = useState(false)

  useEffect(() => {
    if (!worker) {
      setMessages([{ id: 1, from: 'them', text: 'Namaste! I can take up your gig. What time works for you?' }])
      setCalling(false)
      setText('')
    }
  }, [worker])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (worker) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [worker, onClose])

  if (!worker) return null

  function send() {
    if (!text.trim()) return
    setMessages((m) => [...m, { id: Date.now(), from: 'me', text: text.trim() }])
    setText('')
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, from: 'them', text: 'Got it, thank you. See you then!' }])
    }, 900)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div
        className="flex h-[80dvh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl border border-border bg-card sm:h-[600px] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-border p-3">
          <Avatar initials={worker.initials} hue={worker.hue} size={40} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{worker.name}</p>
            <p className="truncate text-xs text-muted-foreground">{worker.role}</p>
          </div>
          <Button variant="outline" size="icon-sm" aria-label="Voice call" onClick={() => setCalling(true)}>
            <Phone className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Close" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </div>

        {/* Privacy banner */}
        <div className="flex items-center gap-2 border-b border-border bg-verified/5 px-3 py-2 text-[11px] text-verified">
          <Lock className="size-3.5 shrink-0" />
          Phone numbers are hidden — India DPDP Act compliant. Messages and calls
          are routed through Pipull.
        </div>

        {/* Body */}
        {calling ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="relative">
              <Avatar initials={worker.initials} hue={worker.hue} size={88} />
              <span className="absolute -inset-2 animate-ping rounded-full border-2 border-primary/40" />
            </div>
            <div>
              <p className="font-semibold">{worker.name}</p>
              <p className="text-sm text-muted-foreground">Secure VoIP call connecting…</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-verified/10 px-3 py-1 text-xs text-verified">
              <ShieldCheck className="size-3.5" />
              Number masked · no PII revealed
            </span>
            <Button variant="destructive" onClick={() => setCalling(false)}>
              <PhoneOff className="size-4" />
              End call
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-2 overflow-y-auto p-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.from === 'me'
                      ? 'ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground'
                      : 'mr-auto max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm text-foreground'
                  }
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-border p-3">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) send()
                }}
                placeholder="Type a message…"
                className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-3 focus:ring-primary/20"
              />
              <Button size="icon-lg" aria-label="Send" onClick={send}>
                <Send className="size-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
