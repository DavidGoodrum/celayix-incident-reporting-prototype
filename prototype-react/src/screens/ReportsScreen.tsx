import { StatusBar } from '../components/StatusBar'
import { HeaderRow } from '../components/HeaderRow'
import { ReportFlagButton } from '../components/ReportFlagButton'
import { WarningIcon } from '../components/Icons'
import type { PrototypeApi } from '../state'

export function ReportsScreen({ api }: { api: PrototypeApi }) {
  const { state, actions } = api
  const report = state.report
  const attachmentCount = report?.attachments.length ?? 0
  const followUpCount = report?.followUps.length ?? 0
  const preview = (report?.text ?? 'Tree came down across the north parking spaces, blocking three bays and the fire lane.').slice(0, 90) + '…'

  return (
    <>
      <StatusBar time="4:12" color="#000000" bg="#fcfbf8" />
      <HeaderRow
        title="Reports"
        onBack={actions.backFromReports}
        trailing={<ReportFlagButton from="reports" onStart={actions.startFlagPress} onEnd={actions.endFlagPress} />}
      />
      <div className="bg-[#fcfbf8] flex-1 overflow-auto">
        <div className="px-5 pt-4 pb-2 font-bold text-[13px] tracking-[.06em] uppercase text-ink">Today · Police Museum</div>
        <div className="px-5 flex flex-col gap-3">
          {report && (
            <div
              className="bg-white border border-[#e7e0d9] rounded-lg shadow-[0_0_2px_rgba(0,0,0,.2)] p-[15px] cursor-pointer active:opacity-70"
              style={{ borderLeft: '3px solid #e96c24' }}
              onClick={actions.openQueuedDetail}
            >
              <div className="flex items-center justify-between">
                <span className="flex gap-1.5 flex-wrap">
                  {report.requiresAttention && (
                    <span className="inline-flex items-center gap-1.5 font-bold text-xs tracking-[.05em] uppercase text-white bg-danger rounded-full px-2.5 py-1">
                      <WarningIcon />
                      Immediate
                    </span>
                  )}
                  <span className="font-bold text-xs tracking-[.05em] uppercase text-[#e96c24] bg-[#fcf0e9] rounded-full px-2.5 py-1">
                    Queued · offline
                  </span>
                </span>
                <span className="text-[13.5px] text-ink">4:12 PM</span>
              </div>
              <div className="text-[15.5px] leading-[1.45] text-navy mt-2.5">{preview}</div>
              <div className="text-[13px] text-ink mt-2">
                Front Door · Opening Check · {attachmentCount} attachments
                {followUpCount > 0 && ` · ${followUpCount} follow-ups`}
              </div>
            </div>
          )}
          <div className="bg-white border border-[#e7e0d9] rounded-lg shadow-[0_0_2px_rgba(0,0,0,.2)] p-[15px] opacity-60">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs tracking-[.05em] uppercase text-[#0173b4] bg-[rgba(0,188,212,.14)] border border-[rgba(0,188,212,.28)] rounded-full px-2.5 py-0.5">
                Access Control
              </span>
              <span className="text-[13.5px] text-ink">5:48 PM</span>
            </div>
            <div className="text-[15.5px] leading-[1.45] text-navy mt-2.5">
              Loading bay door was propped open with a crate, no staff nearby…
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
