'use client'

import { useMemo, useState } from 'react'
import { WorkerCard } from './worker-card'
import { Chip, InfoDot } from './primitives'
import { Button } from '@/components/ui/button'
import {
  Search,
  Mic,
  Shuffle,
  Gauge,
  MapPin,
  Check,
} from 'lucide-react'
import {
  CATEGORIES,
  WORKERS,
  type WorkerProfile,
} from '@/lib/pipull-data'
import { cn } from '@/lib/utils'

const THRESHOLD = 60

const FLOW = ['Register', 'Create Job', 'See Workers', 'Select', 'Book', 'Pay', 'Track', 'Review']

export function CustomerDashboard({
  onHire,
  onMessage,
  bookedIds,
}: {
  onHire: (w: WorkerProfile) => void
  onMessage: (w: WorkerProfile) => void
  bookedIds: string[]
}) {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState<string>('all')
  const step = Math.min(2 + bookedIds.length, FLOW.length - 1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return WORKERS.filter((w) => (cat === 'all' ? true : w.category === cat))
      .filter((w) => (q ? w.role.toLowerCase().includes(q) || w.name.toLowerCase().includes(q) : true))
      .sort((a, b) => b.match - a.match)
  }, [query, cat])

  const relevant = filtered.filter((w) => w.match >= THRESHOLD)
  const alternatives = filtered.filter((w) => w.match < THRESHOLD)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Workflow stepper */}
      <div className="mb-6 overflow-x-auto">
        <ol className="flex min-w-max items-center gap-2">
          {FLOW.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
                  i < step && 'bg-verified/10 text-verified',
                  i === step && 'bg-primary text-primary-foreground',
                  i > step && 'bg-muted text-muted-foreground',
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

      {/* Search */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/20">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search local talent — electrician, cook, driver…"
            className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button aria-label="Voice search" className="grid size-8 place-items-center rounded-lg text-primary hover:bg-primary/10">
            <Mic className="size-4" />
          </button>
        </div>

        {/* Category chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          <CatChip active={cat === 'all'} onClick={() => setCat('all')}>
            All services
          </CatChip>
          {CATEGORIES.map((c) => (
            <CatChip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
              {c.name.split(' ')[0]}
            </CatChip>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
          <Chip tone="brand">
            <Shuffle className="size-3.5" />
            Rotational / Fair Allocation Mode Active
            <InfoDot tip="Pipull rotates gig offers fairly across qualified worker-members. This prevents top-worker bias and blocks surge pricing." />
          </Chip>
          <Chip tone="muted">
            <Gauge className="size-3.5" />
            Minimum relevance threshold: {THRESHOLD}%
            <InfoDot tip="Semantic matching ranks workers by how well their skills fit your request. Matches below the threshold appear under Alternative Services Nearby." />
          </Chip>
          <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />
            Koramangala, Bengaluru
          </span>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {relevant.length} strong {relevant.length === 1 ? 'match' : 'matches'}
          </h2>
          <span className="text-sm text-muted-foreground">Ranked by semantic relevance</span>
        </div>

        {relevant.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {relevant.map((w) => (
              <WorkerCard
                key={w.id}
                worker={w}
                onHire={onHire}
                onMessage={onMessage}
                booked={bookedIds.includes(w.id)}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
            No strong matches for this search. See alternative services below.
          </p>
        )}

        {alternatives.length > 0 && (
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-lg font-semibold">Alternative Services Nearby</h2>
              <Chip tone="saffron">Below {THRESHOLD}% match</Chip>
            </div>
            <p className="mb-3 text-sm text-muted-foreground">
              These workers are close by but only partially match your request.
              Grouped separately so you always see the best fit first.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {alternatives.map((w) => (
                <WorkerCard
                  key={w.id}
                  worker={w}
                  onHire={onHire}
                  onMessage={onMessage}
                  booked={bookedIds.includes(w.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CatChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
        active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground hover:bg-muted',
      )}
    >
      {children}
    </button>
  )
}
