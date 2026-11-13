# Incident Reporting Prototype — React

Vite + React build of the Team Xpress incident-reporting click-through, ported from the Claude Design canvas
"Incident reporting prototype — TEAMXP" (the refresh on the TEAMXP Design System, Nov 12, 2026).

## Run

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to http://localhost:5173). The "Open at" menu above the phone opens the
click-through at any canvas board (also as a link: `#board=details`, `#board=synced`, …); Restart starts it over.

## Build the standalone HTML version

```bash
npm run build:html
```

This writes `../prototype-html/index.html`: the same app as one self-contained file (scripts, styles and example
photos inlined). Run it after every change here so the two versions stay identical.

## Structure

- `src/Prototype.jsx` — the click-through itself, ported from the canvas board `Main.dc.html`. The canvas template is
  JSX over `renderVals()`, and the logic class (state, scenarios, handlers) is carried across as written, so a change on
  the canvas can be copied over method by method. Each canvas board is a scenario passed in as a prop.
- `src/ds/teamxp.js` — the TEAMXP Design System components the prototype mounts (StatusBar, PageHeader, ListRow,
  ReportCard, InfoCard, SelectSheet, AttachmentGrid, AttachMenu, ShiftActions…), ported from the library unchanged
  except for icons.
- `src/ds/Icon.jsx`, `src/ds/icons.js` — icons. The library uses Font Awesome 7 Pro, which is licensed for Celayix
  internal use only, so this repository draws [Lucide](https://lucide.dev) icons (ISC licence) in its place, keyed by the
  same Font Awesome names. They look close but not identical; the canvas is the reference for icon shapes.
- `src/index.css` — the library's colour, shadow and type tokens.
- `src/assets/*` — example photos (drawn illustrations, not real photos) standing in for the canvas's photos.
- `src/App.jsx` — the page around the 402 × 874 screen: board picker and Restart.

## Notes

- Prototype-only parts are marked as in the canvas: the dashed "Prototype only" strips (Simulate sync, Reset
  prototype) and the drawn phone keyboard with dictation.
- Emergency is out of scope in the refresh (no Emergency card in the action sheet); its code is kept from the canvas but
  can't be reached.
