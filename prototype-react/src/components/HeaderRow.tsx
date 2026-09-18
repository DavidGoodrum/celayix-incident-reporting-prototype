import type { ReactNode } from 'react'

export function HeaderRow({
  title,
  onBack,
  trailing,
  bg = '#fcfbf8',
}: {
  title: string
  onBack?: () => void
  trailing?: ReactNode
  bg?: string
}) {
  return (
    <div className="h-[52px] flex-none flex items-center gap-2 px-5 relative" style={{ background: bg }}>
      {onBack ? (
        <span className="cursor-pointer active:opacity-70" onClick={onBack}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </span>
      ) : (
        <span className="w-[22px] flex-none" />
      )}
      <span className="absolute inset-0 flex items-center justify-center font-bold text-[17px] text-navy pointer-events-none">
        {title}
      </span>
      <span className="flex-1" />
      {trailing}
    </div>
  )
}
