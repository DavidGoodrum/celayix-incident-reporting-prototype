import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AppState, CHECKPOINTS, Screen, buildDayLabels, initialState } from './types'

const DAYS = buildDayLabels()
const DICTATED =
  'Tree came down across the north parking spaces, blocking three bays and the fire lane. Branches are on a parked car.'

function parseTime(str: string) {
  let day = 0
  for (let i = 0; i < DAYS.length; i++) {
    if (str.indexOf(DAYS[i]) === 0) {
      day = i
      break
    }
  }
  const m = /(\d{1,2}):(\d{2})\s*(AM|PM)/.exec(str)
  return {
    day,
    hour: m ? (parseInt(m[1], 10) === 12 ? 11 : parseInt(m[1], 10) - 1) : 3,
    min: m ? parseInt(m[2], 10) : 12,
    mer: m && m[3] === 'AM' ? 0 : 1,
  }
}

export function usePrototypeState() {
  const [state, setState] = useState<AppState>(initialState)
  const patch = useCallback((p: Partial<AppState>) => setState((s) => ({ ...s, ...p })), [])

  const emergencyTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const emergencyEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pressFrom = useRef<AppState['reportFrom'] | null>(null)
  const pressFired = useRef(false)
  const wheelTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const wheelRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    return () => {
      if (emergencyTimer.current) clearInterval(emergencyTimer.current)
      if (emergencyEndTimer.current) clearTimeout(emergencyEndTimer.current)
      if (pressTimer.current) clearTimeout(pressTimer.current)
    }
  }, [])

  const goTo = useCallback((screen: Screen) => patch({ screen }), [patch])

  const openReport = useCallback(
    (from: AppState['reportFrom']) =>
      patch({
        screen: 'note',
        prevScreen: from as Screen,
        reportFrom: from,
        composeMode: 'new',
        noteText: '',
        attachments: [],
        requiresAttention: false,
        checkpoint: null,
        time: null,
      }),
    [patch],
  )

  const openDrawer = useCallback(
    (from: AppState['reportFrom']) =>
      setState((s) => ({ ...s, screen: 'drawer', preDrawerScreen: s.screen, reportFrom: from })),
    [],
  )

  const startFlagPress = useCallback(
    (from: AppState['reportFrom']) => {
      pressFrom.current = from
      pressFired.current = false
      if (pressTimer.current) clearTimeout(pressTimer.current)
      pressTimer.current = setTimeout(() => {
        pressFired.current = true
        openReport(from)
      }, 480)
    },
    [openReport],
  )

  const endFlagPress = useCallback(() => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current)
      pressTimer.current = null
    }
    if (!pressFired.current && pressFrom.current) {
      openDrawer(pressFrom.current)
    }
    pressFrom.current = null
  }, [openDrawer])

  const closeDrawer = useCallback(
    () => setState((s) => ({ ...s, screen: s.preDrawerScreen || 'shift' })),
    [],
  )

  const holdEmergency = useCallback(() => {
    if (emergencyTimer.current) clearInterval(emergencyTimer.current)
    if (emergencyEndTimer.current) clearTimeout(emergencyEndTimer.current)
    setState((s) => {
      const underlyingScreen = s.screen === 'drawer' ? s.preDrawerScreen || 'shift' : s.screen
      return { ...s, emergencyActive: true, screen: underlyingScreen, prevScreen: underlyingScreen, emergencyCount: 3 }
    })
    emergencyTimer.current = setInterval(() => {
      setState((s) => {
        const n = s.emergencyCount - 1
        if (n <= 0) {
          if (emergencyTimer.current) clearInterval(emergencyTimer.current)
          emergencyTimer.current = null
          emergencyEndTimer.current = setTimeout(() => patch({ emergencyActive: false }), 1400)
          return { ...s, emergencyCount: 0 }
        }
        return { ...s, emergencyCount: n }
      })
    }, 900)
  }, [patch])

  const releaseEmergency = useCallback(() => {
    if (emergencyTimer.current) {
      clearInterval(emergencyTimer.current)
      emergencyTimer.current = null
    }
    patch({ emergencyActive: false })
  }, [patch])

  const drawerEmergency = useCallback(() => holdEmergency(), [holdEmergency])
  const drawerIncidentReport = useCallback(
    () => setState((s) => ({ ...s, screen: 'note', prevScreen: s.reportFrom as Screen, composeMode: 'new', noteText: '', attachments: [], requiresAttention: false, checkpoint: null, time: null })),
    [],
  )

  const openFollowUp = useCallback(
    () =>
      setState((s) => ({
        ...s,
        screen: 'note',
        prevScreen: s.screen,
        composeMode: 'followup',
        noteText: '',
        attachments: [],
        requiresAttention: false,
      })),
    [],
  )

  const onNoteInput = useCallback((value: string) => patch({ noteText: value }), [patch])
  const showKeyboard = useCallback(() => patch({ keyboardOpen: true }), [patch])
  const hideKeyboard = useCallback(() => patch({ keyboardOpen: false, dictating: false }), [patch])

  const dictate = useCallback(() => {
    setState((s) => {
      if (s.dictating) return { ...s, dictating: false }
      const existing = s.noteText.trim()
      const next = existing ? `${existing} ${DICTATED}` : DICTATED
      return { ...s, dictating: true, noteText: next }
    })
  }, [])

  const addAttachment = useCallback(() => {
    setState((s) => (s.attachments.length >= 20 ? s : { ...s, attachments: [...s.attachments, { type: 'photo' }] }))
  }, [])

  const removeAttachment = useCallback((index: number) => {
    setState((s) => {
      const a = s.attachments.slice()
      a.splice(index, 1)
      return { ...s, attachments: a }
    })
  }, [])

  const toggleAttention = useCallback(() => patch({ requiresAttention: !state.requiresAttention }), [patch, state.requiresAttention])
  const openAttachSheet = useCallback(() => patch({ attachSheetOpen: true }), [patch])
  const closeAttachSheet = useCallback(() => patch({ attachSheetOpen: false }), [patch])
  const pickAttachment = useCallback(() => {
    addAttachment()
    patch({ attachSheetOpen: false })
  }, [addAttachment, patch])

  const openDetails = useCallback(
    () =>
      setState((s) => ({
        ...s,
        screen: 'details',
        checkpointListOpen: false,
        pendingCheckpoint: s.checkpoint,
        pendingTime: s.time,
      })),
    [],
  )

  const toggleCheckpointList = useCallback(() => patch({ checkpointListOpen: !state.checkpointListOpen }), [patch, state.checkpointListOpen])
  const pickCheckpoint = useCallback((name: string) => patch({ pendingCheckpoint: name, checkpointListOpen: false }), [patch])

  const openTimePicker = useCallback(() => {
    setState((s) => {
      const parsed = parseTime(s.pendingTime || 'Today, 4:12 PM')
      return {
        ...s,
        timePickerOpen: true,
        checkpointListOpen: false,
        tpDay: parsed.day,
        tpHour: parsed.hour,
        tpMin: parsed.min,
        tpMer: parsed.mer,
      }
    })
  }, [])

  const closeTimePicker = useCallback(() => patch({ timePickerOpen: false }), [patch])

  const doneTimePicker = useCallback(() => {
    setState((s) => {
      const label = `${DAYS[s.tpDay]}, ${s.tpHour + 1}:${String(s.tpMin).padStart(2, '0')} ${s.tpMer === 0 ? 'AM' : 'PM'}`
      return { ...s, pendingTime: label, timePickerOpen: false }
    })
  }, [])

  const setWheelRef = useCallback((col: string, el: HTMLDivElement | null) => {
    wheelRefs.current[col] = el
    if (el) {
      const key = { day: 'tpDay', hour: 'tpHour', min: 'tpMin', mer: 'tpMer' }[col] as keyof AppState
      const idx = (state[key] as number) || 0
      const apply = () => {
        el.scrollTop = idx * 36
      }
      apply()
      requestAnimationFrame(apply)
      setTimeout(apply, 60)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const colKey: Record<string, keyof AppState> = { day: 'tpDay', hour: 'tpHour', min: 'tpMin', mer: 'tpMer' }

  const wheelScroll = useCallback((col: string, el: HTMLDivElement) => {
    clearTimeout(wheelTimers.current[col])
    wheelTimers.current[col] = setTimeout(() => {
      const idx = Math.round(el.scrollTop / 36)
      const key = colKey[col]
      setState((s) => (s[key] === idx ? s : { ...s, [key]: idx }))
    }, 110)
  }, [])

  const wheelTap = useCallback((col: string, idx: number) => {
    const el = wheelRefs.current[col]
    if (el) el.scrollTo({ top: idx * 36, behavior: 'smooth' })
    const key = colKey[col]
    patch({ [key]: idx } as Partial<AppState>)
  }, [patch])

  const saveDetails = useCallback(
    () => setState((s) => ({ ...s, checkpoint: s.pendingCheckpoint, time: s.pendingTime, screen: 'note' })),
    [],
  )
  const cancelDetails = useCallback(() => patch({ screen: 'note' }), [patch])

  const submitReport = useCallback(() => {
    setState((s) => {
      if (!s.noteText.trim()) return s
      if (s.composeMode === 'followup' && s.report) {
        const report = { ...s.report }
        report.followUps = [
          ...report.followUps,
          {
            text: s.noteText.trim(),
            attachments: s.attachments.slice(),
            requiresAttention: s.requiresAttention,
            time: `6:0${2 + report.followUps.length} PM`,
          },
        ]
        if (s.requiresAttention) report.requiresAttention = true
        return { ...s, report, screen: s.prevScreen }
      }
      const newReport = {
        text: s.noteText.trim(),
        requiresAttention: s.requiresAttention,
        checkpoint: s.checkpoint,
        time: s.time,
        attachments: s.attachments.slice(),
        followUps: [],
      }
      return { ...s, report: newReport, screen: 'reportProcessing', justSubmitted: true, bannerDismissed: false }
    })
  }, [])

  const goToReports = useCallback(() => setState((s) => ({ ...s, prevScreen: s.screen, screen: 'reports' })), [])
  const backFromReports = useCallback(() => {
    setState((s) => {
      let back = s.prevScreen
      if (!back || back === 'reports' || back === 'drawer') back = 'shift'
      return { ...s, screen: back }
    })
  }, [])
  const openQueuedDetail = useCallback(() => patch({ screen: 'reportProcessing', justSubmitted: false }), [patch])

  const doneSubmitted = useCallback(() => {
    setState((s) => {
      if (!s.justSubmitted) {
        let back = s.prevScreen
        if (!back || back === 'reports' || back === 'drawer') back = 'shift'
        return { ...s, screen: back }
      }
      const from = s.reportFrom
      return {
        ...s,
        justSubmitted: false,
        bannerDismissed: false,
        screen: from === 'note' || from === 'reports' ? 'shift' : ((from as Screen) || 'shift'),
      }
    })
  }, [])

  const drawerReportHistory = useCallback(() => {
    setState((s) => {
      let back = s.preDrawerScreen
      if (!back || back === 'reports' || back === 'drawer') back = 'shift'
      return { ...s, screen: 'reports', prevScreen: back }
    })
  }, [])

  const backFromDetail = useCallback(() => {
    if (state.justSubmitted) {
      doneSubmitted()
      return
    }
    patch({ screen: 'reports' })
  }, [doneSubmitted, patch, state.justSubmitted])

  const dismissBanner = useCallback(() => patch({ bannerDismissed: true }), [patch])
  const simulateSync = useCallback(() => patch({ screen: 'reportSynced' }), [patch])
  const checkOut = useCallback(() => patch({ checkedIn: false }), [patch])
  const checkIn = useCallback(() => patch({ checkedIn: true }), [patch])

  const resetAll = useCallback(() => {
    if (emergencyTimer.current) {
      clearInterval(emergencyTimer.current)
      emergencyTimer.current = null
    }
    if (emergencyEndTimer.current) {
      clearTimeout(emergencyEndTimer.current)
      emergencyEndTimer.current = null
    }
    setState(initialState)
  }, [])

  const ctx = useMemo(() => {
    const s = state
    const tour = s.reportFrom === 'tour' || s.reportFrom === 'checkpoint' ? 'Opening Check' : null
    const checkpoint = s.checkpoint || (s.reportFrom === 'checkpoint' ? 'Front Door' : null)
    let line1: string
    if (!tour && !checkpoint) {
      line1 = s.checkedIn ? 'Police Museum · Current Shift' : 'No active shift'
    } else {
      line1 = ['Police Museum', tour, checkpoint].filter(Boolean).join(' · ')
    }
    const line2 = s.time || 'Today, 4:12 PM'
    return { line1, line2, tour: tour || '—' }
  }, [state])

  const isReportProcessing = state.screen === 'reportProcessing'
  const isReportSynced = state.screen === 'reportSynced'

  return {
    state,
    days: DAYS,
    checkpoints: CHECKPOINTS,
    ctx,
    report: state.report,
    isReportProcessing,
    isReportSynced,
    actions: {
      goTo,
      startFlagPress,
      endFlagPress,
      openDrawer,
      closeDrawer,
      drawerEmergency,
      drawerIncidentReport,
      drawerReportHistory,
      openReport,
      openFollowUp,
      onNoteInput,
      showKeyboard,
      hideKeyboard,
      dictate,
      addAttachment,
      removeAttachment,
      toggleAttention,
      openAttachSheet,
      closeAttachSheet,
      pickAttachment,
      openDetails,
      toggleCheckpointList,
      pickCheckpoint,
      openTimePicker,
      closeTimePicker,
      doneTimePicker,
      setWheelRef,
      wheelScroll,
      wheelTap,
      saveDetails,
      cancelDetails,
      submitReport,
      goToReports,
      backFromReports,
      openQueuedDetail,
      backFromDetail,
      doneSubmitted,
      dismissBanner,
      simulateSync,
      checkOut,
      checkIn,
      releaseEmergency,
      resetAll,
    },
  }
}

export type PrototypeApi = ReturnType<typeof usePrototypeState>
