export type Screen =
  | 'shift'
  | 'tour'
  | 'checkpoint'
  | 'note'
  | 'details'
  | 'reports'
  | 'reportProcessing'
  | 'reportSynced'
  | 'drawer'

export type ReportFrom = 'shift' | 'tour' | 'checkpoint' | 'reports' | 'note'

export type ComposeMode = 'new' | 'followup'

export interface Attachment {
  type: 'photo'
}

export interface FollowUp {
  text: string
  attachments: Attachment[]
  requiresAttention: boolean
  time: string
}

export interface Report {
  text: string
  requiresAttention: boolean
  checkpoint: string | null
  time: string | null
  attachments: Attachment[]
  followUps: FollowUp[]
}

export interface AppState {
  screen: Screen
  checkedIn: boolean
  prevScreen: Screen
  reportFrom: ReportFrom
  composeMode: ComposeMode
  noteText: string
  attachments: Attachment[]
  requiresAttention: boolean
  checkpoint: string | null
  time: string | null
  pendingCheckpoint: string | null
  pendingTime: string | null
  attachSheetOpen: boolean
  keyboardOpen: boolean
  dictating: boolean
  checkpointListOpen: boolean
  report: Report | null
  emergencyActive: boolean
  emergencyCount: number
  preDrawerScreen: Screen
  timePickerOpen: boolean
  tpDay: number
  tpHour: number
  tpMin: number
  tpMer: number
  justSubmitted: boolean
  bannerDismissed: boolean
}

export const CHECKPOINTS = ['Front Door', 'Reception', 'Courtyard', 'North Parking Lot'] as const

export function buildDayLabels(): string[] {
  const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = ['Today', 'Yesterday']
  const base = new Date(2026, 8, 15)
  for (let d = 2; d < 14; d++) {
    const dt = new Date(base.getTime() - d * 86400000)
    days.push(`${names[dt.getDay()]} ${months[dt.getMonth()]} ${dt.getDate()}`)
  }
  return days
}

export const initialState: AppState = {
  screen: 'shift',
  checkedIn: true,
  prevScreen: 'shift',
  reportFrom: 'shift',
  composeMode: 'new',
  noteText: '',
  attachments: [],
  requiresAttention: false,
  checkpoint: null,
  time: null,
  pendingCheckpoint: null,
  pendingTime: null,
  attachSheetOpen: false,
  keyboardOpen: false,
  dictating: false,
  checkpointListOpen: false,
  report: null,
  emergencyActive: false,
  emergencyCount: 3,
  preDrawerScreen: 'shift',
  timePickerOpen: false,
  tpDay: 0,
  tpHour: 3,
  tpMin: 12,
  tpMer: 1,
  justSubmitted: false,
  bannerDismissed: false,
}
