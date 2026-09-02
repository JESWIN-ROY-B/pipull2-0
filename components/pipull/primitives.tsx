'use client'

import { cn } from '@/lib/utils'
import { ShieldCheck, BadgeCheck, GraduationCap, Building2, Info } from 'lucide-react'
import { BADGE_META, type VerificationBadge } from '@/lib/pipull-data'

export function Avatar({
  initials,
  hue,
  size = 40,
  className,
}: {
  initials: string
  hue: number
  size?: number
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn('grid shrink-0 place-items-center rounded-full font-semibold text-white', className)}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.36,
        background: `linear-gradient(135deg, hsl(${hue} 55% 42%), hsl(${(hue + 40) % 360} 55% 34%))`,
      }}
    >
      {initials}
    </span>
  )
}

const BADGE_ICON: Record<VerificationBadge, typeof ShieldCheck> = {
  kyc: BadgeCheck,
  police: ShieldCheck,
  skill: GraduationCap,
  endorsed: Building2,
}

export function VerifyBadge({ badge }: { badge: VerificationBadge }) {
  const Icon = BADGE_ICON[badge]
  const meta = BADGE_META[badge]
  return (
    <span className="group/badge relative inline-flex">
      <span className="inline-flex items-center gap-1 rounded-full bg-verified/10 px-2 py-0.5 text-[11px] font-medium text-verified">
        <Icon className="size-3" />
        {meta.label}
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-52 -translate-x-1/2 rounded-lg bg-foreground px-3 py-2 text-[11px] leading-snug text-background opacity-0 shadow-lg transition-opacity group-hover/badge:opacity-100"
      >
        {meta.tip}
      </span>
    </span>
  )
}

export function Chip({
  children,
  tone = 'muted',
  className,
}: {
  children: React.ReactNode
  tone?: 'muted' | 'brand' | 'saffron' | 'verified' | 'destructive'
  className?: string
}) {
  const tones: Record<string, string> = {
    muted: 'bg-muted text-muted-foreground',
    brand: 'bg-primary/10 text-primary',
    saffron: 'bg-saffron/15 text-saffron',
    verified: 'bg-verified/10 text-verified',
    destructive: 'bg-destructive/10 text-destructive',
  }
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium', tones[tone], className)}>
      {children}
    </span>
  )
}

export function InfoDot({ tip }: { tip: string }) {
  return (
    <span className="group/info relative inline-flex align-middle">
      <Info className="size-3.5 text-muted-foreground" />
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-56 -translate-x-1/2 rounded-lg bg-foreground px-3 py-2 text-[11px] leading-snug text-background opacity-0 shadow-lg transition-opacity group-hover/info:opacity-100"
      >
        {tip}
      </span>
    </span>
  )
}

export function StarRating({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-saffron">
      <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
        <path d="M12 2l2.9 6.3 6.9.7-5.1 4.7 1.4 6.8L12 17.8 5.9 20.5l1.4-6.8L2.2 9l6.9-.7z" />
      </svg>
      <span className="text-xs font-semibold text-foreground">{value.toFixed(1)}</span>
    </span>
  )
}
