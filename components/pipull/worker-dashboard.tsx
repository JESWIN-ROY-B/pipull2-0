'use client'

import { useState } from 'react'
import { Avatar, Chip, StarRating, InfoDot } from './primitives'
import { Button } from '@/components/ui/button'
import {
  Trophy,
  Gift,
  Sparkles,
  Vote,
  HandCoins,
  GraduationCap,
  MessagesSquare,
  UsersRound,
  TrendingUp,
  Check,
  Award,
} from 'lucide-react'
import { CURRENT_WORKER, WORKERS, formatINR } from '@/lib/pipull-data'
import { cn } from '@/lib/utils'

const FLOW = ['Register', 'Create Profile', 'Add Skills', 'Set Availability', 'Receive Job', 'Accept', 'Complete', 'Get Paid', 'Reputation']

const LEADERBOARD = [...WORKERS]
  .sort((a, b) => b.jobs - a.jobs)
  .slice(0, 5)

const BADGES = [
  { icon: Trophy, label: 'Top Earner', tone: 'saffron' as const },
  { icon: Award, label: '100+ Jobs', tone: 'brand' as const },
  { icon: Sparkles, label: '5.0 Week', tone: 'verified' as const },
  { icon: UsersRound, label: 'Team Player', tone: 'muted' as const },
]

export function WorkerDashboard({ onVote }: { onVote: () => void }) {
  const w = CURRENT_WORKER
  const step = 8
  const [tab, setTab] = useState<'earnings' | 'coop' | 'grow'>('earnings')

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Header card */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center">
        <Avatar initials={w.initials} hue={w.hue} size={56} />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold">{w.name}</h1>
            <Chip tone="verified">
              <Vote className="size-3.5" />
              Voting Stakeholder
            </Chip>
          </div>
          <p className="text-sm text-muted-foreground">{w.role}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <StarRating value={w.rating} />
            <span>{w.jobs} jobs completed</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {BADGES.map((b) => (
            <span key={b.label} className="flex flex-col items-center gap-1">
              <Chip tone={b.tone}>
                <b.icon className="size-3.5" />
              </Chip>
              <span className="text-[10px] text-muted-foreground">{b.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Workflow */}
      <div className="mt-4 overflow-x-auto">
        <ol className="flex min-w-max items-center gap-2">
          {FLOW.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
                  i < step ? 'bg-verified/10 text-verified' : i === step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
                )}
              >
                {i < step && <Check className="size-3" />}
                {label}
              </span>
              {i < FLOW.length - 1 && <span className="h-px w-4 bg-border" />}
            </li>
          ))}
        </ol>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 rounded-xl border border-border bg-card p-1">
        {(
          [
            { k: 'earnings', label: 'Gamification' },
            { k: 'coop', label: 'Cooperative & Fund' },
            { k: 'grow', label: 'Training & Community' },
          ] as const
        ).map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className={cn(
              'flex-1 rounded-lg py-2 text-sm font-medium transition-colors',
              tab === t.k ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'earnings' && <Gamification />}
        {tab === 'coop' && <Cooperative onVote={onVote} />}
        {tab === 'grow' && <Grow />}
      </div>
    </div>
  )
}

function Panel({ title, icon: Icon, children, action }: { title: string; icon: typeof Trophy; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-semibold">
          <Icon className="size-4.5 text-primary" />
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  )
}

function Gamification() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Panel title="Weekly Leaderboard" icon={Trophy}>
        <ol className="space-y-2">
          {LEADERBOARD.map((w, i) => (
            <li key={w.id} className={cn('flex items-center gap-3 rounded-lg p-2', w.id === CURRENT_WORKER.id && 'bg-primary/5')}>
              <span className={cn('grid size-6 place-items-center rounded-full text-xs font-semibold', i === 0 ? 'bg-saffron text-saffron-foreground' : 'bg-muted text-muted-foreground')}>
                {i + 1}
              </span>
              <Avatar initials={w.initials} hue={w.hue} size={32} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{w.name}</p>
                <p className="text-xs text-muted-foreground">{w.jobs} jobs</p>
              </div>
              <StarRating value={w.rating} />
            </li>
          ))}
        </ol>
      </Panel>

      <Panel title="Weekly Incentives" icon={Gift}>
        <div className="space-y-3">
          <Progress label="Complete 15 gigs" value={11} max={15} reward="₹1,500 bonus" />
          <Progress label="Maintain 4.8★ rating" value={48} max={50} reward="Priority routing" />
          <Progress label="On-time streak" value={6} max={7} reward="₹500 + badge" />
        </div>
      </Panel>

      <Panel title="Sudden Surprises" icon={Sparkles}>
        <div className="space-y-3">
          <div className="rounded-xl border border-saffron/30 bg-saffron/10 p-3">
            <p className="text-sm font-semibold text-saffron">Surprise drop unlocked</p>
            <p className="mt-1 text-xs text-muted-foreground">
              You have earned a random {formatINR(250)} fuel voucher for 3
              five-star gigs in a row.
            </p>
            <Button size="sm" className="mt-2">Claim reward</Button>
          </div>
          <div className="rounded-xl border border-dashed border-border p-3">
            <p className="text-sm font-medium">Mystery bonus</p>
            <p className="text-xs text-muted-foreground">Complete any gig before 10 AM tomorrow to reveal.</p>
          </div>
        </div>
      </Panel>
    </div>
  )
}

function Cooperative({ onVote }: { onVote: () => void }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Panel title="Earnings Ledger" icon={TrendingUp}>
        <div className="space-y-3 text-sm">
          <Row label="This week (gross)" value={formatINR(8400)} />
          <Row label="Flat admin fee" value={`− ${formatINR(420)}`} sub="Just 5% — no hidden cuts" tone="muted" />
          <Row label="Net payout" value={formatINR(7980)} tone="verified" bold />
          <div className="my-2 h-px bg-border" />
          <div className="rounded-xl bg-primary/5 p-3">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              Quarterly Surplus Redistribution
              <InfoDot tip="At the end of each quarter, the cooperative's operating surplus is shared back to worker-members based on contribution." />
            </p>
            <p className="mt-1 text-lg font-semibold text-primary">{formatINR(3120)}</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: '72%' }} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">72% toward next payout on 31 Mar</p>
          </div>
        </div>
      </Panel>

      <Panel title="Cooperative Mutual Fund" icon={HandCoins}>
        <div className="rounded-xl bg-verified/5 p-4 text-center">
          <p className="text-xs text-muted-foreground">Peer-verified relief pool</p>
          <p className="mt-1 text-3xl font-semibold text-verified">{formatINR(1284500)}</p>
          <p className="mt-1 text-xs text-muted-foreground">Balance across 18,421 members</p>
        </div>
        <div className="mt-3 space-y-2 text-sm">
          <Row label="Your contribution" value={formatINR(2400)} tone="muted" />
          <Row label="Open emergency claims" value="31" tone="saffron" />
        </div>
        <Button className="mt-4 w-full" onClick={onVote}>
          <Vote className="size-4" />
          Submit / Vote on Emergency Claim
        </Button>
        <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
          Peer-verified relief funds
          <InfoDot tip="Members vote to approve emergency relief for peers facing medical or income shocks. Payouts require majority peer approval." />
        </p>
      </Panel>

      <Panel title="Democratic Governance" icon={Vote}>
        <ul className="space-y-3 text-sm">
          <li className="rounded-xl border border-border p-3">
            <p className="font-medium">Proposal: raise minimum gig rate</p>
            <p className="text-xs text-muted-foreground">Voting closes in 2 days · 68% in favour</p>
            <div className="mt-2 flex gap-2">
              <Button size="sm" onClick={onVote}>Vote For</Button>
              <Button size="sm" variant="outline" onClick={onVote}>Against</Button>
            </div>
          </li>
          <li className="rounded-xl border border-border p-3">
            <p className="font-medium">Elect Q2 co-op committee</p>
            <p className="text-xs text-muted-foreground">One member, one vote · opens 1 Apr</p>
          </li>
        </ul>
      </Panel>
    </div>
  )
}

function Grow() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Panel title="Onboarding & Certification" icon={GraduationCap}>
        <div className="space-y-3">
          <Course title="Digital literacy basics" progress={100} />
          <Course title="Advanced wiring & safety" progress={60} />
          <Course title="Customer service & upselling" progress={20} />
          <Button variant="outline" size="sm" className="w-full">Browse all skill modules</Button>
        </div>
      </Panel>

      <Panel title="Internal Forum" icon={MessagesSquare}>
        <ul className="space-y-3 text-sm">
          {[
            { u: 'Dinesh P.', m: 'Best supplier for copper wiring in HSR?', r: 12 },
            { u: 'Sunita D.', m: 'Tips for handling last-minute cancellations', r: 8 },
            { u: 'Vikram S.', m: 'Night-shift safety kit recommendations', r: 5 },
          ].map((p) => (
            <li key={p.m} className="rounded-xl border border-border p-3">
              <p className="font-medium">{p.m}</p>
              <p className="text-xs text-muted-foreground">{p.u} · {p.r} replies</p>
            </li>
          ))}
          <Button variant="outline" size="sm" className="w-full">Open forum</Button>
        </ul>
      </Panel>

      <Panel title="Team Up — Group Hiring" icon={UsersRound}>
        <p className="text-sm text-muted-foreground">
          Combine skills with nearby members to take on bigger jobs and split
          earnings fairly.
        </p>
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2 rounded-xl border border-border p-3">
            <div className="flex -space-x-2">
              {WORKERS.slice(1, 4).map((m) => (
                <Avatar key={m.id} initials={m.initials} hue={m.hue} size={28} className="ring-2 ring-card" />
              ))}
            </div>
            <div className="flex-1 text-sm">
              <p className="font-medium">Full-flat renovation crew</p>
              <p className="text-xs text-muted-foreground">3 members · needs 1 painter</p>
            </div>
            <Button size="sm">Join</Button>
          </div>
          <Button variant="outline" size="sm" className="w-full">Start a team</Button>
        </div>
      </Panel>
    </div>
  )
}

function Row({ label, value, sub, tone = 'default', bold }: { label: string; value: string; sub?: string; tone?: 'default' | 'muted' | 'verified' | 'saffron'; bold?: boolean }) {
  const color = tone === 'verified' ? 'text-verified' : tone === 'saffron' ? 'text-saffron' : tone === 'muted' ? 'text-muted-foreground' : 'text-foreground'
  return (
    <div className="flex items-start justify-between">
      <span className="text-muted-foreground">
        {label}
        {sub && <span className="block text-xs">{sub}</span>}
      </span>
      <span className={cn(bold ? 'font-semibold' : 'font-medium', color)}>{value}</span>
    </div>
  )
}

function Progress({ label, value, max, reward }: { label: string; value: number; max: number; reward: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">{value}/{max}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${(value / max) * 100}%` }} />
      </div>
      <p className="mt-1 text-xs text-saffron">{reward}</p>
    </div>
  )
}

function Course({ title, progress }: { title: string; progress: number }) {
  return (
    <div className="rounded-xl border border-border p-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{title}</span>
        {progress === 100 ? <Chip tone="verified"><Check className="size-3" />Done</Chip> : <span className="text-xs text-muted-foreground">{progress}%</span>}
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className={cn('h-full rounded-full', progress === 100 ? 'bg-verified' : 'bg-primary')} style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
