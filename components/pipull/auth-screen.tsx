'use client'

import { useState } from 'react'
import { PipullLogo } from './logo'
import { Button } from '@/components/ui/button'
import { Chip } from './primitives'
import {
  Mic,
  ShieldCheck,
  Users,
  Vote,
  HandCoins,
  User,
  Mail,
  Phone,
  AtSign,
  Lock,
  Headset,
  ArrowRight,
} from 'lucide-react'
import type { Role } from '@/lib/pipull-data'
import { cn } from '@/lib/utils'

type Mode = 'signin' | 'signup'

const HIGHLIGHTS = [
  { icon: Vote, title: 'Workers own the platform', body: 'Every verified worker is a voting stakeholder — one member, one vote.' },
  { icon: HandCoins, title: 'Surplus goes back', body: 'Quarterly surplus is redistributed to workers, not extracted by investors.' },
  { icon: ShieldCheck, title: 'Fair, rotational allocation', body: 'No surge pricing, no top-worker bias. Work is shared democratically.' },
]

export function AuthScreen({ onLogin }: { onLogin: (role: Role) => void }) {
  const [mode, setMode] = useState<Mode>('signin')
  const [role, setRole] = useState<Role>('customer')
  const [assisted, setAssisted] = useState(false)

  return (
    <main className="min-h-dvh lg:grid lg:grid-cols-2">
      {/* Left / brand rail */}
      <section className="relative flex flex-col justify-between overflow-hidden bg-primary px-6 py-8 text-primary-foreground sm:px-10 lg:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-saffron/20 blur-3xl"
        />
        <PipullLogo variant="invert" />

        <div className="relative max-w-md py-10">
          <Chip tone="saffron" className="mb-4 bg-primary-foreground/15 text-primary-foreground">
            Platform cooperativism
          </Chip>
          <h1 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl">
            The gig marketplace owned by the people who do the work.
          </h1>
          <p className="mt-4 text-pretty text-primary-foreground/80">
            Pipull connects households and communities with verified blue-collar
            professionals — and makes those professionals democratic
            stakeholders in the platform they power.
          </p>

          <ul className="mt-8 space-y-4">
            {HIGHLIGHTS.map((h) => (
              <li key={h.title} className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary-foreground/15">
                  <h.icon className="size-4.5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{h.title}</p>
                  <p className="text-sm text-primary-foreground/75">{h.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex items-center gap-2 text-sm text-primary-foreground/70">
          <Users className="size-4" />
          18,421 worker-members · 42,381 people served
        </div>
      </section>

      {/* Right / form */}
      <section className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          {/* Sign in / up switch */}
          <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl border border-border bg-card p-1">
            {(['signin', 'signup'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  'rounded-lg py-2 text-sm font-medium transition-colors',
                  mode === m ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {m === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Role picker */}
          <p className="mb-2 text-sm font-medium text-foreground">I am a…</p>
          <div className="mb-6 grid grid-cols-2 gap-3">
            {(
              [
                { key: 'customer' as Role, label: 'Customer', sub: 'Hire local talent' },
                { key: 'worker' as Role, label: 'Worker', sub: 'Find gigs & earn' },
              ]
            ).map((r) => (
              <button
                key={r.key}
                onClick={() => setRole(r.key)}
                className={cn(
                  'rounded-xl border p-3 text-left transition-colors',
                  role === r.key ? 'border-primary bg-primary/5' : 'border-border bg-card hover:bg-muted',
                )}
              >
                <p className="text-sm font-semibold">{r.label}</p>
                <p className="text-xs text-muted-foreground">{r.sub}</p>
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              onLogin(role)
            }}
            className="space-y-3"
          >
            {mode === 'signup' && (
              <>
                <Field icon={User} label="Full name" placeholder="Rajesh Kumar" />
                <Field icon={Mail} label="Email ID" type="email" placeholder="you@example.com" />
                <Field icon={Phone} label="Phone number" type="tel" placeholder="+91 98765 43210" />
                <Field icon={AtSign} label="Username" placeholder="rajesh_k" />
              </>
            )}
            {mode === 'signin' && (
              <Field icon={AtSign} label="Username or phone" placeholder="rajesh_k" />
            )}
            <Field icon={Lock} label="Password" type="password" placeholder="••••••••" />

            <Button type="submit" size="lg" className="mt-2 w-full">
              {mode === 'signin' ? 'Sign In' : 'Create account'}
              <ArrowRight className="size-4" />
            </Button>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card py-2.5 text-sm font-medium text-foreground hover:bg-muted"
            >
              <Mic className="size-4 text-primary" />
              {mode === 'signin' ? 'Sign in with voice' : 'Continue with voice guidance'}
            </button>
          </form>

          {mode === 'signup' && role === 'worker' && (
            <button
              onClick={() => setAssisted((v) => !v)}
              className={cn(
                'mt-4 flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors',
                assisted ? 'border-saffron bg-saffron/10' : 'border-dashed border-border bg-card hover:bg-muted',
              )}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-saffron/15 text-saffron">
                <Headset className="size-4.5" />
              </span>
              <span>
                <span className="flex items-center gap-2 text-sm font-semibold">
                  Assisted Onboarding
                  {assisted && <Chip tone="saffron">On</Chip>}
                </span>
                <span className="text-xs text-muted-foreground">
                  A cooperative supervisor helps you register step-by-step with
                  voice prompts — built for low digital literacy.
                </span>
              </span>
            </button>
          )}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Protected under the India DPDP Act. Your phone number is never shared
            with the other party.
          </p>
        </div>
      </section>
    </main>
  )
}

function Field({
  icon: Icon,
  label,
  type = 'text',
  placeholder,
}: {
  icon: typeof User
  label: string
  type?: string
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/20">
        <Icon className="size-4 text-muted-foreground" />
        <input
          type={type}
          placeholder={placeholder}
          className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </span>
    </label>
  )
}
