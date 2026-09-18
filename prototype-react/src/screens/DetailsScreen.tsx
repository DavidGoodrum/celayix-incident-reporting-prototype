import { StatusBar } from '../components/StatusBar'
import { CheckIcon, LocationIcon } from '../components/Icons'
import type { PrototypeApi } from '../state'

function WheelColumn({
  flex,
  items,
  col,
  api,
}: {
  flex: number
  items: { idx: number; label: string }[]
  col: 'day' | 'hour' | 'min' | 'mer'
  api: PrototypeApi
}) {
  return (
    <div
      className="box-border h-[216px] overflow-y-auto no-scrollbar wheel-mask"
      style={{ flex, scrollSnapType: 'y mandatory', padding: '90px 0' }}
      ref={(el) => api.actions.setWheelRef(col, el)}
      data-col={col}
      onScroll={(e) => api.actions.wheelScroll(col, e.currentTarget)}
    >
      {items.map((item) => (
        <div
          key={item.idx}
          className="h-9 flex items-center justify-center text-[20px] text-[#000000] whitespace-nowrap cursor-pointer"
          style={{ scrollSnapAlign: 'center' }}
          onClick={() => api.actions.wheelTap(col, item.idx)}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}

export function DetailsScreen({ api }: { api: PrototypeApi }) {
  const { state, actions, ctx, days } = api
  const checkpointOptions = api.checkpoints.map((name) => ({
    name,
    selected: name === (state.pendingCheckpoint || 'Front Door'),
  }))
  const hourOptions = Array.from({ length: 12 }, (_, i) => ({ idx: i, label: String(i + 1) }))
  const minOptions = Array.from({ length: 60 }, (_, i) => ({ idx: i, label: String(i).padStart(2, '0') }))
  const merOptions = [{ idx: 0, label: 'AM' }, { idx: 1, label: 'PM' }]
  const dayOptions = days.map((n, i) => ({ idx: i, label: n }))

  return (
    <>
      <StatusBar time="4:12" color="#000000" bg="#fcfbf8" />
      <div className="h-[52px] flex-none flex items-center gap-3.5 px-5 border-b border-[#e7e0d9] relative">
        <span className="cursor-pointer active:opacity-70" onClick={actions.cancelDetails}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </span>
        <span className="absolute inset-0 flex items-center justify-center font-bold text-[17px] text-navy pointer-events-none">
          Incident details
        </span>
        <span className="flex-1" />
        <span className="w-[22px] flex-none" />
      </div>
      <div className="flex-1 overflow-auto px-5 bg-[#fcfbf8]">
        <FieldRow
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#676767" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18M5 21V7l7-4 7 4v14" />
              <path d="M9 21v-6h6v6" />
            </svg>
          }
          label="Site"
          badge="Auto-captured"
          value="Police Museum"
          note="Cannot be changed"
        />
        <FieldRow
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#676767" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 11h18" />
            </svg>
          }
          label="Shift"
          badge="Auto-captured"
          value="Day Shift · 7:00 AM – 3:00 PM"
          note="Cannot be changed"
        />
        <FieldRow
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#676767" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM18 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
              <path d="M8 6h6a4 4 0 0 1 0 8h-4a4 4 0 0 0 0 8h6" />
            </svg>
          }
          label="Tour"
          badge="Auto-captured"
          value={ctx.tour}
          note="Cannot be changed"
        />

        <div className="flex gap-3.5 py-3.5 border-b border-[#e7e0d9]">
          <span className="flex-none w-[22px] flex justify-center pt-0.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#676767" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <span className="flex-1 min-w-0">
            <span className="block font-bold text-[15px] text-navy">Checkpoint</span>
            <span className="relative block">
              <span
                className="flex items-center gap-2 mt-1.5 border rounded-[10px] bg-white px-3 py-2.5 cursor-pointer"
                style={{ borderColor: state.checkpointListOpen ? '#e96c24' : '#a7a7a7' }}
                onClick={actions.toggleCheckpointList}
              >
                <span className="flex-1 text-[15px] text-navy">{state.pendingCheckpoint || 'Front Door'}</span>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#333333"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-none"
                  style={{ transform: state.checkpointListOpen ? 'rotate(180deg)' : 'none' }}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
              {state.checkpointListOpen && (
                <span className="absolute left-0 right-0 top-full mt-1.5 z-[5] border border-[#a7a7a7] rounded-[10px] bg-white overflow-hidden shadow-[0_12px_24px_-8px_rgba(17,17,17,.28)] block">
                  {checkpointOptions.map((opt, i) => (
                    <span
                      key={opt.name}
                      className="flex items-center gap-2.5 px-3 py-[11px] cursor-pointer"
                      style={{
                        borderBottom: i === checkpointOptions.length - 1 ? 'none' : '1px solid #e7e0d9',
                        background: opt.selected ? '#fef9f6' : '#fff',
                      }}
                      onClick={() => actions.pickCheckpoint(opt.name)}
                    >
                      <span className="flex-1 text-[15px] text-navy">{opt.name}</span>
                      {opt.selected && <CheckIcon size={16} stroke="#e96c24" strokeWidth={2.6} />}
                    </span>
                  ))}
                </span>
              )}
            </span>
            <span className="block text-[12.5px] text-muted mt-1.5">
              Originally captured: {state.reportFrom === 'checkpoint' ? 'Front Door' : 'None set'}
            </span>
          </span>
        </div>

        <div className="flex gap-3.5 py-3.5 border-b border-[#e7e0d9]">
          <span className="flex-none w-[22px] flex justify-center pt-0.5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#676767" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </span>
          <span className="flex-1 min-w-0">
            <span className="block font-bold text-[15px] text-navy">Incident time</span>
            <span
              className="flex items-center gap-2 mt-1.5 border border-[#a7a7a7] rounded-[10px] bg-white px-3 py-2.5 cursor-pointer"
              onClick={actions.openTimePicker}
            >
              <span className="flex-1 text-[15px] text-navy">{state.pendingTime || 'Today, 4:12 PM'}</span>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="flex-none">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4M3 11h18" />
              </svg>
            </span>
            <span className="block text-[12.5px] text-muted mt-1.5">Originally captured: Today, 4:12 PM</span>
          </span>
        </div>

        <div className="flex gap-3.5 py-3.5 border-b border-[#e7e0d9]">
          <span className="flex-none w-[22px] flex justify-center pt-0.5">
            <LocationIcon />
          </span>
          <span className="flex-1 min-w-0">
            <span className="flex items-center gap-2">
              <span className="flex-1 font-bold text-[15px] text-navy">Incident location</span>
              <span className="text-[11.5px] text-ink bg-[#f3f3f3] rounded-full px-2.5 py-0.5 flex-none">Auto-captured</span>
            </span>
            <span className="block text-[15px] text-navy mt-1">49.2827° N, 123.1207° W</span>
            <span className="block text-[12.5px] text-muted mt-0.5">Device location when the report was started · cannot be changed</span>
          </span>
        </div>
      </div>
      <div className="flex gap-2.5 px-4 py-2.5 border-t border-[#e7e0d9] bg-white flex-none">
        <span
          className="flex-1 h-11 rounded-lg flex items-center justify-center font-bold text-[16px] border border-[#a7a7a7] bg-white text-navy cursor-pointer active:opacity-70 shadow-[0_0_4px_rgba(0,0,0,.3)]"
          onClick={actions.cancelDetails}
        >
          Cancel
        </span>
        <span
          className="flex-1 h-11 rounded-lg flex items-center justify-center font-bold text-[16px] bg-brand text-white cursor-pointer active:opacity-70 shadow-[0_0_4px_rgba(0,0,0,.3)]"
          onClick={actions.saveDetails}
        >
          Save
        </span>
      </div>

      {state.timePickerOpen && (
        <div className="absolute inset-0 z-20 flex flex-col justify-end bg-[rgba(28,30,34,.32)]">
          <div className="flex-1 cursor-pointer" onClick={actions.closeTimePicker} />
          <div className="bg-[#f9f9f9] rounded-t-2xl flex-none">
            <div className="flex items-center justify-between px-4 py-[11px] border-b border-[#e6e6e6]">
              <span className="text-[17px] text-[#007eb5] cursor-pointer active:opacity-70" onClick={actions.closeTimePicker}>
                Cancel
              </span>
              <span className="font-bold text-[15px] text-navy">Incident time</span>
              <span className="font-bold text-[17px] text-[#007eb5] cursor-pointer active:opacity-70" onClick={actions.doneTimePicker}>
                Done
              </span>
            </div>
            <div className="relative px-2.5 pt-1.5 pb-3.5">
              <div className="absolute left-3 right-3 top-24 h-9 rounded-[9px] bg-[rgba(120,120,128,.13)] pointer-events-none" />
              <div className="flex">
                <WheelColumn flex={1.9} items={dayOptions} col="day" api={api} />
                <WheelColumn flex={0.72} items={hourOptions} col="hour" api={api} />
                <WheelColumn flex={0.72} items={minOptions} col="min" api={api} />
                <WheelColumn flex={0.9} items={merOptions} col="mer" api={api} />
              </div>
            </div>
            <div className="h-5 flex items-center justify-center">
              <span className="w-[132px] h-[5px] rounded-[3px] bg-navy" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function FieldRow({
  icon,
  label,
  badge,
  value,
  note,
}: {
  icon: React.ReactNode
  label: string
  badge: string
  value: string
  note: string
}) {
  return (
    <div className="flex gap-3.5 py-3.5 border-b border-[#e7e0d9]">
      <span className="flex-none w-[22px] flex justify-center pt-0.5">{icon}</span>
      <span className="flex-1 min-w-0">
        <span className="flex items-center gap-2">
          <span className="flex-1 font-bold text-[15px] text-navy">{label}</span>
          <span className="text-[11.5px] text-ink bg-[#f3f3f3] rounded-full px-2.5 py-0.5 flex-none">{badge}</span>
        </span>
        <span className="block text-[15px] text-navy mt-1">{value}</span>
        <span className="block text-[12.5px] text-muted mt-0.5">{note}</span>
      </span>
    </div>
  )
}
