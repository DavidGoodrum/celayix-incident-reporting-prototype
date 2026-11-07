export type Screen =
  | 'shift'
  | 'tour'
  | 'checkpoint'
  | 'note'
  | 'details'
  | 'reports'
  | 'reportProcessing'
  | 'reportSynced'
  | 'pastDetail'
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
  pastId: string | null
  photoIndex: number | null
}

/** Checkpoints grouped by the areas set up when the tour was built, so same-named
 *  checkpoints (Front Door, Fire Exit) stay distinguishable. A selection is stored
 *  as 'Area|Name'; 'none' means no checkpoint. */
export const CP_AREAS: { area: string; items: string[] }[] = [
  { area: 'Main Entrance', items: ['Front Door', 'Lobby', 'Reception Desk'] },
  { area: 'East Wing', items: ['Gallery 1', 'Gallery 2', 'Fire Exit'] },
  { area: 'West Wing', items: ['Gallery 3', 'Fire Exit', 'Staff Room'] },
  { area: 'Annex', items: ['Front Door', 'Archive Room'] },
  { area: 'Loading Dock', items: ['Dock Door', 'Freight Elevator'] },
  { area: 'North Parking Lot', items: ['Entrance Gate', 'Fire Lane'] },
]
export const DEFAULT_CP = 'Main Entrance|Front Door'

export interface Photo {
  src: string
  alt: string
}

/** Example photos used for attachments the guard adds (cycled by index). */
export const SAMPLE_PHOTOS: Photo[] = [
  { src: 'assets/fallen-tree-parking.svg', alt: 'Fallen tree across the north parking bays' },
  { src: 'assets/fallen-tree-car.svg', alt: 'Branches resting on a parked car' },
]
export const samplePhoto = (i: number) => SAMPLE_PHOTOS[i % SAMPLE_PHOTOS.length]

export interface PastReport {
  id: string
  title: string
  category: string
  priority: string
  time: string
  syncedAt: string
  preview: string
  text: string
  enhanced: string
  meta: string
  byline: string
  photos: Photo[]
}

/** Earlier reports shown in report history (read-only examples). */
export const PAST_REPORTS: PastReport[] = [
  {
    id: 'p1',
    title: 'Loading bay door propped open',
    category: 'Access control',
    priority: 'Normal',
    time: '5:48 PM',
    syncedAt: '5:49 PM',
    preview: 'Loading bay door was propped open with a crate, no staff nearby…',
    text: 'Loading bay door was propped open with a crate, no staff nearby. Moved the crate inside and closed the door. It latches fine.',
    enhanced:
      'The loading bay door at Police Museum was found propped open with a wooden crate and left unattended. The guard removed the crate and secured the door; the latch is working.',
    meta: 'Police Museum · shift',
    byline: 'A. Quijada · Police Museum · Current Shift',
    photos: [{ src: 'assets/loading-bay-door.svg', alt: 'Loading bay door propped open with a crate' }],
  },
  {
    id: 'p2',
    title: 'Light out above west stairwell',
    category: 'Facility',
    priority: 'Low',
    time: '4:55 PM',
    syncedAt: '4:56 PM',
    preview: 'Light out above the west stairwell, second fixture from the door…',
    text: 'Light out above the west stairwell, second fixture from the door. Stairwell is dim but still passable.',
    enhanced:
      'A light fixture above the west stairwell (second from the door) is out. The stairwell remains passable but is poorly lit; maintenance should replace the fixture.',
    meta: 'Courtyard · Perimeter Sweep',
    byline: 'A. Quijada · Police Museum · Perimeter Sweep · Courtyard',
    photos: [],
  },
]

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
  pastId: null,
  photoIndex: null,
}
