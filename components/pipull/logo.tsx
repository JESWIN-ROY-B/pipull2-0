export function PipullLogo({
  className,
  variant = 'default',
}: {
  className?: string
  variant?: 'default' | 'invert'
}) {
  const invert = variant === 'invert'
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className={
            invert
              ? 'grid size-8 place-items-center rounded-lg bg-primary-foreground text-primary'
              : 'grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground'
          }
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" strokeWidth={2.2} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 20V7a3 3 0 0 1 3-3h5a4 4 0 0 1 0 8H7" />
            <circle cx="17.5" cy="16.5" r="3.5" />
          </svg>
        </span>
        <div className="leading-none">
          <div className={invert ? 'text-lg font-semibold tracking-tight text-primary-foreground' : 'text-lg font-semibold tracking-tight text-foreground'}>
            Pipull
          </div>
          <div className={invert ? 'text-[10px] font-medium text-primary-foreground/70' : 'text-[10px] font-medium text-muted-foreground'}>
            Pipull pulls people
          </div>
        </div>
      </div>
    </div>
  )
}
