import { StatusBar } from '../components/StatusBar'
import { ReportFlagButton } from '../components/ReportFlagButton'
import { BellIcon, CheckIcon, ChevronRight, DocumentIcon } from '../components/Icons'
import type { PrototypeApi } from '../state'

function BottomNav() {
  const items = [
    { label: 'DASHBOARD', active: true },
    { label: 'SCHEDULE', active: false },
    { label: 'TIMESHEETS', active: false },
    { label: 'MY ACCOUNT', active: false },
  ]
  return (
    <div className="border-t border-[#ebe9e3] bg-[#f7f6f3] pt-2 pb-5 px-1.5 flex flex-none">
      {items.map((item) => (
        <span key={item.label} className="flex-1 flex flex-col items-center gap-1">
          <span
            className="w-[22px] h-[22px] rounded-full"
            style={{ background: item.active ? '#ff5c00' : '#5b5651', opacity: item.active ? 1 : 0.85 }}
          />
          <span
            className="font-bold text-[10.5px] tracking-[.02em]"
            style={{ color: item.active ? '#ff5c00' : '#5b5651' }}
          >
            {item.label}
          </span>
        </span>
      ))}
    </div>
  )
}

export function ShiftScreen({ api }: { api: PrototypeApi }) {
  const { state, actions } = api

  return (
    <>
      {state.checkedIn ? (
        <>
        <div style={{ background: '#ff5c00' }} className="flex-none">
          <StatusBar time="4:12" color="#fff" />
          <div className="h-14 flex items-center px-[18px] gap-1.5 relative">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
              <circle cx="12" cy="12" r="11" />
              <path
                d="M12 17.6a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3zM12 4.2c-2.4 0-4.1 1.5-4.3 3.8h2.3c.1-1.1.8-1.8 2-1.8 1.1 0 1.9.7 1.9 1.7 0 .8-.4 1.3-1.4 2-1.2.8-1.7 1.6-1.6 3v.7h2.2v-.5c0-1 .4-1.5 1.5-2.2 1.3-.9 1.9-1.8 1.9-3.2 0-2.1-1.7-3.5-4.5-3.5z"
                fill="#ff5c00"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-bold text-lg text-white pointer-events-none">
              Dashboard
            </span>
            <span className="flex-1" />
            <span className="relative flex cursor-pointer" onClick={actions.goToReports}>
              <BellIcon stroke="#fff" />
            </span>
            <span className="ml-1.5">
              <ReportFlagButton from="shift" onStart={actions.startFlagPress} onEnd={actions.endFlagPress} light />
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between px-5 py-[11px] text-[13px] text-ink border-b border-[#ebe9e3] flex-none">
          <span>No missing actions</span>
          <span className="text-brand font-bold">Current shift</span>
          <span>No upcoming shifts</span>
        </div>
        <div className="text-center px-5 pt-4 flex-none">
          <div className="font-bold text-[30px] text-navy tracking-[-.02em]">March 24, 2026</div>
          <div className="text-[16px] text-ink mt-1">4:12 pm - 11:12 pm</div>
        </div>
        <div
          className="mx-5 mt-2.5 border border-[#ebe9e3] rounded-2xl bg-white px-3.5 py-2.5 flex items-center gap-3.5 flex-none cursor-pointer active:opacity-70"
          onClick={actions.checkOut}
        >
          <span className="w-10 h-10 rounded-full bg-[#ecfdf4] flex items-center justify-center flex-none">
            <CheckIcon size={20} stroke="#15803d" strokeWidth={2.4} />
          </span>
          <span>
            <span className="block font-bold text-[16px] text-navy">Checked in 4:12 pm</span>
            <span className="block text-[13.5px] text-ink mt-px">Tap to check out</span>
          </span>
        </div>
        <div className="flex gap-6 px-[22px] pt-[18px] border-b border-[#ebe9e3] flex-none">
          <span className="font-bold text-sm tracking-[.04em] text-brand pb-2 border-b-2 border-brand">DETAILS</span>
          <span className="text-sm tracking-[.04em] text-ink pb-2">MAP</span>
          <span className="text-sm tracking-[.04em] text-ink pb-2">ACTIVITIES</span>
          <span className="text-sm tracking-[.04em] text-ink pb-2">LOG</span>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="flex items-center gap-4 px-5 py-2.5 border-b border-[#ebe9e3]">
            <span className="w-[22px] flex justify-center flex-none">
              <DocumentIcon fill="#5b5651" />
            </span>
            <span className="flex-1 text-[16px] text-[#3d4b56]">Documents</span>
            <span className="flex items-center gap-2.5">
              <span className="min-w-6 h-6 rounded-full bg-brand flex items-center justify-center font-bold text-[13px] text-white px-1.5">4</span>
              <ChevronRight />
            </span>
          </div>
          <div className="flex items-center gap-4 px-5 py-2.5 border-b border-[#ebe9e3] cursor-pointer" onClick={() => actions.goTo('tour')}>
            <span className="w-[22px] flex justify-center flex-none">
              <DocumentIcon fill="#5b5651" />
            </span>
            <span className="flex-1 text-[16px] text-[#3d4b56]">Tours</span>
            <span className="flex items-center gap-2.5">
              <span className="min-w-6 h-6 rounded-full bg-brand flex items-center justify-center font-bold text-[13px] text-white px-1.5">7</span>
              <ChevronRight />
            </span>
          </div>
          <div className="flex items-center gap-4 px-5 py-2.5 border-b border-[#ebe9e3] cursor-pointer" onClick={actions.goToReports}>
            <span className="w-[22px] flex justify-center flex-none">
              <DocumentIcon fill="#5b5651" />
            </span>
            <span className="flex-1 text-[16px] text-[#3d4b56]">Reports</span>
            <span className="flex items-center gap-2.5">
              <span className="min-w-6 h-6 rounded-full bg-brand flex items-center justify-center font-bold text-[13px] text-white px-1.5">
                {state.report ? 1 : 0}
              </span>
              <ChevronRight />
            </span>
          </div>
          <div className="flex items-center gap-4 px-5 py-2.5 border-b border-[#ebe9e3]">
            <span className="w-[22px] flex justify-center flex-none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#5b5651">
                <path d="M7 2h2v2h6V2h2v2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2zM5 10v10h14V10z" />
              </svg>
            </span>
            <span className="flex-1 text-[16px] text-[#3d4b56]">Shift date</span>
            <span className="font-bold text-[16px] text-navy">03/24/2026</span>
          </div>
          <div className="flex items-center gap-4 px-5 py-2.5 border-b border-[#ebe9e3]">
            <span className="flex-1 text-[16px] text-[#3d4b56]">Customer</span>
            <span className="font-bold text-[16px] text-navy">Museum Group</span>
          </div>
          <div className="flex items-center gap-4 px-5 py-2.5">
            <span className="flex-1 text-[16px] text-[#3d4b56]">Site</span>
            <span className="font-bold text-[16px] text-navy">Police Museum</span>
          </div>
        </div>
        <div className="border-t border-[#ebe9e3] px-5 py-3.5 flex gap-3 flex-none">
          <span
            className="flex-1 h-12 rounded-xl bg-brand flex items-center justify-center gap-2 font-bold text-[16px] text-white cursor-pointer active:opacity-70"
            onClick={() => actions.goTo('tour')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z" />
            </svg>
            Start Tour
          </span>
        </div>
        </>
      ) : (
        <>
          <div style={{ background: '#fafaf7' }} className="flex-none">
            <StatusBar time="4:53" color="#1c3d59" />
            <div className="h-14 flex items-center px-[18px] gap-1.5 relative">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#1c3d59">
                <circle cx="12" cy="12" r="11" />
                <path
                  d="M12 17.6a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3zM12 4.2c-2.4 0-4.1 1.5-4.3 3.8h2.3c.1-1.1.8-1.8 2-1.8 1.1 0 1.9.7 1.9 1.7 0 .8-.4 1.3-1.4 2-1.2.8-1.7 1.6-1.6 3v.7h2.2v-.5c0-1 .4-1.5 1.5-2.2 1.3-.9 1.9-1.8 1.9-3.2 0-2.1-1.7-3.5-4.5-3.5z"
                  fill="#fff"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-bold text-lg text-navy pointer-events-none">
                Dashboard
              </span>
              <span className="flex-1" />
              <span className="relative flex cursor-pointer" onClick={actions.goToReports}>
                <BellIcon />
              </span>
              <span className="ml-1.5">
                <ReportFlagButton from="shift" onStart={actions.startFlagPress} onEnd={actions.endFlagPress} />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between px-5 py-[11px] text-[13px] text-ink border-b border-[#ebe9e3] flex-none">
            <span>No missing actions</span>
            <span>No current shift</span>
            <span>Next shift 8am</span>
          </div>
          <div
            className="flex-1 flex flex-col items-center justify-center px-10 text-center cursor-pointer active:opacity-70"
            onClick={actions.checkIn}
          >
            <div className="w-14 h-14 rounded-full bg-[#efece5] flex items-center justify-center">
              <CheckIcon size={28} stroke="#8a857c" strokeWidth={1.8} />
            </div>
            <div className="font-bold text-[19px] text-navy mt-4">Checked out at 4:52 pm</div>
            <div className="text-[14.5px] text-ink mt-1.5" style={{ textWrap: 'pretty' } as React.CSSProperties}>
              No shift to file against, so Report falls back to an off-shift report. Tap here to check back in.
            </div>
          </div>
        </>
      )}
      <BottomNav />
    </>
  )
}
