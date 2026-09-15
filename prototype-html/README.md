# Incident Reporting Prototype — Standalone HTML

A single self-contained `index.html` — Tailwind CSS via CDN, Google Fonts (Lato) via CDN, vanilla JavaScript for all state and navigation. No build step, no dependencies to install.

## Run

Just open `index.html` in a browser. Because the page uses `fetch`-free vanilla JS with no modules, it works straight off the filesystem (`file://`) as well as served over HTTP.

To serve it locally (only needed if you want console/devtools access from a browser-automation tool, since some tooling can't inspect `file://` pages):

```bash
python -m http.server 8765
# then open http://localhost:8765
```

## Structure

Everything lives in `index.html`:
- A `<style>` block with the handful of custom rules Tailwind's utility classes can't express (hidden scrollbars, the wheel-picker fade mask, font-family defaults).
- A single inline `<script>` containing the whole app: state object, action functions, per-screen HTML-string renderers, and a small event-delegation layer (`data-action` / `data-arg` attributes dispatched through one click listener on the phone-screen root, plus direct listeners for the note textarea and the picker wheels).

This mirrors the same screens and state machine as `../prototype-react`, just rendered by re-building an HTML string into `#screen` on every state change instead of a virtual DOM.

## Notes

- Same caveats as the React version: the fake keyboard/dictate overlay is focus-triggered and needs a real, OS-focused browser tab to fire; "Simulate sync completing" is a demo-only affordance.
