'use client'

import { useState } from 'react'
import { PipullLogo } from './logo'
import { Chip, StarRating, Avatar } from './primitives'
import { Button } from '@/components/ui/button'
import {
  Users,
  HardHat,
  Briefcase,
  CalendarCheck,
  Wallet,
  LifeBuoy,
  AlertTriangle,
  BadgeCheck,
  MessageSquareWarning,
  X,
  ArrowUpRight,
  Boxes,
  Building,
  Palette,
} from 'lucide-react'
import { WORKERS, formatINR } from '@/lib/pipull-data'
import { cn } from '@/lib/utils'

const NAV = [
  { id: 'users', label: 'Users', icon: Users },
  { id: 'workers', label: 'Workers', icon: HardHat },
  { id: 'jobs', label: 'Jobs', icon: Briefcase },
  { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
  { id: 'complaints', label: 'Complaints', icon: MessageSquareWarning },
  { id: 'verification', label: 'Verification', icon: BadgeCheck },
  { id: 'claims', label: 'Emergency Claims', icon: LifeBuoy },
  { id: 'payments', label: 'Payments', icon: Wallet },
  { id: 'fraud', label: 'Fraud Reports', icon: AlertTriangle },
]

const KPIS = [
  { label: 'Users', value: '42,381', icon: Users, tone: 'brand' },
  { label: 'Active workers', value: '18,421', icon: HardHat, tone: 'brand' },
  { label: 'Active jobs', value: '3,821', icon: Briefcase, tone: 'brand' },
  { label: 'Bookings', value: '9,421', icon: CalendarCheck, tone: 'brand' },
  { label: 'Transactions', value: formatINR(1245000), icon: Wallet, tone: 'verified' },
  { label: 'Emergency claims', value: '31', icon: LifeBuoy, tone: 'saffron' },
  { label: 'Fraud alerts', value: '4', icon: AlertTriangle, tone: 'destructive' },
] as const

export function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState('users')
  const [ops, setOps] = useState({ franchise: true, rwa: true, whitelabel: false })

  return (
    <div className="fixed inset-0 z-50 flex bg-background">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card p-4 md:flex">
        <PipullLogo />
        <Chip tone="brand" className="mt-4 w-fit">Admin console</Chip>
        <nav className="mt-4 flex-1 space-y-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setActive(n.id)}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active === n.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <n.icon className="size-4" />
              {n.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 sm:px-6">
          <div>
            <h1 className="text-lg font-semibold capitalize">{active === 'claims' ? 'Emergency Claims' : active}</h1>
            <p className="text-xs text-muted-foreground">Pipull cooperative operations overview</p>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="size-4" />
            Exit admin
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {KPIS.map((k) => (
              <div key={k.label} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      'grid size-8 place-items-center rounded-lg',
                      k.tone === 'verified' && 'bg-verified/10 text-verified',
                      k.tone === 'saffron' && 'bg-saffron/15 text-saffron',
                      k.tone === 'destructive' && 'bg-destructive/10 text-destructive',
                      k.tone === 'brand' && 'bg-primary/10 text-primary',
                    )}
                  >
                    <k.icon className="size-4" />
                  </span>
                  <ArrowUpRight className="size-3.5 text-muted-foreground" />
                </div>
                <p className="mt-2 text-xl font-semibold">{k.value}</p>
                <p className="text-xs text-muted-foreground">{k.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {/* Recent workers table */}
            <section className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
              <h2 className="mb-4 font-semibold">Recently active worker-members</h2>
              <div className="space-y-1">
                {WORKERS.slice(0, 6).map((w) => (
                  <div key={w.id} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted">
                    <Avatar initials={w.initials} hue={w.hue} size={34} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{w.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{w.role.split('(')[0]}</p>
                    </div>
                    <StarRating value={w.rating} />
                    <Chip tone="verified" className="hidden sm:inline-flex">
                      <BadgeCheck className="size-3" />
                      Verified
                    </Chip>
                    <span className="hidden text-sm font-medium sm:block">{formatINR(w.rate)}{w.rateUnit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Operations settings */}
            <section className="rounded-2xl border border-border bg-card p-5">
              <h2 className="mb-4 font-semibold">Operations & Settings</h2>
              <div className="space-y-2">
                <Toggle
                  icon={Boxes}
                  label="Franchise-in-a-box model"
                  desc="Let local partners run a Pipull co-op cell."
                  on={ops.franchise}
                  onToggle={() => setOps((o) => ({ ...o, franchise: !o.franchise }))}
                />
                <Toggle
                  icon={Building}
                  label="RWA hyper-local hiring"
                  desc="Restrict routing to a specific RWA / campus."
                  on={ops.rwa}
                  onToggle={() => setOps((o) => ({ ...o, rwa: !o.rwa }))}
                />
                <Toggle
                  icon={Palette}
                  label="White-label customization"
                  desc="Rebrand the app for enterprise partners."
                  on={ops.whitelabel}
                  onToggle={() => setOps((o) => ({ ...o, whitelabel: !o.whitelabel }))}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function Toggle({
  icon: Icon,
  label,
  desc,
  on,
  onToggle,
}: {
  icon: typeof Boxes
  label: string
  desc: string
  on: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border p-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <button
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={onToggle}
        className={cn('relative h-6 w-11 shrink-0 rounded-full transition-colors', on ? 'bg-primary' : 'bg-muted')}
      >
        <span className={cn('absolute top-0.5 size-5 rounded-full bg-card shadow transition-all', on ? 'left-[calc(100%-1.375rem)]' : 'left-0.5')} />
      </button>
    </div>
  )
}
