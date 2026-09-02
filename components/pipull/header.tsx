'use client'

import { useEffect, useRef, useState } from 'react'
import { Mic, ChevronDown, Bell, LogOut, ArrowLeftRight, ShieldCheck } from 'lucide-react'
import { PipullLogo } from './logo'
import { Avatar } from './primitives'
import { Button } from '@/components/ui/button'
import { LANGUAGES, type LanguageCode, type Role } from '@/lib/pipull-data'
import { cn } from '@/lib/utils'

export function Header({
  role,
  onToggleRole,
  onLogout,
  onOpenAdmin,
  lang,
  onLangChange,
  userName,
  userInitials,
  userHue,
}: {
  role: Role
  onToggleRole: () => void
  onLogout: () => void
  onOpenAdmin: () => void
  lang: LanguageCode
  onLangChange: (l: LanguageCode) => void
  userName: string
  userInitials: string
  userHue: number
}) {
  const [langOpen, setLangOpen] = useState(false)
  const [listening, setListening] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => {
    if (!listening) return
    const t = setTimeout(() => setListening(false), 2600)
    return () => clearTimeout(t)
  }, [listening])

  const activeLang = LANGUAGES.find((l) => l.code === lang)!

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <PipullLogo />

        <div className="ml-auto flex items-center gap-2">
          {/* Role toggle */}
          <button
            onClick={onToggleRole}
            className="hidden items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:inline-flex"
          >
            <ArrowLeftRight className="size-4 text-primary" />
            Switch to {role === 'customer' ? 'Worker' : 'Customer'} View
          </button>

          {/* Voice command */}
          <button
            onClick={() => setListening((v) => !v)}
            aria-label="Voice assisted commands"
            aria-pressed={listening}
            className={cn(
              'relative grid size-9 place-items-center rounded-full border transition-colors',
              listening
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-foreground hover:bg-muted',
            )}
          >
            <Mic className="size-4" />
            {listening && (
              <span className="absolute -inset-0.5 animate-ping rounded-full border-2 border-primary/50" />
            )}
          </button>

          {/* Language selector */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <span className="text-xs text-muted-foreground">भ</span>
              {activeLang.native}
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full z-40 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg">
                <p className="px-3 py-1.5 text-[11px] text-muted-foreground">Powered by Bhashini AI</p>
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLangChange(l.code)
                      setLangOpen(false)
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-muted',
                      l.code === lang && 'bg-muted font-medium',
                    )}
                  >
                    <span>{l.native}</span>
                    <span className="text-xs text-muted-foreground">{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            aria-label="Notifications"
            className="relative hidden size-9 place-items-center rounded-full border border-border bg-background text-foreground hover:bg-muted sm:grid"
          >
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-saffron" />
          </button>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button onClick={() => setProfileOpen((v) => !v)} className="rounded-full">
              <Avatar initials={userInitials} hue={userHue} size={36} />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full z-40 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs capitalize text-muted-foreground">{role} account</p>
                </div>
                <div className="my-1 h-px bg-border" />
                <button
                  onClick={() => {
                    onToggleRole()
                    setProfileOpen(false)
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted sm:hidden"
                >
                  <ArrowLeftRight className="size-4" />
                  Switch view
                </button>
                <button
                  onClick={() => {
                    onOpenAdmin()
                    setProfileOpen(false)
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted"
                >
                  <ShieldCheck className="size-4" />
                  Admin console
                </button>
                <button
                  onClick={onLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="size-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {listening && (
        <div className="border-t border-primary/20 bg-primary/5">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2 text-sm text-primary sm:px-6">
            <Mic className="size-4 animate-pulse" />
            Listening… try “Find an electrician near me” or “इलेक्ट्रीशियन ढूंढो”
          </div>
        </div>
      )}
    </header>
  )
}
