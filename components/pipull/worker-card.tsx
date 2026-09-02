'use client'

import { Avatar, VerifyBadge, StarRating, Chip } from './primitives'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, MessageSquare, CircleDot } from 'lucide-react'
import { formatINR, type WorkerProfile } from '@/lib/pipull-data'
import { cn } from '@/lib/utils'

export function WorkerCard({
  worker,
  onHire,
  onMessage,
  booked,
}: {
  worker: WorkerProfile
  onHire: (w: WorkerProfile) => void
  onMessage: (w: WorkerProfile) => void
  booked?: boolean
}) {
  const low = worker.match < 60
  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-md">
      <div className="flex items-start gap-3">
        <Avatar initials={worker.initials} hue={worker.hue} size={48} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold">{worker.name}</h3>
          </div>
          <p className="truncate text-sm text-muted-foreground">{worker.role}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <StarRating value={worker.rating} />
            <span>{worker.jobs} jobs</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3" />
              {worker.distanceKm} km
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-base font-semibold text-foreground">{formatINR(worker.rate)}</p>
          <p className="text-xs text-muted-foreground">{worker.rateUnit}</p>
        </div>
      </div>

      {/* Match + availability */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
            low ? 'bg-saffron/15 text-saffron' : 'bg-primary/10 text-primary',
          )}
        >
          {worker.match}% match
        </span>
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
            worker.available ? 'bg-verified/10 text-verified' : 'bg-muted text-muted-foreground',
          )}
        >
          <CircleDot className="size-3" />
          {worker.availability}
        </span>
      </div>

      {/* Verification badges */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {worker.badges.map((b) => (
          <VerifyBadge key={b} badge={b} />
        ))}
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
        <Button className="flex-1" onClick={() => onHire(worker)} disabled={booked}>
          {booked ? 'Requested' : 'Hire / Request Gig'}
        </Button>
        <Button variant="outline" size="icon-lg" aria-label="View schedule & availability">
          <Calendar className="size-4" />
        </Button>
        <Button variant="outline" size="icon-lg" aria-label="Contact / message" onClick={() => onMessage(worker)}>
          <MessageSquare className="size-4" />
        </Button>
      </div>
    </article>
  )
}
