import { usePrototypeState } from './state'
import { ShiftScreen } from './screens/ShiftScreen'
import { TourScreen } from './screens/TourScreen'
import { CheckpointScreen } from './screens/CheckpointScreen'
import { NoteScreen } from './screens/NoteScreen'
import { DetailsScreen } from './screens/DetailsScreen'
import { ReportsScreen } from './screens/ReportsScreen'
import { ReportDetailScreen } from './screens/ReportDetailScreen'
import { DrawerScreen } from './screens/DrawerScreen'
import { EmergencyScreen } from './screens/EmergencyScreen'

function ActiveScreen({ api }: { api: ReturnType<typeof usePrototypeState> }) {
  switch (api.state.screen) {
    case 'shift':
      return <ShiftScreen api={api} />
    case 'tour':
      return <TourScreen api={api} />
    case 'checkpoint':
      return <CheckpointScreen api={api} />
    case 'note':
      return <NoteScreen api={api} />
    case 'details':
      return <DetailsScreen api={api} />
    case 'reports':
      return <ReportsScreen api={api} />
    case 'reportProcessing':
    case 'reportSynced':
      return <ReportDetailScreen api={api} />
    case 'drawer':
      return <DrawerScreen api={api} />
    default:
      return null
  }
}

export default function App() {
  const api = usePrototypeState()
  const { state, actions } = api

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-5">
      <div className="font-bold text-[15px] text-navy mb-1">Team Xpress · Incident reporting — click-through prototype</div>
      <div className="text-[13px] text-navy/60 mb-5 text-center max-w-[460px]" style={{ textWrap: 'pretty' } as React.CSSProperties}>
        Follows the final settled flow: report from the app bar, inline attachments via the platform's own picker, editable incident
        details, and follow-ups added to an already-filed report. The persistent alert bar is gone: a tap on the app-bar clipboard icon
        opens the report actions drawer, where Emergency sits as a hold-to-send card. A long press on the same icon jumps straight to the
        incident note.
      </div>

      <div className="w-[390px] p-[7px] bg-[#d2d2d2] rounded-[44px] shadow-[0_24px_48px_-12px_rgba(17,17,17,.2)] flex-none">
        <div
          className="w-[376px] h-[812px] rounded-[38px] overflow-hidden flex flex-col relative"
          style={{ background: state.emergencyActive ? '#7f1010' : '#fcfbf8' }}
        >
          {state.emergencyActive ? <EmergencyScreen api={api} /> : <ActiveScreen api={api} />}
        </div>
      </div>

      <button
        className="font-bold text-xs text-navy bg-white border border-[#a7a7a7] rounded-full px-4 py-[7px] mt-5 hover:border-brand hover:text-brand shadow-[0_0_4px_rgba(0,0,0,.3)]"
        onClick={actions.resetAll}
      >
        Reset prototype
      </button>
    </div>
  )
}
