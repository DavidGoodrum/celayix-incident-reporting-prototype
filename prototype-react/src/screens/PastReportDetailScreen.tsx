import { StatusBar } from '../components/StatusBar'
import { HeaderRow } from '../components/HeaderRow'
import { SparkleIcon } from '../components/Icons'
import { AttachmentsSection, CategoryPill, PhotoViewer, PriorityPill } from '../components/ReportPieces'
import { PAST_REPORTS } from '../types'
import type { PrototypeApi } from '../state'

/** Read-only view of an earlier report opened from report history. */
export function PastReportDetailScreen({ api }: { api: PrototypeApi }) {
  const { state, actions } = api
  const p = PAST_REPORTS.find((r) => r.id === state.pastId) ?? PAST_REPORTS[0]

  return (
    <>
      <StatusBar time="4:19" color="#000000" bg="#fcfbf8" />
      <HeaderRow title="Incident report" onBack={actions.backFromPast} />
      <div className="bg-[#fcfbf8] flex-1 overflow-auto pb-4">
        <div className="px-5 pt-4">
          <div className="font-bold text-[22px] leading-[1.25] text-navy tracking-[-.015em]">{p.title}</div>
          <div className="flex gap-1.5 mt-3">
            <CategoryPill label={p.category} />
            <PriorityPill label={p.priority} />
          </div>
          <div className="text-[13.5px] leading-[1.6] text-ink mt-2">
            {p.byline}
            <br />
            Mar 24, 2026 · {p.time}
          </div>
        </div>
        <div className="mx-5 mt-2.5 bg-white border border-[#d4eefd] rounded-lg shadow-[0_0_2px_rgba(0,0,0,.2)] px-[15px] py-2.5">
          <div className="flex items-center gap-2">
            <SparkleIcon />
            <span className="font-bold text-[13px] tracking-[.05em] uppercase text-accent">Enhanced report</span>
          </div>
          <div className="text-[15.5px] leading-[1.55] text-navy mt-2.5">{p.enhanced}</div>
        </div>
        <div className="mx-5 mt-2.5 bg-white border border-[#e7e0d9] rounded-lg shadow-[0_0_2px_rgba(0,0,0,.2)] px-[15px] py-2.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[13px] tracking-[.05em] uppercase text-ink">Your note</span>
            <span className="text-[12.5px] text-ink ml-auto">Locked</span>
          </div>
          <div className="text-[15.5px] leading-[1.55] text-[#333333] mt-2.5">{p.text}</div>
        </div>
        <AttachmentsSection photos={p.photos} onOpen={actions.openPhoto} />
      </div>
      <div className="flex-none bg-[#fcfbf8] shadow-[0_1px_4px_1px_rgba(0,0,0,.1)]">
        <div className="flex items-center gap-2 px-5 pt-2.5">
          <span className="text-[13.5px] text-ink">Synced {p.syncedAt} · visible to your supervisor</span>
        </div>
        <div className="flex gap-2.5 px-5 pt-2.5 pb-4">
          <span
            className="flex-1 flex h-12 rounded-lg bg-brand items-center justify-center font-bold text-[16px] text-white cursor-pointer active:opacity-70 shadow-[0_0_4px_rgba(0,0,0,.3)]"
            onClick={actions.backFromPast}
          >
            Done
          </span>
        </div>
      </div>
      <PhotoViewer photos={p.photos} index={state.photoIndex} title={p.title} time={p.time} onClose={actions.closePhoto} />
    </>
  )
}
