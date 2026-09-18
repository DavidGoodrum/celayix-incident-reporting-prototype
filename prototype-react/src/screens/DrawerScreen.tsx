import { StatusBar } from '../components/StatusBar'
import { ClipboardIcon, DocumentIcon, ProcessingIcon, WarningIcon } from '../components/Icons'
import type { PrototypeApi } from '../state'

function DrawerRow({
  bg,
  border,
  iconBg,
  icon,
  title,
  titleColor,
  subtitle,
  subtitleColor,
  onClick,
  disabled,
}: {
  bg: string
  border: string
  iconBg: string
  icon: React.ReactNode
  title: string
  titleColor: string
  subtitle: string
  subtitleColor: string
  onClick?: (e: React.MouseEvent) => void
  disabled?: boolean
}) {
  return (
    <div
      className={`rounded-lg shadow-[0_0_2px_rgba(0,0,0,.2)] px-[15px] py-[15px] flex items-center gap-3.5 border ${disabled ? 'opacity-50' : 'cursor-pointer active:opacity-70'}`}
      style={{ background: bg, borderColor: border }}
      onClick={disabled ? undefined : onClick}
    >
      <span className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center flex-none" style={{ background: iconBg }}>
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-bold text-[15.5px]" style={{ color: titleColor }}>
          {title}
        </span>
        <span className="block text-[13px] mt-px" style={{ color: subtitleColor }}>
          {subtitle}
        </span>
      </span>
    </div>
  )
}

export function DrawerScreen({ api }: { api: PrototypeApi }) {
  const { actions, ctx, report } = api
  const hasReport = !!report

  return (
    <>
      <StatusBar time="4:12" color="#000000" bg="#fcfbf8" />
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(28,61,89,.35)] cursor-pointer" onClick={actions.closeDrawer} />
        <div className="absolute left-0 right-0 bottom-0 bg-[#fcfbf8] rounded-t-[22px] shadow-[0_8px_24px_rgba(0,0,0,.2)] px-5 pt-3.5 pb-6">
          <div className="w-[38px] h-1 rounded mx-auto mb-4 bg-[#a7a7a7]" />
          <div className="font-bold text-[19px] text-navy">Start an action</div>
          <div className="text-[13.5px] text-ink mt-1">{ctx.line1}</div>
          <div className="flex flex-col gap-2.5 mt-4">
            <DrawerRow
              bg="#c62828"
              border="#c0392b"
              iconBg="rgba(255,255,255,.18)"
              icon={<WarningIcon size={19} stroke="#fff" />}
              title="Emergency"
              titleColor="#fff"
              subtitle="Hold three seconds to send an alert"
              subtitleColor="rgba(255,255,255,.85)"
              onClick={actions.drawerEmergency}
            />
            <DrawerRow
              bg="#fff"
              border="#e7e0d9"
              iconBg="#fcf0e9"
              icon={<ClipboardIcon size={19} stroke="#e96c24" />}
              title="Incident report"
              titleColor="#000000"
              subtitle="Note, photos and video"
              subtitleColor="#333333"
              onClick={actions.drawerIncidentReport}
            />
            <DrawerRow
              bg="#fff"
              border="#e7e0d9"
              iconBg="#f3f3f3"
              icon={<DocumentIcon size={19} stroke="#676767" />}
              title="Other reports"
              titleColor="#000000"
              subtitle="Vehicle, maintenance and site forms"
              subtitleColor="#333333"
              disabled
            />
            <DrawerRow
              bg="#fff"
              border="#e7e0d9"
              iconBg="#f3f3f3"
              icon={
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#676767" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17V7a2 2 0 0 1 2-2h7l3 3h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <path d="m10 14 4-4-4-4" />
                </svg>
              }
              title="Shift pass-down"
              titleColor="#000000"
              subtitle="Hand over between shifts"
              subtitleColor="#333333"
              disabled
            />
            <DrawerRow
              bg="#fff"
              border="#e7e0d9"
              iconBg="#f3f3f3"
              icon={<ProcessingIcon size={19} stroke={hasReport ? '#333333' : '#676767'} />}
              title="Report history"
              titleColor="#000000"
              subtitle="Reports you have filed"
              subtitleColor="#333333"
              onClick={hasReport ? actions.drawerReportHistory : undefined}
              disabled={!hasReport}
            />
          </div>
        </div>
      </div>
    </>
  )
}
