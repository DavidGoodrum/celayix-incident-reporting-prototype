import { StatusBar } from '../components/StatusBar'
import { HeaderRow } from '../components/HeaderRow'
import { ReportFlagButton } from '../components/ReportFlagButton'
import type { PrototypeApi } from '../state'

export function CheckpointScreen({ api }: { api: PrototypeApi }) {
  const { actions } = api

  return (
    <>
      <StatusBar time="4:12" color="#000000" bg="#fcfbf8" />
      <HeaderRow
        title="Checkpoint details"
        onBack={() => actions.goTo('tour')}
        trailing={<ReportFlagButton from="checkpoint" onStart={actions.startFlagPress} onEnd={actions.endFlagPress} />}
      />
      <div className="bg-[#fcfbf8] flex-1">
        <div className="text-center px-[22px] pt-5">
          <div className="font-bold text-[13px] text-ink">Opening Check tour</div>
          <div className="font-bold text-[21px] text-navy mt-1">Front Door</div>
          <div className="text-[15px] text-ink mt-0.5">Main Access</div>
        </div>
        <div className="mx-5 mt-5 bg-white border border-[#e7e0d9] rounded-lg shadow-[0_0_2px_rgba(0,0,0,.2)]">
          <div className="p-4">
            <div className="font-bold text-[15px] text-navy">Description</div>
            <div className="text-[15px] text-ink mt-2.5">Public front entrance.</div>
          </div>
          <div className="h-px bg-[#f3f3f3]" />
          <div className="p-4">
            <div className="font-bold text-[15px] text-navy">Instructions</div>
            <div className="text-[15px] text-ink mt-2.5">Confirm the door is secure before moving on.</div>
          </div>
        </div>
      </div>
      <div className="border-t border-[#e7e0d9] bg-[#fcfbf8] px-[22px] pt-3.5 pb-[26px] flex gap-3.5 flex-none">
        <span
          className="flex-1 h-12 border border-[#a7a7a7] rounded-lg bg-white flex items-center justify-center font-bold text-[16px] text-navy cursor-pointer active:opacity-70 shadow-[0_0_4px_rgba(0,0,0,.3)]"
          onClick={() => actions.goTo('tour')}
        >
          Skip
        </span>
        <span
          className="flex-1 h-12 rounded-lg bg-brand flex items-center justify-center gap-2 font-bold text-[16px] text-white cursor-pointer active:opacity-70 shadow-[0_0_4px_rgba(0,0,0,.3)]"
          onClick={() => actions.goTo('tour')}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round">
            <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" opacity={0.35} />
            <path d="M9.5 12h5M12 9.5v5" />
          </svg>
          Scan
        </span>
      </div>
    </>
  )
}
