# Incident Reporting Prototype — Standalone HTML

One self-contained `index.html`: open it in a browser, straight from disk (`file://`) or served over HTTP. No build
step and nothing to install. Roboto loads from Google Fonts when online; without a connection the system font is used.

It opens at the start of the click-through; add `#board=<name>` to the address to open at a canvas board (for example
`index.html#board=details`), or use the "Open at" menu above the phone.

## Where it comes from

This file is generated from `../prototype-react` (`npm run build:html` there), so it is the same app: the TEAMXP
components, the click-through logic and the example photos, inlined into one file. Don't edit it by hand; change the
React source and rebuild.
