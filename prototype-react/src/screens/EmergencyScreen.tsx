import { StatusBar } from '../components/StatusBar'
import type { PrototypeApi } from '../state'

export function EmergencyScreen({ api }: { api: PrototypeApi }) {
  const { state, actions, ctx } = api
  const done = state.emergencyCount <= 0
  const dashOffset = 215 + (3 - Math.max(state.emergencyCount, 0)) * 130

  return (
    <>
      <StatusBar time="4:12" color="#fff" />
      <div className="px-[30px] pt-14 text-center">
        <div className="font-bold text-[13px] tracking-[.1em] uppercase text-[rgba(255,255,255,.7)]">Emergency alert</div>
        {done ? (
          <div className="font-bold text-[28px] leading-[1.25] text-white mt-3 tracking-[-.02em]">Alert sent to your supervisor</div>
        ) : (
          <div className="font-bold text-[28px] leading-[1.25] text-white mt-3 tracking-[-.02em]">Keep holding to alert your supervisor</div>
        )}
      </div>
      <div className="flex items-center justify-center mt-14">
        <div
          className="relative w-[210px] h-[210px] rounded-full bg-danger flex items-center justify-center"
          style={{ boxShadow: '0 0 0 18px rgba(255,255,255,.1), 0 0 0 36px rgba(255,255,255,.06)' }}
        >
          <svg width="210" height="210" viewBox="0 0 210 210" className="absolute inset-0" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="105" cy="105" r="98" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth={8} />
            <circle
              cx="105"
              cy="105"
              r="98"
              fill="none"
              stroke="#fff"
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray={616}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset .9s linear' }}
            />
          </svg>
          {!done && <span className="font-bold text-[64px] text-white tracking-[-.03em]">{state.emergencyCount}</span>}
          {done && (
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )}
        </div>
      </div>
      <div className="text-center mt-10 text-[16px] leading-[1.6] text-[rgba(255,255,255,.82)] px-[34px]" style={{ textWrap: 'pretty' } as React.CSSProperties}>
        {ctx.line1}
        <br />
        Your location and shift are attached.
      </div>
      {!done && (
        <div className="mt-auto px-7 pb-[34px] text-center">
          <span
            className="inline-flex items-center justify-center h-[52px] px-[34px] rounded-lg border border-[rgba(255,255,255,.45)] font-bold text-[16px] text-white cursor-pointer active:opacity-70"
            onClick={actions.releaseEmergency}
          >
            Release to cancel
          </span>
        </div>
      )}
    </>
  )
}
