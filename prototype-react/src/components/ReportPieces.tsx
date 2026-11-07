import { StatusBar } from './StatusBar'
import { XIcon } from './Icons'
import type { Photo } from '../types'

export function CategoryPill({ label }: { label: string }) {
  return (
    <span className="font-bold text-xs tracking-[.05em] uppercase text-[#0173b4] bg-[rgba(0,188,212,.14)] border border-[rgba(0,188,212,.28)] rounded-full px-2.5 py-0.5">
      {label}
    </span>
  )
}

export function PriorityPill({ label }: { label: string }) {
  return (
    <span className="font-bold text-xs tracking-[.05em] uppercase text-ink bg-[#f3f3f3] border border-[#e6e6e6] rounded-full px-2.5 py-0.5">
      {label}
    </span>
  )
}

/** "Attachments" heading plus a row of tappable photo thumbnails. */
export function AttachmentsSection({ photos, onOpen }: { photos: Photo[]; onOpen: (index: number) => void }) {
  if (!photos.length) return null
  return (
    <>
      <div className="flex items-center gap-2.5 px-5 pt-3">
        <span className="font-bold text-[13px] tracking-[.06em] uppercase text-ink">Attachments</span>
        <span className="text-[13px] text-ink">{photos.length}</span>
      </div>
      <div className="flex gap-2 px-5 pt-2 flex-wrap">
        {photos.map((ph, i) => (
          <img
            key={i}
            src={ph.src}
            alt={ph.alt}
            className="flex-none w-[72px] h-[72px] rounded-lg object-cover block border border-[#e7e0d9] bg-[#eeeeee] cursor-pointer active:opacity-70"
            onClick={() => onOpen(i)}
          />
        ))}
      </div>
    </>
  )
}

/** Full-screen photo viewer laid over the phone screen. */
export function PhotoViewer({
  photos,
  index,
  title,
  time,
  onClose,
}: {
  photos: Photo[]
  index: number | null
  title: string
  time: string
  onClose: () => void
}) {
  const ph = index != null ? photos[index] : null
  if (!ph || index == null) return null
  return (
    <div className="absolute inset-0 z-30 bg-black flex flex-col">
      <StatusBar time="4:19" color="#fff" />
      <div className="h-[52px] flex-none flex items-center px-5 relative">
        <span className="w-10 h-10 -ml-2 flex items-center justify-center cursor-pointer active:opacity-70" onClick={onClose}>
          <XIcon size={22} stroke="#fff" />
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-[16px] text-white pointer-events-none">
          Photo {index + 1} of {photos.length}
        </span>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center cursor-pointer" onClick={onClose}>
        <img src={ph.src} alt={ph.alt} className="w-full max-h-full object-contain block" />
      </div>
      <div className="px-6 pt-3.5 pb-[30px] flex-none text-center text-[14px] leading-[1.5] text-[rgba(255,255,255,.8)]">
        {title}
        <br />
        <span className="text-[rgba(255,255,255,.55)]">Mar 24, 2026 · {time}</span>
      </div>
    </div>
  )
}
