export function StatusBar({ time, color, bg }: { time: string; color: string; bg?: string }) {
  return (
    <div
      className="h-11 flex-none flex items-center justify-between px-6 pl-[26px] font-bold text-[15px]"
      style={{ color, background: bg }}
    >
      {time}
      <span className="flex items-center gap-[5px]">
        <span className="w-[6px] h-[6px] rounded-full" style={{ background: color }} />
        <span className="w-2 h-2 rounded-full" style={{ background: color }} />
        <span className="w-[26px] h-3 rounded-[6px]" style={{ background: color }} />
      </span>
    </div>
  )
}
