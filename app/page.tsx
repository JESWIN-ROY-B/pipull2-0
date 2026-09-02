'use client'

import { useEffect, useState } from 'react'
import { AuthScreen } from '@/components/pipull/auth-screen'
import { Header } from '@/components/pipull/header'
import { CustomerDashboard } from '@/components/pipull/customer-dashboard'
import { WorkerDashboard } from '@/components/pipull/worker-dashboard'
import { AdminDashboard } from '@/components/pipull/admin-dashboard'
import { MessageModal } from '@/components/pipull/message-modal'
import { CheckCircle2 } from 'lucide-react'
import {
  CURRENT_WORKER,
  type LanguageCode,
  type Role,
  type WorkerProfile,
} from '@/lib/pipull-data'

export default function Page() {
  const [role, setRole] = useState<Role | null>(null)
  const [lang, setLang] = useState<LanguageCode>('en')
  const [adminOpen, setAdminOpen] = useState(false)
  const [messageWorker, setMessageWorker] = useState<WorkerProfile | null>(null)
  const [bookedIds, setBookedIds] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  function showToast(msg: string) {
    setToast(msg)
  }

  if (!role) return <AuthScreen onLogin={setRole} />

  const isWorker = role === 'worker'

  return (
    <div className="min-h-dvh">
      <Header
        role={role}
        onToggleRole={() => setRole(isWorker ? 'customer' : 'worker')}
        onLogout={() => {
          setRole(null)
          setBookedIds([])
          setAdminOpen(false)
        }}
        onOpenAdmin={() => setAdminOpen(true)}
        lang={lang}
        onLangChange={setLang}
        userName={isWorker ? CURRENT_WORKER.name : 'Ananya Rao'}
        userInitials={isWorker ? CURRENT_WORKER.initials : 'AR'}
        userHue={isWorker ? CURRENT_WORKER.hue : 210}
      />

      {isWorker ? (
        <WorkerDashboard onVote={() => showToast('Vote recorded — one member, one vote.')} />
      ) : (
        <CustomerDashboard
          bookedIds={bookedIds}
          onHire={(w) => {
            setBookedIds((prev) => (prev.includes(w.id) ? prev : [...prev, w.id]))
            showToast(`Gig requested with ${w.name}. Fair-allocation confirmed.`)
          }}
          onMessage={(w) => setMessageWorker(w)}
        />
      )}

      {adminOpen && <AdminDashboard onClose={() => setAdminOpen(false)} />}
      <MessageModal worker={messageWorker} onClose={() => setMessageWorker(null)} />

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm text-background shadow-lg">
          <CheckCircle2 className="size-4 text-verified" />
          {toast}
        </div>
      )}
    </div>
  )
}
