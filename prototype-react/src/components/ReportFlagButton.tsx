import { ClipboardIcon } from './Icons'
import type { ReportFrom } from '../types'

export function ReportFlagButton({
  from,
  onStart,
  onEnd,
  light,
}: {
  from: ReportFrom
  onStart: (from: ReportFrom) => void
  onEnd: () => void
  light?: boolean
}) {
  return (
    <span
      className="w-[34px] h-[34px] rounded-full flex items-center justify-center flex-none cursor-pointer active:opacity-70"
      style={{ background: light ? 'rgba(255,255,255,.22)' : '#f3f3f3' }}
      onMouseDown={() => onStart(from)}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={() => onStart(from)}
      onTouchEnd={onEnd}
    >
      <ClipboardIcon stroke={light ? '#fff' : '#000000'} />
    </span>
  )
}
