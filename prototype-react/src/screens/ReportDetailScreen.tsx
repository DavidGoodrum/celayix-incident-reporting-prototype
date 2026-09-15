import { StatusBar } from '../components/StatusBar'
import { HeaderRow } from '../components/HeaderRow'
import { CheckIcon, ProcessingIcon, SparkleIcon, XIcon } from '../components/Icons'
import type { PrototypeApi } from '../state'

export function ReportDetailScreen({ api }: { api: PrototypeApi }) {
  const { state, actions, isReportSynced } = api
  const report = state.report ?? { text: '', requiresAttention: false, attachments: [], followUps: [] }
  const hasFollowUps = report.followUps.length > 0
  const originalNoteLabel = hasFollowUps ? 'Original note' : 'Your note'
  const reportText =
    report.text || 'Tree came down across the north parking spaces, blocking three bays and the fire lane. Branches are on a parked car.'
  const showSubmitBanner = state.justSubmitted && !state.bannerDismissed && !isReportSynced
  const footerText = isReportSynced
    ? 'Synced 4:19 PM · visible to your supervisor'
    : 'Waiting for a connection · saved on this device'

  return (
    <>
      <StatusBar time="4:19" color="#1c3d59" bg="#fafaf7" />
      <HeaderRow title="Incident report" onBack={actions.backFromDetail} />
      <div className="bg-[#fafaf7] flex-1 overflow-auto">
        {showSubmitBanner && (
          <div className="mx-5 mt-3 bg-[#f5fafc] border border-[#cfe6f0] rounded-2xl px-3.5 py-2.5 flex gap-2.5 items-center">
            <span className="flex-none w-[22px] h-[22px] rounded-full bg-[#00bcd4] flex items-center justify-center mt-px">
              <CheckIcon size={13} strokeWidth={3.2} />
            </span>
            <span className="flex-1 font-bold text-[14.5px] text-[#0b3e5c]">Report saved</span>
            <span className="flex-none w-6 h-6 flex items-center justify-center cursor-pointer active:opacity-70" onClick={actions.dismissBanner}>
              <XIcon />
            </span>
          </div>
        )}

        {isReportSynced ? (
          <div className="px-5 pt-4">
            <div className="font-bold text-[22px] leading-[1.25] text-navy tracking-[-.015em]">Fallen tree blocking north parking</div>
            <div className="flex gap-1.5 mt-3">
              <span className="font-bold text-xs tracking-[.05em] uppercase text-[#0b3e5c] bg-[rgba(0,188,212,.14)] border border-[rgba(0,188,212,.28)] rounded-full px-2.5 py-1">
                Safety Hazard
              </span>
              <span className="font-bold text-xs tracking-[.05em] uppercase text-white bg-danger rounded-full px-2.5 py-[5px]">High priority</span>
            </div>
            {report.requiresAttention && (
              <div className="flex items-center gap-2.5 mt-2.5 bg-[#fdecea] border border-[#f3c9c4] rounded-[10px] px-3 py-2">
                <CheckIcon size={16} stroke="#b91c1c" strokeWidth={2.6} />
                <span className="font-bold text-[13.5px] text-[#8c1d16]">Supervisor notified</span>
              </div>
            )}
            <div className="text-[13.5px] leading-[1.6] text-ink mt-2">
              A. Quijada · Police Museum · Opening Check · Front Door
              <br />
              Mar 24, 2026 · 4:12 PM
            </div>
          </div>
        ) : (
          <div className="px-5 pt-4">
            <div className="flex flex-col gap-2 max-w-[250px]">
              <span className="h-[15px] rounded-[6px] bg-[#ebe9e3] w-full" />
              <span className="h-[15px] rounded-[6px] bg-[#ebe9e3] w-[70%]" />
            </div>
            <div className="flex gap-1.5 mt-3">
              <span className="font-bold text-xs tracking-[.05em] uppercase text-ink bg-[#efece5] rounded-full px-2.5 py-1 flex items-center gap-1.5">
                <ProcessingIcon size={11} />
                Processing
              </span>
            </div>
            {report.requiresAttention && (
              <div className="flex items-center gap-2.5 mt-2.5 bg-[#fdecea] border border-[#f3c9c4] rounded-[10px] px-3 py-2">
                <CheckIcon size={16} stroke="#b91c1c" strokeWidth={2.6} />
                <span className="font-bold text-[13.5px] text-[#8c1d16]">Supervisor notified</span>
              </div>
            )}
            <div className="text-[13.5px] leading-[1.6] text-ink mt-3">
              A. Quijada · Police Museum · Opening Check · Front Door
              <br />
              Mar 24, 2026 · 4:12 PM
            </div>
          </div>
        )}

        <div className="mx-5 mt-2.5 bg-white border border-[#ebe9e3] rounded-2xl px-[15px] py-2.5">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[13px] tracking-[.05em] uppercase text-ink">{originalNoteLabel}</span>
            <span className="text-[12.5px] text-ink ml-auto">Locked</span>
          </div>
          <div className="text-[15.5px] leading-[1.55] text-[#3d4b56] mt-2.5">{reportText}</div>
        </div>

        {hasFollowUps && (
          <>
            <div className="flex items-center gap-2.5 px-5 pt-1.5 mt-1">
              <span className="font-bold text-[13px] tracking-[.06em] uppercase text-ink">Follow-ups</span>
              <span className="min-w-[22px] h-[22px] rounded-full bg-brand flex items-center justify-center font-bold text-xs text-white px-1.5">
                {report.followUps.length}
              </span>
            </div>
            <div className="px-5 pt-2 flex flex-col gap-2">
              {report.followUps.map((fu, i) => (
                <div key={i} className="bg-white border border-[#ebe9e3] rounded-2xl px-[15px] py-2.5" style={{ borderLeft: '3px solid #ff5c00' }}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[13px] tracking-[.05em] uppercase text-ink">Follow-up {i + 1}</span>
                    <span className="text-[13px] text-ink">{fu.time}</span>
                  </div>
                  <div className="text-[15px] leading-[1.5] text-[#3d4b56] mt-2">{fu.text}</div>
                  {fu.attachments.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {fu.attachments.map((_, ai) => (
                        <span key={ai} className="w-[52px] h-[52px] rounded-xl bg-[#cfd6cf] flex-none" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {isReportSynced ? (
          <div className="mx-5 mt-2.5 bg-white border border-[#cfe6f0] rounded-2xl px-[15px] py-2.5">
            <div className="flex items-center gap-2">
              <SparkleIcon />
              <span className="font-bold text-[13px] tracking-[.05em] uppercase text-accent">Enhanced report</span>
            </div>
            <div className="text-[15.5px] leading-[1.55] text-navy mt-2.5">
              A tree has fallen across the north parking area at Police Museum, obstructing three parking bays and the designated fire
              lane. Branches are resting on a parked vehicle. Prompt clearance required.
            </div>
          </div>
        ) : (
          <>
            <div className="mx-5 mt-3 bg-[#f5fafc] border border-[#cfe6f0] rounded-2xl px-[15px] py-3">
              <div className="flex items-center gap-2">
                <SparkleIcon />
                <span className="font-bold text-[13px] tracking-[.05em] uppercase text-accent">Enhanced report</span>
              </div>
              <div className="flex flex-col gap-2 mt-3.5">
                <span className="h-[11px] rounded-[6px] bg-[#dcebf3] w-full" />
                <span className="h-[11px] rounded-[6px] bg-[#dcebf3] w-[92%]" />
                <span className="h-[11px] rounded-[6px] bg-[#dcebf3] w-[64%]" />
              </div>
              <div className="text-[13.5px] leading-[1.5] text-accent mt-3.5" style={{ textWrap: 'pretty' } as React.CSSProperties}>
                Appears here as soon as a signal comes back.
              </div>
            </div>
            <div
              className="self-center mx-auto mt-3.5 w-fit font-bold text-[11px] tracking-[.03em] text-[#8a4410] bg-[#ffeee0] border border-dashed border-[#ff9d5c] rounded-full px-3 py-1.5 cursor-pointer active:opacity-70"
              style={{ marginLeft: 20 }}
              onClick={actions.simulateSync}
            >
              Simulate sync completing →
            </div>
          </>
        )}
      </div>
      <div className="border-t border-[#ebe9e3] flex-none bg-[#fafaf7]">
        <div className="flex items-center gap-2 px-5 pt-2.5">
          <span className="text-[13.5px] text-ink">{footerText}</span>
        </div>
        <div className="flex gap-2.5 px-5 pt-2.5 pb-4">
          <span
            className="flex-1 flex h-12 border border-[#d9d6ce] rounded-xl bg-white items-center justify-center gap-2 font-bold text-[16px] text-navy cursor-pointer active:opacity-70"
            onClick={actions.openFollowUp}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c3d59" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add follow-up
          </span>
          {state.justSubmitted && (
            <span
              className="flex-1 flex h-12 rounded-xl bg-brand items-center justify-center font-bold text-[16px] text-white cursor-pointer active:opacity-70"
              onClick={actions.doneSubmitted}
            >
              Done
            </span>
          )}
        </div>
      </div>
    </>
  )
}
