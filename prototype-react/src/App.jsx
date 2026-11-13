import React, { useEffect, useState } from 'react'
import Prototype from './Prototype.jsx'

// The canvas boards, in canvas order: each opens the same click-through at one screen.
export const SCENARIOS = [
  { row: 'Start', items: [['default', 'Incident reporting · click-through']] },
  {
    row: 'Reporting an incident',
    items: [
      ['drawer', 'Report actions'],
      ['composeEmpty', 'New incident, empty'],
      ['compose', 'Adding a report'],
      ['attach', 'Attach menu'],
      ['details', 'Incident details'],
      ['checkpointSheet', 'Checkpoint picker'],
      ['datePicker', 'Date picker'],
      ['timePicker', 'Time picker'],
    ],
  },
  {
    row: 'After saving',
    items: [
      ['saved', 'Report saved'],
      ['offline', 'Report waiting to upload'],
      ['synced', 'Synced report with follow-up'],
      ['followUp', 'Adding a follow-up'],
      ['reports', 'Report history (last 30 days)'],
      ['longNote', 'Long note: Show more'],
      ['photoPreview', 'Photo preview'],
      ['shiftReports', 'Shift reports (dashboard row)'],
      ['shiftReportsQueued', 'Shift reports with a waiting report'],
      ['followUpQueued', 'Follow-up waiting to upload'],
    ],
  },
  {
    row: 'Tours and shift',
    items: [
      ['tours', 'Tours list'],
      ['tourDetails', 'Tour details'],
      ['tour', 'Active tour'],
      ['checkpoint', 'Checkpoint details'],
      ['checkedOut', 'Checked out'],
    ],
  },
  {
    row: 'Reporting from the Schedule',
    items: [
      ['schedule', 'Schedule'],
      ['shiftDetail', 'Shift details (from Schedule)'],
      ['shiftDetailReport', 'Report started from shift details: site captured'],
      ['scheduleDetails', 'Report started from the Schedule list: no site'],
    ],
  },
]
const KNOWN = new Set(SCENARIOS.flatMap((g) => g.items.map((i) => i[0])))

function scenarioFromHash() {
  const m = /board=([\w-]+)/.exec(window.location.hash)
  return m && KNOWN.has(m[1]) ? m[1] : 'default'
}

function useFitScale() {
  const fit = () => Math.max(0.55, Math.min(1, (window.innerHeight - 150) / 874))
  const [scale, setScale] = useState(fit)
  useEffect(() => {
    const on = () => setScale(fit())
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return scale
}

export default function App() {
  const [scenario, setScenario] = useState(scenarioFromHash)
  const [run, setRun] = useState(0) // bumping it reopens the board from scratch
  const scale = useFitScale()

  useEffect(() => {
    const on = () => { setScenario(scenarioFromHash()); setRun((n) => n + 1) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  const open = (s) => {
    window.history.replaceState(null, '', s === 'default' ? window.location.pathname + window.location.search : '#board=' + s)
    setScenario(s)
    setRun((n) => n + 1)
  }

  const ui = { fontFamily: 'var(--font-body)', fontSize: 13, color: '#333' }
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 16px 28px', boxSizing: 'border-box', ...ui }}>
      <div style={{ fontWeight: 500, fontSize: 15, color: '#000', marginBottom: 4 }}>Team Xpress · Incident reporting — click-through prototype</div>
      <div style={{ color: '#676767', marginBottom: 14, textAlign: 'center', maxWidth: 520 }}>
        Tap the clipboard in any header for the action sheet; long-press it to start a new incident.
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        <label htmlFor="board">Open at</label>
        <select id="board" value={scenario} onChange={(e) => open(e.target.value)} style={{ ...ui, height: 30, borderRadius: 6, border: '1px solid #a7a7a7', padding: '0 6px', background: '#fff' }}>
          {SCENARIOS.map((g) => (
            <optgroup key={g.row} label={g.row}>
              {g.items.map(([k, label]) => (
                <option key={k} value={k}>{label}</option>
              ))}
            </optgroup>
          ))}
        </select>
        <button type="button" onClick={() => open(scenario)} style={{ ...ui, height: 30, borderRadius: 999, border: '1px solid #a7a7a7', background: '#fff', padding: '0 14px', cursor: 'pointer' }}>
          Restart
        </button>
      </div>
      <div style={{ width: 402 * scale, height: 874 * scale, flex: 'none' }}>
        <div style={{ width: 402, height: 874, transform: `scale(${scale})`, transformOrigin: 'top left', boxShadow: '0 12px 40px rgba(0,0,0,.18)', background: 'var(--cx-bg)' }}>
          <Prototype key={scenario + ':' + run} scenario={scenario} />
        </div>
      </div>
    </div>
  )
}
