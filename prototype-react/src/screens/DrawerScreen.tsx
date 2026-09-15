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
      className={`rounded-2xl px-[15px] py-[15px] flex items-center gap-3.5 border ${disabled ? 'opacity-50' : 'cursor-pointer active:opacity-70'}`}
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
  const { actions, ctx } = api

  return (
    <>
      <StatusBar time="4:12" color="#1c3d59" bg="#fafaf7" />
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(28,61,89,.35)] cursor-pointer" onClick={actions.closeDrawer} />
        <div className="absolute left-0 right-0 bottom-0 bg-[#fafaf7] rounded-t-[22px] px-5 pt-3.5 pb-6">
          <div className="w-[38px] h-1 rounded mx-auto mb-4 bg-[#d9d6ce]" />
          <div className="font-bold text-[19px] text-navy">Start an action</div>
          <div className="text-[13.5px] text-ink mt-1">{ctx.line1}</div>
          <div className="flex flex-col gap-2.5 mt-4">
            <DrawerRow
              bg="#b91c1c"
              border="#9a1414"
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
              border="#ebe9e3"
              iconBg="#ffeee0"
              icon={<ClipboardIcon size={19} stroke="#ff5c00" />}
              title="Incident report"
              titleColor="#1c3d59"
              subtitle="Note, photos and video"
              subtitleColor="#4a4842"
              onClick={actions.drawerIncidentReport}
            />
            <DrawerRow
              bg="#fff"
              border="#ebe9e3"
              iconBg="#efece5"
              icon={<DocumentIcon size={19} stroke="#8a857c" />}
              title="Other reports"
              titleColor="#1c3d59"
              subtitle="Vehicle, maintenance and site forms"
              subtitleColor="#4a4842"
              disabled
            />
            <DrawerRow
              bg="#fff"
              border="#ebe9e3"
              iconBg="#efece5"
              icon={
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#8a857c" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17V7a2 2 0 0 1 2-2h7l3 3h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <path d="m10 14 4-4-4-4" />
                </svg>
              }
              title="Shift pass-down"
              titleColor="#1c3d59"
              subtitle="Hand over between shifts"
              subtitleColor="#4a4842"
              disabled
            />
            <DrawerRow
              bg="#fff"
              border="#ebe9e3"
              iconBg="#efece5"
              icon={<ProcessingIcon size={19} stroke="#8a857c" />}
              title="Report history"
              titleColor="#1c3d59"
              subtitle="Reports you have filed"
              subtitleColor="#4a4842"
              disabled
            />
          </div>
        </div>
      </div>
    </>
  )
}
