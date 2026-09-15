# Incident Reporting Prototype — React

Vite + TypeScript + Tailwind CSS build of the Team Xpress incident-reporting click-through prototype, ported from the Claude Design canvas (`Incident Reporting Prototype.dc.html`).

## Run

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to http://localhost:5173).

## Structure

- `src/state.ts` — the whole app state machine as a single hook (`usePrototypeState`), mirroring the original's screen/report/emergency/time-picker state.
- `src/screens/*` — one component per screen (Shift, Tour, Checkpoint, Note/compose, Details, Reports, ReportDetail, Drawer, Emergency).
- `src/components/*` — small shared pieces (status bar, header row, icon set, the long-press report/flag button).
- `src/App.tsx` — phone-frame chrome and screen switching.

## Notes

- The fake on-screen keyboard (shown on focusing the note textarea) and the dictation mic both work in a real browser tab; they won't fire under headless/automated `.focus()` calls where the document itself isn't OS-focused — that's a browser/test-harness limitation, not an app bug.
- "Simulate sync completing" on the report-detail screen is a prototype-only affordance (no real backend) to demonstrate the synced state.
