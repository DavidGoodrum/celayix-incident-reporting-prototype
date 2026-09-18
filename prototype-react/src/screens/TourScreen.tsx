import { StatusBar } from '../components/StatusBar'
import { HeaderRow } from '../components/HeaderRow'
import { ReportFlagButton } from '../components/ReportFlagButton'
import { ChevronRight, LockIcon } from '../components/Icons'
import type { PrototypeApi } from '../state'

export function TourScreen({ api }: { api: PrototypeApi }) {
  const { actions } = api

  return (
    <>
      <StatusBar time="4:12" color="#000000" bg="#fcfbf8" />
      <HeaderRow
        title="Opening Check"
        onBack={() => actions.goTo('shift')}
        trailing={<ReportFlagButton from="tour" onStart={actions.startFlagPress} onEnd={actions.endFlagPress} />}
      />
      <div className="bg-[#fcfbf8] flex-1 overflow-auto">
        <div className="px-[22px] pt-3.5 pb-1 flex items-center gap-2">
          <span className="font-bold text-[16px] text-navy">Checkpoints</span>
          <span className="text-ink">·</span>
          <span className="text-[14px] text-ink">3 total</span>
        </div>
        <div className="px-[22px] py-2 flex flex-col gap-3">
          <div
            className="bg-white border-[1.5px] border-brand rounded-lg shadow-[0_0_2px_rgba(0,0,0,.2)] px-[15px] py-4 flex items-center gap-3.5 cursor-pointer active:opacity-70"
            onClick={() => actions.goTo('checkpoint')}
          >
            <span className="w-[34px] h-[34px] rounded-full bg-[#fcf0e9] flex items-center justify-center flex-none">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-brand" />
            </span>
            <span className="flex-1">
              <span className="block font-bold text-[16px] text-navy">Front Door</span>
              <span className="block text-[14px] text-ink mt-0.5">Main Access · Scan ready</span>
            </span>
            <ChevronRight stroke="#e96c24" />
          </div>
          <div className="bg-[#f3f3f3] border border-[#e7e0d9] rounded-lg shadow-[0_0_2px_rgba(0,0,0,.2)] px-[15px] py-4 flex items-center gap-3.5">
            <span className="w-[34px] h-[34px] rounded-full bg-[#e7e0d9] flex items-center justify-center flex-none">
              <LockIcon />
            </span>
            <span className="flex-1">
              <span className="block font-bold text-[16px] text-navy">Reception</span>
              <span className="block text-[14px] text-ink mt-0.5">Available after Front Door</span>
            </span>
          </div>
          <div className="bg-[#f3f3f3] border border-[#e7e0d9] rounded-lg shadow-[0_0_2px_rgba(0,0,0,.2)] px-[15px] py-4 flex items-center gap-3.5">
            <span className="w-[34px] h-[34px] rounded-full bg-[#e7e0d9] flex items-center justify-center flex-none">
              <LockIcon />
            </span>
            <span className="flex-1">
              <span className="block font-bold text-[16px] text-navy">Courtyard</span>
              <span className="block text-[14px] text-ink mt-0.5">Available after Reception</span>
            </span>
          </div>
        </div>
      </div>
      <div
        className="border-t border-[#e7e0d9] bg-[#fcfbf8] px-[22px] pt-3.5 pb-[26px] flex-none cursor-pointer active:opacity-70"
        onClick={() => actions.goTo('shift')}
      >
        <span className="flex h-12 border border-[#a7a7a7] rounded-lg bg-white items-center justify-center font-bold text-[16px] text-navy shadow-[0_0_4px_rgba(0,0,0,.3)]">
          End tour
        </span>
      </div>
    </>
  )
}
