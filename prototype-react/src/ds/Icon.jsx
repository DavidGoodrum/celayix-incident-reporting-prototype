/* TEAMXP Icon, drawn with Lucide stand-ins (./icons.js) instead of Font Awesome 7 Pro.
 * Same props as the library's Icon. Unknown names draw an empty box and are logged once in development. */
import React from 'react'
import { ICONS } from './icons.js'

const ALIASES = { 'plus-circle': 'circle-plus', 'check-circle': 'circle-check', 'question-circle': 'circle-question', 'info-circle': 'circle-info', 'exclamation-circle': 'circle-exclamation', 'exclamation-triangle': 'triangle-exclamation', times: 'xmark', 'times-circle': 'circle-xmark', close: 'xmark', 'user-times': 'user-xmark', 'pencil-alt': 'pen', 'sign-in': 'arrow-right-to-bracket', 'sign-out': 'arrow-right-from-bracket' }
const warned = new Set()

export function Icon({ name, variant = 'auto', size = 20, color, style, className = '', title }) {
  const n = ALIASES[name] || name
  const inner = ICONS[n]
  if (!inner && import.meta.env.DEV && !warned.has(n)) { warned.add(n); console.warn('[TEAMXP] no icon for "' + n + '"') }
  // Light reads thinner, Solid a touch heavier, Regular in between.
  const sw = variant === 'light' ? 1.5 : variant === 'solid' ? 2.4 : 2
  return React.createElement('svg', {
    viewBox: '0 0 24 24', width: size, height: size, fill: 'none', stroke: 'currentColor', strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round',
    className, role: title ? 'img' : undefined, 'aria-hidden': title ? undefined : true, 'aria-label': title,
    style: { display: 'inline-block', flex: 'none', color: color || 'inherit', ...style },
    dangerouslySetInnerHTML: { __html: inner || '<rect x="4" y="4" width="16" height="16" rx="2" />' },
  })
}
