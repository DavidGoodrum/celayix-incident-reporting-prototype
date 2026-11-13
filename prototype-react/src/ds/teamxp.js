/*
 * TEAMXP mobile design system components used by the incident-reporting prototype.
 * Ported from the TEAMXP Design System library (Celayix) as of Nov 12, 2026, unchanged except:
 *  - Icon draws Lucide icons (ISC licence, see ./icons.js) instead of Font Awesome 7 Pro, which is
 *    licensed for Celayix internal use only and is not shipped in this repository.
 *  - The spinning glyph uses the .cx-spin class (src/index.css) instead of Font Awesome's fa-spin.
 * Only the components this prototype mounts are included. Kept close to the library source so updates can be carried across.
 */
/* eslint-disable */
import React from 'react'
import { Icon } from './Icon.jsx'

const __ds_scope = {}
function __dsError(path, e) { console.error('[TEAMXP] ' + path + ': ' + ((e && e.message) || e)) }

// components/core/Badge.jsx
try { (() => {
function Badge({
  count,
  variant = 'primary',
  size,
  style
}) {
  const soft = variant === 'soft';
  const inverse = variant === 'inverse';
  const s = size || (soft ? 25 : 17);
  return React.createElement('span', {
    style: {
      minWidth: s,
      height: s,
      padding: '0 ' + (soft ? 8 : 5) + 'px',
      borderRadius: 999,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      background: soft ? 'var(--cx-warning-soft)' : inverse ? '#fff' : 'var(--cx-primary)',
      color: soft || inverse ? 'var(--cx-primary)' : '#fff',
      fontFamily: 'var(--font-body)',
      fontWeight: soft ? 700 : 400,
      fontSize: soft ? 14 : 12,
      lineHeight: 1,
      letterSpacing: soft ? '0.5px' : '-0.43px',
      flex: 'none',
      ...style
    }
  }, count);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __dsError("components/core/Badge.jsx", e); }

// components/core/Icon.jsx — replaced: draws Lucide (ISC) stand-ins from ./icons.js instead of Font Awesome 7 Pro
Object.assign(__ds_scope, { Icon });

// components/buttons/Button.jsx
try { (() => {
const { Icon } = __ds_scope;
// Mobile button. Source: Button/Contained|Outlined|Text (auto-width 50px, fixed-width rounded 8), pressed/disabled states.
// Outlined, checked against Sketch Nov 10: 50px = Bold 15 #676767 label (letter-spacing 0.5), #a7a7a7 1px border, 8px corners, white;
// pressed adds the 0 0 5 -1 shadow and turns label and icon orange. 40px (md) = Regular 14 label, 3px corners; pressed label Medium.
function Button({ children, label, icon, iconVariant = 'auto', variant = 'contained', size = 'lg', shape = 'rounded', pressed = false, disabled = false, fullWidth = false, onClick, style, type = 'button' }) {
  const h = size === 'lg' ? 50 : size === 'sm' ? 32 : 40;
  const text = children ?? label;
  const isText = variant === 'text' || variant === 'textAccent';
  const isSm = size === 'sm';
  let bg = 'var(--cx-primary)', border = '1px solid var(--cx-primary)', color = '#fff', shadow = 'var(--shadow-button)', weight = 400;
  const outlinedLg = variant === 'outlined' && size === 'lg';
  if (variant === 'outlined') { bg = '#fff'; border = '1px solid var(--cx-mono-60)'; color = 'var(--cx-mono-80)'; shadow = 'none'; weight = outlinedLg ? 700 : 400; if (pressed) { shadow = 'var(--shadow-pressed)'; color = 'var(--cx-primary)'; weight = outlinedLg ? 700 : 500; } }
  else if (variant === 'contained') { if (pressed) weight = 700; }
  else if (variant === 'text') { bg = 'transparent'; border = '1px solid transparent'; color = pressed ? 'var(--cx-primary)' : 'var(--cx-mono-80)'; shadow = 'none'; weight = pressed ? 500 : 400; }
  else if (variant === 'textAccent') { bg = 'transparent'; border = '1px solid transparent'; color = 'var(--cx-primary)'; shadow = 'none'; weight = 700; }
  if (disabled) { bg = isText ? 'transparent' : variant === 'outlined' ? '#fff' : 'var(--cx-mono-20)'; border = isText ? '1px solid transparent' : '1px solid var(--cx-mono-40)'; color = 'var(--cx-mono-60)'; shadow = 'none'; weight = 400; }
  const iconColor = disabled ? 'var(--cx-mono-40)' : color;
  const padX = isText ? 16 : isSm ? 12 : shape === 'pill' && !icon ? 10 : 12;
  const s = { height: h, minWidth: isText ? 0 : icon ? 44 : 80, width: fullWidth ? '100%' : undefined, padding: '0 ' + padX + 'px', boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: icon ? (isSm ? 6 : 12) : 0, background: bg, border, color, boxShadow: shadow, borderRadius: shape === 'pill' ? 999 : variant === 'outlined' && size === 'md' ? 3 : 8, fontFamily: 'var(--font-body)', fontWeight: isSm ? 500 : weight, fontSize: outlinedLg && !disabled ? 15 : 14, lineHeight: '16px', letterSpacing: isSm ? 0 : pressed && !outlinedLg ? '0.4px' : '0.5px', textDecoration: 'none', cursor: disabled ? 'default' : 'pointer', WebkitTapHighlightColor: 'transparent', userSelect: 'none', flex: fullWidth ? 1 : 'none', ...style };
  return React.createElement('button', { type, disabled, onClick, style: s },
    icon ? React.createElement(Icon, { name: icon, variant: iconVariant, size: isSm ? 12 : 20, color: iconColor }) : null,
    text != null ? React.createElement('span', null, text) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __dsError("components/buttons/Button.jsx", e); }

// components/buttons/IconButton.jsx
try { (() => {
const { Icon, Badge } = __ds_scope;
// 40x40 icon-only tap target (44 in headers with several actions). spinning: the glyph turns (refresh while loading). plain = header/nav icon; raised = white disc with glow (chat "…"); contained = orange disc (chat "+", send).
function IconButton({ icon, iconVariant = 'auto', variant = 'plain', size = 40, iconSize = 20, color, badge, pressed = false, disabled = false, spinning = false, onClick, style, label }) {
  let bg = 'transparent', shadow = 'none', border = 'none', c = color || (pressed ? 'var(--cx-primary)' : 'var(--cx-mono-80)');
  if (variant === 'raised') { bg = '#fff'; shadow = 'var(--shadow-pressed)'; }
  if (variant === 'contained') { bg = 'var(--cx-primary)'; shadow = 'var(--shadow-button)'; border = '1px solid var(--cx-primary)'; c = color || '#fff'; }
  if (variant === 'muted') { bg = 'var(--cx-mono-25)'; c = color || 'var(--cx-mono-90)'; }
  if (disabled) c = 'var(--cx-mono-40)';
  return React.createElement('button', { type: 'button', 'aria-label': label, disabled, onClick, style: { position: 'relative', width: size, height: size, borderRadius: '50%', background: bg, border, boxShadow: shadow, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: disabled ? 'default' : 'pointer', flex: 'none', WebkitTapHighlightColor: 'transparent', ...style } },
    React.createElement(Icon, { name: icon, variant: iconVariant, size: iconSize, color: c, className: spinning ? 'cx-spin' : '' }),
    badge != null ? React.createElement(Badge, { count: badge, style: { position: 'absolute', top: 0, right: -2 } }) : null);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __dsError("components/buttons/IconButton.jsx", e); }

// components/buttons/SlideButton.jsx
try { (() => {
const { Icon } = __ds_scope;
// Slide-to-act control: 50px pill. Source: Button/Contained/Icon-Text Button slider fixed-width, and the slider states Lana
// supplied Oct 28 (review section 19): rest, dragging, done for Acknowledge, Check in, Start break, End break, Safety check, Check out.
// Dragging, the action's colour fills the pill behind the knob and covers the label. Released before 85% of the way, it springs back.
// Enter or Space completes it from the keyboard. Done, the whole pill takes the colour with a white label.
// confirmFor (ms): the done pill shows that long, then the slider resets and onConfirmed runs.
// End break (#af5122) and the safety blue (#046999) come from those states; they read tokens --cx-break-end and --cx-safety
// (tokens.json, line 113), with the hex as fallback until tokens.css is next regenerated. Done label "Checked in" (line 114);
// Check out uses the sign-out arrow, so it doesn't share Check in's icon (line 115). Icons are Font Awesome 7 Pro, as in the app.
// disabled: Sketch's slider unavailable-disabled (unscheduled shift before Site and Service are picked, line 122): white pill,
// #d2d2d2 border, no shadow, #f3f3f3 knob with a #d2d2d2 glyph, #a7a7a7 label. It can't be dragged or completed.
const ACTIONS = {
  acknowledge: { color: 'var(--cx-primary)', icon: 'thumbs-up', label: 'Slide to Acknowledge', done: 'Acknowledged' },
  checkin: { color: 'var(--cx-success)', icon: 'arrow-right-to-bracket', label: 'Slide to Check in', done: 'Checked in' },
  break: { color: 'var(--cx-break)', icon: 'utensils', label: 'Slide to Start break', done: 'Break started' },
  endbreak: { color: 'var(--cx-break-end, #af5122)', icon: 'fork-knife', label: 'Slide to End break', done: 'Break ended' },
  safety: { color: 'var(--cx-safety, #046999)', icon: 'shield-check', label: 'Slide to perform Safety check', done: 'Safety check performed' },
  checkout: { color: 'var(--cx-error-alt)', icon: 'arrow-right-from-bracket', label: 'Slide to Check out', done: 'Checked out' }
};
function SlideButton({ action = 'checkin', label, completedLabel, completed = false, disabled = false, confirmFor, onConfirmed, width = 282, onComplete, style }) {
  const [done, setDone] = React.useState(completed);
  const [x, setX] = React.useState(0);
  const [drag, setDrag] = React.useState(null);
  React.useEffect(() => { setDone(completed); }, [completed]);
  React.useEffect(() => {
    if (!done || !(confirmFor > 0)) return undefined;
    const t = setTimeout(() => { setDone(false); if (onConfirmed) onConfirmed(); }, confirmFor);
    return () => clearTimeout(t);
  }, [done, confirmFor]);
  const a = ACTIONS[action] || ACTIONS.checkin;
  const max = width - 50;
  const text = label || a.label;
  const finish = () => { setDone(true); setX(0); if (onComplete) onComplete(); };
  if (disabled) return React.createElement('div', { role: 'button', 'aria-disabled': true, 'aria-label': text, style: { position: 'relative', width, height: 50, borderRadius: 999, background: '#fff', border: '1px solid var(--cx-mono-40)', boxSizing: 'border-box', display: 'flex', alignItems: 'center', paddingLeft: 65, paddingRight: 12, fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 400, letterSpacing: '0.5px', color: 'var(--text-disabled-action, var(--cx-mono-60))', whiteSpace: 'nowrap', overflow: 'hidden', userSelect: 'none', cursor: 'not-allowed', ...style } },
    React.createElement('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis' } }, text),
    React.createElement('div', { style: { position: 'absolute', left: 1, top: 1, width: 46, height: 46, borderRadius: 999, background: 'var(--cx-mono-20)', border: '1px solid var(--cx-mono-25)', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, React.createElement(Icon, { name: a.icon, size: 18, color: 'var(--icon-disabled, var(--cx-mono-40))' })));
  if (done) return React.createElement('div', { role: 'status', style: { width, height: 50, borderRadius: 999, background: a.color, border: '1px solid ' + a.color, boxShadow: 'var(--shadow-button)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14, letterSpacing: '0.4px', boxSizing: 'border-box', whiteSpace: 'nowrap', ...style } }, completedLabel || a.done);
  // k = on-screen size / layout size, so the knob follows the finger on a zoomed canvas or a scaled prototype.
  const down = e => { e.preventDefault(); if (e.currentTarget.setPointerCapture) e.currentTarget.setPointerCapture(e.pointerId); const k = (e.currentTarget.parentNode.getBoundingClientRect().width / width) || 1; setDrag({ start: e.clientX - x * k, k }); };
  const move = e => { if (!drag) return; setX(Math.max(0, Math.min(max, (e.clientX - drag.start) / drag.k))); };
  const up = () => { if (!drag) return; setDrag(null); if (x >= max * 0.85) finish(); else setX(0); };
  return React.createElement('div', { role: 'button', tabIndex: 0, 'aria-label': text, onKeyDown: e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); finish(); } }, style: { position: 'relative', width, height: 50, borderRadius: 999, background: '#fff', border: '1px solid var(--cx-mono-40)', boxShadow: 'var(--shadow-slider)', boxSizing: 'border-box', display: 'flex', alignItems: 'center', paddingLeft: 65, paddingRight: 12, fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 400, letterSpacing: '0.5px', color: 'var(--cx-mono-80)', whiteSpace: 'nowrap', overflow: 'hidden', isolation: 'isolate', userSelect: 'none', touchAction: 'none', ...style } },
    React.createElement('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis' } }, text),
    React.createElement('div', { onPointerDown: down, onPointerMove: move, onPointerUp: up, onPointerCancel: up, style: { position: 'absolute', left: 1, top: 1, width: 46 + x, height: 46, borderRadius: 999, background: a.color, boxShadow: 'var(--shadow-button)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', boxSizing: 'border-box', cursor: drag ? 'grabbing' : 'grab', transition: drag ? 'none' : 'width 200ms ease-out', zIndex: 1 } },
      React.createElement('div', { style: { width: 46, height: 46, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, React.createElement(Icon, { name: a.icon, size: 18, color: '#fff' }))));
}
Object.assign(__ds_scope, { SlideButton });
})(); } catch (e) { __dsError("components/buttons/SlideButton.jsx", e); }

// components/feedback/InlineNotice.jsx
try { (() => {
const { Icon } = __ds_scope;
// Inline warning/error message block (e.g. "You are still assigned this shift…", location accuracy error). Error fill = the palette's Alert error bg #fbeceb (2026-10-23).
// Nov 10 (incident reporting request line 5): tone success (green check, --cx-success-dark ink on --cx-success-light) and
// progress (a grey spinner that turns, on --cx-mono-20); variant="line" drops fill, border, corners and padding, for the one-line
// status above a footer ("Waiting for a connection · saved on this device" → "Sending" → "Synced 4:19 PM · visible to your supervisor").
const N = { warning: ['var(--cx-warning-light)', 'var(--cx-warning-strong)', 'triangle-exclamation'], error: ['var(--cx-error-alert-bg, #fbeceb)', 'var(--cx-error-alt)', 'triangle-exclamation'], info: ['var(--cx-info-light)', 'var(--cx-info-dark)', 'circle-info'], errorSoft: ['var(--cx-error-alert-bg, #fbeceb)', 'var(--cx-error-alt)', 'triangle-exclamation'], success: ['var(--cx-success-light)', 'var(--cx-success-dark)', 'check'], progress: ['var(--cx-mono-20)', 'var(--cx-mono-80)', 'spinner'] };
function InlineNotice({ tone = 'warning', children, icon, compact = false, variant, style }) {
  const [bg, fg, defIcon] = N[tone] || N.warning;
  const line = variant === 'line';
  const name = icon || (tone === 'info' ? 'triangle-exclamation' : defIcon);
  return React.createElement('div', { role: tone === 'progress' ? 'status' : 'note', style: { display: 'flex', alignItems: 'flex-start', gap: 12, padding: line ? 0 : compact ? '10px 12px' : '16px 16px', background: line ? 'transparent' : bg, borderRadius: line ? 0 : compact ? 4 : 8, fontFamily: 'var(--font-body)', fontWeight: compact || line ? 400 : 300, fontSize: compact || line ? 12 : 14, lineHeight: compact || line ? '16px' : '20px', color: '#000', ...style } },
    React.createElement(Icon, { name, size: compact || line ? 14 : 20, color: fg, className: tone === 'progress' ? 'cx-spin' : '', style: { marginTop: compact || line ? 1 : 0 } }),
    React.createElement('div', { style: { flex: 1 } }, children));
}
Object.assign(__ds_scope, { InlineNotice });
})(); } catch (e) { __dsError("components/feedback/InlineNotice.jsx", e); }

// components/feedback/ProgressBar.jsx
try { (() => {
// Source: Feedback messages/Progress/progress bar small. Track #e6e6e6, full radius. Fill orange in tour cards (red in library master).
function ProgressBar({
  value = 0,
  height = 7,
  color = 'var(--cx-primary)',
  track = 'var(--cx-mono-30)',
  style
}) {
  const v = Math.max(0, Math.min(100, value));
  return React.createElement('div', {
    role: 'progressbar',
    'aria-valuenow': v,
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    style: {
      height,
      background: track,
      borderRadius: 999,
      overflow: 'hidden',
      width: '100%',
      ...style
    }
  }, React.createElement('div', {
    style: {
      width: v + '%',
      height: '100%',
      background: color,
      borderRadius: 999
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __dsError("components/feedback/ProgressBar.jsx", e); }

// components/feedback/StatusPill.jsx
try { (() => {
const { Icon } = __ds_scope;
// Source: Mobile components/Feedback/Status pills. 27px pill, 1px inset border, 12px icon + 12px Medium label, padding 1/10.
// Presets checked symbol by symbol against the TeamXP Sketch file on 2026-10-23 (label, icon, ink, fill, border).
const TONES = { neutral: { bg: 'var(--cx-mono-20)', border: 'var(--cx-mono-30)', fg: 'var(--cx-mono-80)' }, success: { bg: 'var(--cx-success-light)', border: 'var(--cx-success-soft)', fg: 'var(--cx-success)' }, approved: { bg: 'var(--cx-success-pill-bg, #eef7f5)', border: 'var(--cx-success-soft)', fg: 'var(--cx-success-dark)' }, worked: { bg: 'var(--cx-mono-20)', border: 'var(--cx-mono-30)', fg: 'var(--cx-success-dark)' }, warning: { bg: 'var(--cx-warning-pill-bg)', border: 'var(--cx-warning-soft)', fg: 'var(--cx-warning-mid)' }, error: { bg: 'var(--cx-error-pill-bg)', border: 'var(--cx-error-soft)', fg: 'var(--cx-error-strong)' }, alert: { bg: 'var(--cx-error-pill-bg)', border: 'var(--cx-error-soft)', fg: 'var(--cx-error)' }, info: { bg: 'var(--cx-info-light)', border: 'var(--cx-info-soft)', fg: 'var(--cx-info-dark)' } };
const STATUS_PRESETS = { worked: ['Worked', 'worked', 'user-check'], scheduled: ['Scheduled', 'neutral', 'user'], dropRequested: ['Drop requested', 'error', 'user-xmark'], shiftAdded: ['Shift added', 'neutral', 'plus'], shiftUpdated: ['Shift updated', 'warning', 'pen'], shiftRemoved: ['Shift removed', 'error', 'xmark'], unconfirmed: ['Unconfirmed', 'neutral', null], available: ['Available', 'success', 'check'], availableRepeat: ['Available', 'neutral', 'check'], inProgress: ['In progress', 'warning', 'spinner'], upcoming: ['Upcoming', 'warning', 'clock'], later: ['Later', 'neutral', 'clock'], missed: ['Missed', 'alert', 'circle-exclamation'], correct: ['Correct', 'approved', 'check'], incorrect: ['Incorrect', 'alert', 'xmark'], submittedTS: ['Submitted', 'neutral', 'hourglass-half'], notSubmittedTS: ['Not submitted', 'neutral', 'triangle-exclamation'], approvedTS: ['Approved', 'approved', 'thumbs-up'], declinedTS: ['Declined', 'alert', 'thumbs-down'], requestedTO: ['Requested', 'neutral', 'hourglass-half'], approvedTO: ['Approved', 'approved', 'thumbs-up'], declinedTO: ['Declined', 'alert', 'thumbs-down'], cancelledTO: ['Cancelled', 'error', 'ban'], bidSubmitted: ['Bid submitted', 'neutral', 'hourglass-half'], bidNotAssigned: ['Not yet assigned', 'neutral', 'hourglass-half'], bidWon: ['Bid won', 'approved', 'thumbs-up'], bidLost: ['Bid lost', 'alert', 'thumbs-down'], bidCancelled: ['Bid cancelled', 'error', 'ban'], queued: ['Queued', 'warning', null], processing: ['Processing', 'neutral', null] };
// queued / processing (Nov 10, incident reporting request line 2): a report saved on the device and waiting for a signal, then sent
// and waiting for the AI title and category. No icon.
// Pill glyphs are Font Awesome Light in Sketch, except tour Available / Available repeat / In progress (Regular).
const REGULAR_PILLS = { available: 1, availableRepeat: 1, inProgress: 1 };
function StatusPill({ status, label, tone, icon, iconVariant, style }) {
  const p = status ? STATUS_PRESETS[status] : null;
  const text = label ?? (p ? p[0] : ''); const t = TONES[tone ?? (p ? p[1] : 'neutral')] || TONES.neutral; const ic = icon === undefined ? (p ? p[2] : null) : icon;
  return React.createElement('span', { style: { height: 27, padding: '1px 10px', boxSizing: 'border-box', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 6, background: t.bg, boxShadow: 'inset 0 0 0 1px ' + t.border, color: t.fg, fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12, lineHeight: '14px', whiteSpace: 'nowrap', flex: 'none', ...style } },
    ic ? React.createElement(Icon, { name: ic, variant: iconVariant || (REGULAR_PILLS[status] ? 'regular' : 'light'), size: 12, color: t.fg }) : null, text);
}
Object.assign(__ds_scope, { STATUS_PRESETS, StatusPill });
})(); } catch (e) { __dsError("components/feedback/StatusPill.jsx", e); }

// components/feedback/Toast.jsx
try { (() => {
// Full-width result banner (Success / Error / Warning). Source: Mobile components/Feedback/toasts. 112px tall, 36px glyph, 14px Medium white text.
const T = {
  success: ['var(--cx-success-dark)', 'circle-check'],
  error: ['var(--cx-error-strong)', 'circle-xmark'],
  warning: ['var(--cx-warning-strong)', 'triangle-exclamation']
};
function Toast({
  tone = 'success',
  title,
  message,
  onClose,
  style
}) {
  const [bg, ic] = T[tone] || T.success;
  return React.createElement('div', {
    role: 'status',
    style: {
      position: 'relative',
      background: bg,
      color: '#fff',
      padding: '23px 23px',
      minHeight: 112,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      textAlign: 'center',
      fontFamily: 'var(--font-body)',
      boxShadow: 'var(--shadow-footer)',
      ...style
    }
  }, React.createElement('div', {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'rgba(255,255,255,.18)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement(__ds_scope.Icon, {
    name: ic,
    size: 20,
    color: '#fff'
  })), React.createElement('div', {
    style: {
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: '0.3px'
    }
  }, title), message ? React.createElement('div', {
    style: {
      fontWeight: 700,
      fontSize: 14,
      lineHeight: '20px',
      whiteSpace: 'pre-line'
    }
  }, message) : null, onClose ? React.createElement(__ds_scope.IconButton, {
    icon: 'xmark',
    color: '#fff',
    onClick: onClose,
    label: 'Close',
    style: {
      position: 'absolute',
      top: 0,
      right: 0
    }
  }) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __dsError("components/feedback/Toast.jsx", e); }

// components/inputs/AttachmentThumb.jsx
try { (() => {
const { Icon } = __ds_scope;
// 64px rounded photo thumbnail with a dark remove disc. Source: Add note with image attachments.
// The 20px remove disc sits in a 44px transparent tap area (Nov 10), so it can be hit with a finger; it looks the same.
function AttachmentThumb({ src, onRemove, size = 64, style }) {
  return React.createElement('div', { style: { position: 'relative', width: size, height: size, borderRadius: 8, overflow: 'visible', flex: 'none', ...style } },
    React.createElement('img', { src, alt: '', style: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, display: 'block' } }),
    onRemove ? React.createElement('button', { type: 'button', 'aria-label': 'Remove', onClick: onRemove, style: { position: 'absolute', top: -18, right: -18, width: 44, height: 44, border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, cursor: 'pointer', zIndex: 1 } },
      React.createElement('span', { style: { width: 20, height: 20, borderRadius: '50%', background: 'var(--cx-mono-90)', border: '1.5px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, React.createElement(Icon, { name: 'xmark', size: 10, color: '#fff' }))) : null);
}
Object.assign(__ds_scope, { AttachmentThumb });
})(); } catch (e) { __dsError("components/inputs/AttachmentThumb.jsx", e); }

// components/inputs/FormField.jsx
try { (() => {
// Label + control stack. Source: Inputs/1 common form input (label 14 Medium, 15px gap, 44px control; field group 75px).
function FormField({
  label,
  required,
  info,
  hint,
  count,
  children,
  style
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 15,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, label ? React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '16px',
      color: '#000'
    }
  }, label + (required ? '*' : ''), info ? React.createElement(__ds_scope.Icon, {
    name: 'circle-info',
    size: 16,
    color: 'var(--cx-primary)'
  }) : null) : null, children, hint || count ? React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 300,
      fontSize: 12,
      lineHeight: '14px',
      color: '#000',
      marginTop: -7
    }
  }, React.createElement('span', null, hint || ''), React.createElement('span', null, count || '')) : null);
}
Object.assign(__ds_scope, { FormField });
})(); } catch (e) { __dsError("components/inputs/FormField.jsx", e); }

// components/inputs/SearchField.jsx
try { (() => {
const { Icon } = __ds_scope;
// Pill search. Source: Inputs/serch with rounder corners (40px, glow shadow, 18px lookup icon) and Inputs/search (35px, no icon).
// autoFocus (Nov 12, review line 28): off by default; when set, the cursor goes into the field as it appears (a search opened by a
// search button). preventScroll keeps the screen from jumping.
function SearchField({ value, placeholder = 'Search', onChange, height = 40, showIcon = true, iconColor = 'var(--cx-mono-90)', onClear, autoFocus = false, style }) {
  const inputRef = React.useRef(null);
  React.useEffect(() => { if (autoFocus && inputRef.current) inputRef.current.focus({ preventScroll: true }); }, []);
  return React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, height, padding: '0 12px', boxSizing: 'border-box', background: '#fff', borderRadius: 999, boxShadow: 'var(--shadow-pressed)', fontFamily: 'var(--font-body)', ...style } },
    showIcon ? React.createElement(Icon, { name: 'magnifying-glass', size: 16, color: iconColor }) : null,
    React.createElement('input', { ref: inputRef, value, placeholder, onChange: e => onChange && onChange(e.target.value), style: { flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 14, lineHeight: '22px', color: '#000', padding: 0 } }),
    value && onClear ? React.createElement('button', { type: 'button', onClick: onClear, style: { border: 'none', background: 'none', padding: 0, display: 'flex', cursor: 'pointer' } }, React.createElement(Icon, { name: 'xmark', size: 14, color: 'var(--cx-mono-80)' })) : null);
}
Object.assign(__ds_scope, { SearchField });
})(); } catch (e) { __dsError("components/inputs/SearchField.jsx", e); }

// components/inputs/Select.jsx
try { (() => {
const { Icon } = __ds_scope;
// 44px dropdown field with caret-down. Source: Inputs/Dropdown/1-enabled-dropdown.
// States from Sketch: 5-focused = #333 border; 2-disabled = #f9f9f9 fill, #d2d2d2 border, caret in the disabled icon style (#d2d2d2). A disabled value is #676767 so it never reads as the #8f8f8f placeholder (review line 11).
// readOnly: a value the employee can't change, shown for reference (Customer on Create unscheduled shift, filled in from the
// picked Site, line 122): #f3f3f3 fill, #d2d2d2 border, no caret, the value in #000.
function Select({ value, placeholder = 'Select', options, onChange, disabled = false, readOnly = false, style }) {
  if (readOnly) return React.createElement('div', { 'aria-readonly': true, style: { display: 'flex', alignItems: 'center', height: 44, boxSizing: 'border-box', background: 'var(--cx-mono-20)', border: '1px solid var(--cx-mono-40)', borderRadius: 8, padding: '0 12px', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 14, color: '#000', ...style } }, React.createElement('span', null, value));
  const [focused, setFocused] = React.useState(false);
  const border = disabled ? 'var(--cx-mono-40)' : focused ? 'var(--cx-mono-90)' : 'var(--cx-mono-60)';
  const caret = disabled ? 'var(--cx-mono-40)' : 'var(--cx-mono-80)';
  if (options) return React.createElement('div', { style: { position: 'relative', height: 44, ...style } },
    React.createElement('select', { value, disabled, onFocus: () => setFocused(true), onBlur: () => setFocused(false), onChange: e => onChange && onChange(e.target.value), style: { width: '100%', height: 44, appearance: 'none', WebkitAppearance: 'none', background: disabled ? 'var(--cx-mono-10)' : '#fff', border: '1px solid ' + border, borderRadius: 8, padding: '0 44px 0 12px', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 14, color: disabled ? 'var(--cx-mono-80)' : '#000', outline: 'none' } }, options.map(o => React.createElement('option', { key: o.value ?? o, value: o.value ?? o }, o.label ?? o))),
    React.createElement(Icon, { name: 'caret-down', size: 14, color: caret, style: { position: 'absolute', right: 15, top: 15, pointerEvents: 'none' } }));
  return React.createElement('div', { role: 'button', tabIndex: disabled ? -1 : 0, 'aria-disabled': disabled || undefined, onClick: disabled ? undefined : onChange, style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 44, boxSizing: 'border-box', background: disabled ? 'var(--cx-mono-10)' : '#fff', border: '1px solid ' + border, borderRadius: 8, padding: '0 15px 0 12px', fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 14, color: value ? (disabled ? 'var(--cx-mono-80)' : '#000') : 'var(--cx-mono-70)', cursor: disabled ? 'default' : 'pointer', ...style } }, React.createElement('span', null, value || placeholder), React.createElement(Icon, { name: 'caret-down', size: 14, color: caret }));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __dsError("components/inputs/Select.jsx", e); }

// components/inputs/TextArea.jsx
try { (() => {
// Multiline note field. Source: Inputs/Text area/text area w char count — 120px, #d2d2d2 border, 12px padding, 14px Light lh 20.
// States from Sketch (Form/Input styles): focused = #333 border; disabled = #f9f9f9 fill, #676767 text (the border is already #d2d2d2). Placeholder #8f8f8f.
function TextArea({ value, defaultValue, placeholder, onChange, rows, height = 120, disabled = false, style }) {
  const [focused, setFocused] = React.useState(false);
  return React.createElement('textarea', { value, defaultValue, placeholder, disabled, rows, className: 'cx-field', onFocus: () => setFocused(true), onBlur: () => setFocused(false), onChange: e => onChange && onChange(e.target.value), style: { width: '100%', height, boxSizing: 'border-box', resize: 'none', background: disabled ? 'var(--cx-mono-10)' : '#fff', border: '1px solid ' + (focused && !disabled ? 'var(--cx-mono-90)' : 'var(--cx-mono-40)'), borderRadius: 8, padding: 12, fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: 14, lineHeight: '20px', color: disabled ? 'var(--cx-mono-80)' : '#000', outline: 'none', ...style } });
}
Object.assign(__ds_scope, { TextArea });
})(); } catch (e) { __dsError("components/inputs/TextArea.jsx", e); }

// components/inputs/Toggle.jsx
try { (() => {
// Source: Mobile components/Inputs/Varied controls/on alt|off alt — 44x30, 17px track at 61% opacity, 22px knob with shadow.
// Disabled is not drawn in Sketch: the whole control drops to 40% so on and off stay readable.
function Toggle({ checked = false, onChange, disabled = false, style, label }) {
  const c = checked ? 'var(--cx-primary)' : 'var(--cx-mono-40)';
  return React.createElement('button', { type: 'button', role: 'switch', 'aria-checked': checked, 'aria-label': label, disabled, onClick: () => onChange && onChange(!checked), style: { position: 'relative', width: 44, height: 30, border: 'none', background: 'transparent', padding: 0, cursor: disabled ? 'default' : 'pointer', flex: 'none', opacity: disabled ? 0.4 : 1, ...style } },
    React.createElement('span', { style: { position: 'absolute', left: 0, top: 7, width: 44, height: 17, borderRadius: 14, background: c, opacity: 0.61 } }),
    React.createElement('span', { style: { position: 'absolute', left: checked ? 22 : 0, top: 4, width: 22, height: 22, borderRadius: '50%', background: c, boxShadow: 'var(--shadow-knob)', transition: 'left var(--motion-fast)' } }));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __dsError("components/inputs/Toggle.jsx", e); }

// components/lists/GroupHeader.jsx
try { (() => {
const { Icon, Badge, Checkbox } = __ds_scope;
// Collapsible grey group header. Source: lists/Headers/collapsible group header w checkbox-count — 50px, #f3f3f3, 16px label, orange 18px count, chevron.
// labelStyle, chevronColor and inset=false let the select sheets line the label up with the list box (review line 88).
function GroupHeader({ label, count, open = true, onToggle, checked, onCheck, labelStyle, chevronColor = 'var(--cx-mono-80)', chevronSize = 16, inset = true, style }) {
  return React.createElement('div', { role: 'button', tabIndex: 0, onClick: onToggle, style: { display: 'flex', alignItems: 'center', height: 50, padding: '0 12px', boxSizing: 'border-box', background: 'var(--cx-mono-20)', fontFamily: 'var(--font-body)', cursor: 'pointer', gap: 8, ...style } },
    checked !== undefined ? React.createElement(Checkbox, { checked, onChange: onCheck, size: 19, style: { marginLeft: 14, marginRight: 8 } }) : inset ? React.createElement('div', { style: { width: 10 } }) : null,
    React.createElement('div', { style: { flex: 1, fontWeight: 400, fontSize: 16, color: 'var(--cx-mono-90)', ...labelStyle } }, label),
    count != null ? React.createElement(Badge, { count, size: 18 }) : null,
    React.createElement('div', { style: { width: 30, display: 'flex', justifyContent: 'center' } }, React.createElement(Icon, { name: open ? 'chevron-down' : 'chevron-right', size: chevronSize, color: chevronColor })));
}
Object.assign(__ds_scope, { GroupHeader });
})(); } catch (e) { __dsError("components/lists/GroupHeader.jsx", e); }

// components/lists/ListContainer.jsx
try { (() => {
// Rounded bordered wrapper for stacked rows/cards. Source: Tours/Checkpoints list & Tour details — #fdfdfd, 1px #e7e0d9, 16px radius.
function ListContainer({
  children,
  radius = 16,
  style
}) {
  return React.createElement('div', {
    style: {
      background: 'var(--cx-mono-5)',
      border: '1px solid var(--cx-subtle-border)',
      borderRadius: radius,
      overflow: 'hidden',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { ListContainer });
})(); } catch (e) { __dsError("components/lists/ListContainer.jsx", e); }

// components/lists/ListRow.jsx
try { (() => {
const { Icon, Badge } = __ds_scope;
// 60px detail / menu row. Source: Mobile components/lists/Headers/panel option header w count (-n-label). Icon 48px cell, 14px label ls .3, right value 14 Light, count bubble, chevron.
// Also Mobile components/Inputs/Generic input w icon (53 uses: Availability, Timesheets and Documents details), which is this row, not a text input.
// Its two variants are props here: detail = multiline (a 14px Light line under the label, lh 21, wraps; Repeat weekly on, Documents),
// trailing (a pill, toggle…) sits in its own column, so the label, detail and value wrap before it instead of running under it;
// on two-line rows it lines up with the label line (Nov 10, incident reporting: Auto-captured pills on Incident details).
// stamp = w date-stamp (12px #333 author and date at the right of the label line; the timesheet Note).
function ListRow({ icon, iconVariant = 'auto', label, value, count, chevron = false, danger = false, onClick, trailing, avatar, style, height = 60, divider = true, labelStyle, detail, stamp }) {
  const color = danger ? 'var(--cx-primary)' : '#000';
  return React.createElement('div', { role: onClick ? 'button' : undefined, tabIndex: onClick ? 0 : undefined, onClick, style: { display: 'flex', alignItems: 'center', height: detail ? 'auto' : height, minHeight: height, padding: detail ? '8px 0' : undefined, boxSizing: 'border-box', background: '#fff', borderBottom: divider ? '1px solid var(--cx-mono-30)' : 'none', paddingRight: chevron ? 0 : 15, fontFamily: 'var(--font-body)', cursor: onClick ? 'pointer' : 'default', ...style } },
    avatar ? React.createElement('div', { style: { width: 48, display: 'flex', justifyContent: 'center', flex: 'none', marginLeft: 6 } }, avatar) : icon ? React.createElement('div', { style: { width: 48, display: 'flex', justifyContent: 'center', flex: 'none' } }, React.createElement(Icon, { name: icon, variant: iconVariant, size: 20, color: danger ? 'var(--cx-primary)' : 'var(--cx-mono-80)' })) : React.createElement('div', { style: { width: 15 } }),
    (detail || stamp) ? React.createElement('div', { style: { flex: 1, minWidth: 0 } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', gap: 8 } }, React.createElement('div', { style: { flex: 1, minWidth: 0, fontWeight: 400, fontSize: 14, lineHeight: '20px', letterSpacing: '0.3px', color, ...labelStyle } }, label), stamp ? React.createElement('div', { style: { flex: 'none', fontWeight: 400, fontSize: 12, lineHeight: '20px', color: 'var(--cx-mono-90)' } }, stamp) : null),
      detail ? React.createElement('div', { style: { marginTop: 3, fontWeight: 300, fontSize: 14, lineHeight: '21px', letterSpacing: '0.3px', color: '#000' } }, detail) : null)
    : React.createElement('div', { style: { flex: 1, minWidth: 0, fontWeight: 400, fontSize: 14, lineHeight: '16px', letterSpacing: '0.3px', color, ...labelStyle } }, label),
    value != null ? React.createElement('div', { style: { fontWeight: 300, fontSize: 14, color: '#000', textAlign: 'right', marginLeft: 12 } }, value) : null,
    count != null ? React.createElement(Badge, { count, variant: 'soft', style: { marginLeft: 12 } }) : null,
    trailing ? React.createElement('div', { style: { flex: 'none', marginLeft: 12, display: 'flex', alignSelf: detail || stamp ? 'flex-start' : 'center' } }, trailing) : null,
    chevron ? React.createElement('div', { style: { width: 25, display: 'flex', justifyContent: 'center', flex: 'none', marginLeft: 4 } }, React.createElement(Icon, { name: 'angle-right', variant: 'regular', size: 16, color: 'var(--cx-mono-80)' })) : null);
}
Object.assign(__ds_scope, { ListRow });
})(); } catch (e) { __dsError("components/lists/ListRow.jsx", e); }

// components/lists/SectionHeader.jsx
try { (() => {
// Transparent collapsible section title with chevron and peach count. Source: lists/Headers/collapsible tour header w count (45px, 16px Medium #333).
function SectionHeader({
  label,
  count,
  open = true,
  onToggle,
  collapsible = true,
  style
}) {
  return React.createElement('div', {
    role: collapsible ? 'button' : undefined,
    tabIndex: collapsible ? 0 : undefined,
    onClick: onToggle,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      height: 45,
      padding: '10px 0',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-body)',
      cursor: collapsible ? 'pointer' : 'default',
      ...style
    }
  }, collapsible ? React.createElement(__ds_scope.Icon, {
    name: open ? 'chevron-down' : 'chevron-right',
    size: 14,
    color: 'var(--cx-mono-80)'
  }) : null, React.createElement('div', {
    style: {
      flex: 1,
      fontWeight: collapsible ? 500 : 400,
      fontSize: collapsible ? 16 : 14,
      color: collapsible ? 'var(--cx-mono-90)' : '#000'
    }
  }, label), count != null ? React.createElement(__ds_scope.Badge, {
    count,
    variant: 'soft'
  }) : null);
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __dsError("components/lists/SectionHeader.jsx", e); }

// components/lists/ShiftCard.jsx
try { (() => {
const { Icon, StatusPill, Checkbox } = __ds_scope;
// Schedule list card. Source: Mobile components/shifts/List view shift plain/shift card generic — white, 8px radius, shadow 0 0 2 .2, padding 7/17, date column 44px, 2px status bar, details 14 Light lh 20.
// The Schedule templates in Sketch show the Worked and Scheduled pills without their icon (review line 120).
const PLAIN_PILLS = { worked: 1, scheduled: 1 };
function ShiftCard({ weekday, month, day, time, lines = [], status, statusLabel, pill, barStyle = 'solid', barColor, trailing, checked, onCheck, onClick, style }) {
  const bar = barStyle === 'dotted' ? { borderLeft: '2px dotted ' + (barColor || 'var(--cx-error-strong)') } : { borderLeft: '2px solid ' + (barColor || 'var(--cx-mono-80)') };
  return React.createElement('div', { role: onClick ? 'button' : undefined, onClick, style: { position: 'relative', background: '#fff', borderRadius: 8, boxShadow: 'var(--shadow-card)', padding: '7px 17px 7px 17px', display: 'flex', gap: 17, fontFamily: 'var(--font-body)', cursor: onClick ? 'pointer' : 'default', ...style } },
    React.createElement('div', { style: { width: 44, flex: 'none', paddingTop: 0 } },
      React.createElement('div', { style: { fontWeight: 500, fontSize: 14, lineHeight: '16px', color: 'var(--cx-mono-90)' } }, weekday),
      React.createElement('div', { style: { fontWeight: 300, fontSize: 14, lineHeight: '20px', color: '#000', marginTop: 2 } }, month),
      React.createElement('div', { style: { fontWeight: 400, fontSize: 18, lineHeight: '21px', color: 'var(--cx-mono-90)', marginTop: 2 } }, day)),
    React.createElement('div', { style: { flex: 1, minWidth: 0, paddingLeft: 17, ...bar } },
      React.createElement('div', { style: { fontWeight: 500, fontSize: 14, lineHeight: '16px', color: 'var(--cx-mono-90)' } }, time),
      lines.map((l, i) => React.createElement('div', { key: i, style: { fontWeight: 300, fontSize: 14, lineHeight: '20px', color: '#000', marginTop: i === 0 ? 2 : 0 } }, l)),
      (status || pill) ? React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, minHeight: 27 } }, pill || React.createElement(StatusPill, { status, label: statusLabel, icon: PLAIN_PILLS[status] ? null : undefined }), trailing ? React.createElement('span', { style: { color: 'var(--cx-mono-80)', display: 'flex' } }, trailing) : null) : null),
    checked !== undefined ? React.createElement(Checkbox, { checked, onChange: onCheck, size: 19, style: { position: 'absolute', top: 7, right: 12 } }) : null);
}
Object.assign(__ds_scope, { ShiftCard });
})(); } catch (e) { __dsError("components/lists/ShiftCard.jsx", e); }

// components/navigation/BottomNav.jsx
try { (() => {
const { Icon, Badge } = __ds_scope;
// Main app navigation. Source: Navigation/Main app navigation/navigation mobile — 73px, white, 1px #d2d2d2 top border, 5 tabs 63px, 20px icon, 10px Medium uppercase label, orange active, 17px bubble, 120x4 home indicator.
const NAV_ITEMS = [{ key: 'dashboard', label: 'Dashboard', icon: 'tachometer-alt' }, { key: 'schedule', label: 'Schedule', icon: 'calendar-days' }, { key: 'timesheets', label: 'Timesheets', icon: 'clock' }, { key: 'chat', label: 'Chat', icon: 'comments' }, { key: 'account', label: 'My account', icon: 'user' }];
function BottomNav({ active = 'schedule', badges = {}, onChange, items = NAV_ITEMS, homeIndicator = true, style }) {
  return React.createElement('nav', { style: { height: 73, boxSizing: 'border-box', background: '#fff', borderTop: '1px solid var(--cx-mono-40)', padding: '8px 11px', position: 'relative', fontFamily: 'var(--font-body)', ...style } },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between' } }, items.map(it => { const on = it.key === active; const c = on ? 'var(--cx-primary)' : 'var(--cx-mono-80)'; return React.createElement('button', { key: it.key, type: 'button', 'aria-current': on ? 'page' : undefined, onClick: () => onChange && onChange(it.key), style: { width: 63, height: 41, border: 'none', background: 'transparent', padding: 0, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', color: c } },
      React.createElement('div', { style: { height: 29, display: 'flex', alignItems: 'center', position: 'relative' } }, React.createElement(Icon, { name: it.icon, variant: 'auto', size: 20, color: c }), badges[it.key] ? React.createElement(Badge, { count: badges[it.key], style: { position: 'absolute', top: 0, left: 14 } }) : null),
      React.createElement('div', { style: { fontWeight: 500, fontSize: 10, lineHeight: '11px', letterSpacing: '-0.07px', textTransform: 'uppercase', whiteSpace: 'nowrap' } }, it.label)); })),
    homeIndicator ? React.createElement('div', { style: { position: 'absolute', left: '50%', bottom: 8, transform: 'translateX(-50%)', width: 120, height: 4, borderRadius: 3, background: '#000' } }) : null);
}
Object.assign(__ds_scope, { NAV_ITEMS, BottomNav });
})(); } catch (e) { __dsError("components/navigation/BottomNav.jsx", e); }

// components/navigation/DateHeader.jsx
try { (() => {
const { Icon, IconButton } = __ds_scope;
// Month selector + stepper. Source: Headers/page header/date picker header — 40px, 23px side padding, calendar icon + 16px month + caret; ‹ › 40px buttons + "Today".
function DateHeader({ label, onToggle, onPrev, onNext, onToday, open = false, style }) {
  return React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 40, padding: '0 23px', boxSizing: 'border-box', fontFamily: 'var(--font-body)', ...style } },
    React.createElement('button', { type: 'button', onClick: onToggle, style: { display: 'flex', alignItems: 'center', gap: 12, border: 'none', background: 'none', padding: 0, cursor: 'pointer', color: 'var(--cx-mono-90)' } }, React.createElement(Icon, { name: 'calendar-days', variant: 'regular', size: 20, color: 'var(--cx-mono-80)' }), React.createElement('span', { style: { fontWeight: 400, fontSize: 16, color: 'var(--cx-mono-90)' } }, label), React.createElement(Icon, { name: open ? 'caret-up' : 'caret-down', size: 12, color: 'var(--cx-mono-80)' })),
    React.createElement('div', { style: { display: 'flex', alignItems: 'center' } }, React.createElement(IconButton, { icon: 'angle-left', iconSize: 16, onClick: onPrev, label: 'Previous' }), React.createElement(IconButton, { icon: 'angle-right', iconSize: 16, onClick: onNext, label: 'Next' }), React.createElement('button', { type: 'button', onClick: onToday, style: { border: 'none', background: 'none', padding: '0 0 0 8px', fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 14, letterSpacing: '0.3px', color: 'var(--cx-mono-90)', cursor: 'pointer' } }, 'Today')));
}
Object.assign(__ds_scope, { DateHeader });
})(); } catch (e) { __dsError("components/navigation/DateHeader.jsx", e); }

// components/navigation/FooterActions.jsx
try { (() => {
// Sticky action footer holding 1–3 buttons. Source: Footers/button group — 82px, 16px padding, 12px gap, cream bg with 1px #d2d2d2 top border (templates) / white with shadow (library).
function FooterActions({
  children,
  background = 'var(--cx-bg)',
  style
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: 12,
      padding: 16,
      height: 82,
      boxSizing: 'border-box',
      background,
      borderTop: '1px solid var(--cx-mono-40)',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { FooterActions });
})(); } catch (e) { __dsError("components/navigation/FooterActions.jsx", e); }

// components/navigation/PageHeader.jsx
try { (() => {
const { IconButton } = __ds_scope;
// 56px title header. Source: Headers/page header/common top header | common top page inner header — bg #fcfbf8, 1px #d2d2d2 bottom border, 18px Regular centred title, 40x56 icon cells.
// Header icons are 44x44 tap areas (Nov 10; were 40). actions (Lana, Nov 10, review lines 128-130): up to two icons on the right, each a 44x44 tap area (the minimum for a finger),
// 8px apart, glyphs 20px. The left side then reserves the same width, so the title stays centred on the screen; long titles
// end with an ellipsis. Header icons are Regular (decided Nov 10), like rightIcon and leftIcon. Each action: { icon, label, onClick,
// badge, spinning, pressed, iconVariant } (pressed = grey disc while its sheet is open).
function PageHeader({ title, subtitle, onBack, leftIcon, onLeft, rightIcon, rightBadge, onRight, right, left, actions, border = true, style }) {
  const cell = { width: 44, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' };
  const acts = actions && actions.length ? actions.slice(0, 2) : null;
  const actW = acts ? acts.length * 44 + (acts.length - 1) * 8 + 4 : 0;
  const leftCell = acts ? { ...cell, width: actW, justifyContent: 'flex-start' } : left !== undefined ? { ...cell, width: 'auto', minWidth: 44, justifyContent: 'flex-start', whiteSpace: 'nowrap' } : cell;
  const rightCell = acts ? { ...cell, width: actW, justifyContent: 'flex-end', gap: 8, paddingRight: 4, boxSizing: 'border-box' } : right !== undefined ? { ...cell, width: 'auto', minWidth: 44, justifyContent: 'flex-end', paddingRight: 4 } : cell;
  const l = left !== undefined ? left : onBack ? React.createElement(IconButton, { icon: 'arrow-left', label: 'Back', onClick: onBack, size: 44, iconSize: 18 }) : leftIcon ? React.createElement(IconButton, { icon: leftIcon, iconVariant: 'regular', onClick: onLeft, size: 44, iconSize: 18 }) : null;
  const r = acts ? acts.map((x, i) => React.createElement(IconButton, { key: x.label || x.icon || i, icon: x.icon, label: x.label, onClick: x.onClick, badge: x.badge, spinning: x.spinning, iconVariant: x.iconVariant || 'regular', variant: x.pressed ? 'muted' : 'plain', size: 44, iconSize: 20 })) : right !== undefined ? right : rightIcon ? React.createElement(IconButton, { icon: rightIcon, iconVariant: 'regular', badge: rightBadge, onClick: onRight, size: 44, iconSize: 18 }) : null;
  return React.createElement('div', { style: { position: 'relative', height: subtitle ? 85 : 56, display: 'flex', alignItems: 'center', background: 'var(--cx-bg)', borderBottom: border ? '1px solid var(--cx-mono-40)' : 'none', boxSizing: 'border-box', fontFamily: 'var(--font-body)', ...style } },
    React.createElement('div', { style: leftCell }, l),
    React.createElement('div', { style: { flex: 1, textAlign: 'center', minWidth: 0 } },
      React.createElement('div', { style: { fontWeight: 400, fontSize: 18, lineHeight: '21px', color: '#000', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }, title),
      subtitle ? React.createElement('div', { style: { fontWeight: 400, fontSize: 14, lineHeight: '18px', color: 'var(--cx-mono-80)', marginTop: 2 } }, subtitle) : null),
    React.createElement('div', { style: rightCell }, r));
}
Object.assign(__ds_scope, { PageHeader });
})(); } catch (e) { __dsError("components/navigation/PageHeader.jsx", e); }

// components/navigation/StatusBar.jsx
try { (() => {
const { Icon } = __ds_scope;
// iOS status bar stand-in (56px). The Wi-Fi glyph follows color like the other glyphs (it was always black; fixed Nov 10), and since
// Nov 11 it is the Font Awesome wifi glyph (Solid, 13px) instead of a clipped CSS arc (review line 26).
// Source: Headers/page header/common status bar mobile — time 14 Semibold, signal/wifi/battery glyphs.
function StatusBar({ time = '10:46', background = 'var(--cx-bg)', color = '#000', style }) {
  return React.createElement('div', { style: { height: 56, padding: '12px 25px', boxSizing: 'border-box', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', background, fontFamily: '-apple-system, "SF Pro Text", var(--font-body)', fontWeight: 600, fontSize: 14, color, ...style } },
    React.createElement('span', null, time),
    React.createElement('span', { style: { display: 'flex', alignItems: 'flex-end', gap: 6, paddingBottom: 2 } },
      React.createElement('span', { style: { display: 'flex', alignItems: 'flex-end', gap: 1.5 } }, [4.5, 6, 8, 10].map(h => React.createElement('span', { key: h, style: { width: 3, height: h, background: color, borderRadius: 1 } }))),
      React.createElement(Icon, { name: 'wifi', variant: 'solid', size: 13, color, style: { width: 'auto', height: 11, lineHeight: '11px' } }),
      React.createElement('span', { style: { width: 24, height: 11.5, border: '1px solid ' + color, opacity: .9, borderRadius: 2.5, boxSizing: 'border-box', padding: 1.5, display: 'flex' } }, React.createElement('span', { style: { flex: 1, background: color, borderRadius: .5 } }))));
}
Object.assign(__ds_scope, { StatusBar });
})(); } catch (e) { __dsError("components/navigation/StatusBar.jsx", e); }

// components/navigation/SubTabs.jsx
try { (() => {
// Uppercase underline tabs (DETAILS / STATUS / MAP / ACTIVITIES). Source: Headers/var header elements/Tab active mobile — 12px Medium orange with 2px underline; inactive 12px Regular #676767.
function SubTabs({
  tabs,
  value,
  onChange,
  gap = 10,
  style
}) {
  return React.createElement('div', {
    role: 'tablist',
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, tabs.map(t => {
    const key = t.value ?? t;
    const label = t.label ?? t;
    const on = key === value;
    return React.createElement('button', {
      key,
      type: 'button',
      role: 'tab',
      'aria-selected': on,
      onClick: () => onChange && onChange(key),
      style: {
        padding: '6px 0',
        minWidth: 36,
        border: 'none',
        background: 'transparent',
        borderBottom: '2px solid ' + (on ? 'var(--cx-primary)' : 'transparent'),
        color: on ? 'var(--cx-primary)' : 'var(--cx-mono-80)',
        fontFamily: 'var(--font-body)',
        fontWeight: on ? 500 : 400,
        fontSize: 12,
        lineHeight: '14px',
        textTransform: 'uppercase',
        cursor: 'pointer'
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { SubTabs });
})(); } catch (e) { __dsError("components/navigation/SubTabs.jsx", e); }

// components/navigation/TabRibbon.jsx
try { (() => {
// Horizontal pill tabs under the header (Schedule / Self-Scheduling / Shift bidding / Availability / Time off). Source: Headers/tab header/common tab header mobile — 52px, 10px padding, 32px pills, active orange with shadow.
// trailing (Lana, Nov 10, review line 127): an icon pinned at the right end, such as search on Tours. It stays put while the pills
// scroll under it and fade out; give it a 44px IconButton.
// gutter (Nov 10): the side padding, default 10; Tours uses 16 so the pills line up with the cards. With trailing the right side
// keeps the gutter plus 48px for the icon.
function TabRibbon({ tabs, value, onChange, stretch = false, background = 'var(--cx-bg)', trailing, gutter = 10, style }) {
  if (trailing) return React.createElement('div', { style: { position: 'relative', flex: 'none' } },
    React.createElement(TabRibbon, { tabs, value, onChange, stretch, background, gutter, style: { paddingRight: gutter + 48, ...style } }),
    React.createElement('div', { style: { position: 'absolute', top: 0, right: 0, bottom: 0, width: 72, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 4, boxSizing: 'border-box', background: 'linear-gradient(90deg, rgba(252,251,248,0), ' + background + ' 34%)' } }, trailing));
  return React.createElement('div', { role: 'tablist', style: { display: 'flex', gap: 10, padding: '10px ' + gutter + 'px', height: 52, minWidth: 0, width: '100%', boxSizing: 'border-box', background, overflowX: stretch ? 'visible' : 'auto', scrollbarWidth: 'none', fontFamily: 'var(--font-body)', ...style } },
    tabs.map(t => { const key = t.value ?? t; const label = t.label ?? t; const on = key === value; return React.createElement('button', { key, type: 'button', role: 'tab', 'aria-selected': on, onClick: () => onChange && onChange(key), style: { height: 32, padding: '4px 10px 5px', boxSizing: 'border-box', borderRadius: 999, border: 'none', background: on ? 'var(--cx-primary)' : '#fff', color: on ? '#fff' : 'var(--cx-mono-80)', boxShadow: on ? '0 0 4px rgba(0,0,0,.2)' : '0 0 4px rgba(0,0,0,.1)', fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 14, lineHeight: '16px', whiteSpace: 'nowrap', cursor: 'pointer', flex: stretch ? 1 : 'none' } }, label); }));
}
Object.assign(__ds_scope, { TabRibbon });
})(); } catch (e) { __dsError("components/navigation/TabRibbon.jsx", e); }

// components/tours/CheckpointRow.jsx
try { (() => {
const { Icon } = __ds_scope;
// Source: Tours/Checkpoints/available|not started|incomplete|completed. 66–84px, 15px side padding, 36px status disc or 28px numbered disc, 16px Medium title, 14px grey subtitle, right rail time/requirements + chevron.
// Card colours checked against Active tour and Tour completed in Sketch on 2026-10-23 (Tour regular/incomplete/completed styles):
// available = white card, 0.5px #e96c24 rim, #fcf0e9 disc, Regular circle; incomplete = #fff3eb card, 0.5px #de6017 rim, #fce1cf disc, circle-exclamation;
// partial (partly done: Requirements 1 / 2 on Tour completed) = the incomplete card with circle-half-stroke; completed = #e6f5f2 card, 0.5px #037e81 rim, #d5efea disc, circle-check.
// Card rows use the same type as list rows: title 16 Medium #333, subtitle 14 Regular #676767, time 12 (Active tour checked Nov 10, line 124).
// Chevrons are #e96c24. Sketch's "locked" checkpoint is hidden in every template, so there is no locked state. "pending" is kept as another name for available.
const AVAILABLE = { bg: 'var(--cx-bg-primary)', fg: 'var(--cx-primary)', icon: 'circle', regular: true, border: 'var(--cx-primary)', card: '#fff' };
const INCOMPLETE = { bg: 'var(--cx-warning-soft)', fg: 'var(--cx-primary)', icon: 'circle-exclamation', border: 'var(--cx-warning-strong)', card: 'var(--cx-warning-light)' };
const STATES = { notStarted: null, available: AVAILABLE, pending: AVAILABLE, incomplete: INCOMPLETE, partial: { ...INCOMPLETE, icon: 'circle-half-stroke' }, completed: { bg: 'var(--cx-success-soft)', fg: 'var(--cx-success-dark)', icon: 'circle-check', border: 'var(--cx-success-dark)', card: 'var(--cx-success-light)' } };
function CheckpointRow({ index, title, subtitle, state = 'notStarted', time, note, noteTone, onClick, card = false, style }) {
  const s = STATES[state];
  const cardStyle = card ? { borderRadius: 8, boxShadow: 'var(--shadow-card-raised)', border: '0.5px solid ' + (s ? s.border : 'var(--cx-subtle-border)'), background: s ? s.card : '#fff' } : { background: state === 'completed' ? 'var(--cx-success-light)' : '#fff', borderBottom: '1px solid var(--cx-subtle-border)' };
  return React.createElement('div', { role: onClick ? 'button' : undefined, tabIndex: onClick ? 0 : undefined, onClick, style: { display: 'flex', alignItems: 'center', gap: 12, minHeight: card ? 66 : 66, padding: '5px 15px', boxSizing: 'border-box', fontFamily: 'var(--font-body)', cursor: onClick ? 'pointer' : 'default', ...cardStyle, ...style } },
    s ? React.createElement('div', { style: { width: 36, height: 36, borderRadius: '50%', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' } }, React.createElement(Icon, { name: s.icon, variant: s.regular ? 'regular' : 'solid', size: 14, color: s.fg })) : React.createElement('div', { style: { width: 28, height: 28, borderRadius: '50%', background: 'var(--cx-mono-20)', color: 'var(--cx-mono-80)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', fontWeight: 400, fontSize: 12 } }, index),
    React.createElement('div', { style: { flex: 1, minWidth: 0, padding: '8px 0' } }, React.createElement('div', { style: { fontWeight: 500, fontSize: 16, lineHeight: '19px', color: 'var(--cx-mono-90)' } }, title), subtitle ? React.createElement('div', { style: { fontWeight: 400, fontSize: 14, lineHeight: '18px', letterSpacing: '0.3px', color: 'var(--cx-mono-80)', marginTop: 2 } }, subtitle) : null),
    (time || note) ? React.createElement('div', { style: { textAlign: 'right', fontWeight: 400, fontSize: 12, lineHeight: '18px' } }, time ? React.createElement('div', { style: { color: state === 'completed' ? 'var(--cx-success-dark)' : 'var(--cx-mono-80)', fontWeight: state === 'completed' ? 500 : 400 } }, time) : null, note ? React.createElement('div', { style: { color: noteTone === 'error' ? 'var(--cx-error-strong)' : 'var(--cx-primary)' } }, note) : null) : null,
    onClick ? React.createElement(Icon, { name: 'angle-right', variant: 'solid', size: 12, color: s ? 'var(--cx-primary)' : 'var(--cx-mono-80)' }) : null);
}
Object.assign(__ds_scope, { CheckpointRow });
})(); } catch (e) { __dsError("components/tours/CheckpointRow.jsx", e); }

// components/tours/InfoCard.jsx
try { (() => {
const { Icon } = __ds_scope;
// Sizes from the Sketch symbol (Nov 9, 2026, review line 120): title 16 Medium, body 14 Light, row label 16 Medium, value 16 Regular.
// Source: Tours/Checkpoints/description — white, 1px #e7e0d9 border, padding 5/16/16, 22px icon + 16px Medium title, 14px Light body lh 18. Also the label/value rows of Tour details.
// Options added Nov 10 (incident reporting request lines 3-4; the Original note, Follow-up and Enhanced report cards):
// icon={null} = no icon and no gap · time = 12px Light --cx-mono-80 at the top right of the title row · text = the card's text,
// 14px Light black, line 22 · clamp = show that many lines of text, then Show more / Show less · children sit under the text
// (photo row, Details toggle) · before = a node between the title and the text (a Queued pill, "Updating") ·
// tone="info" = title, icon and border in the info colours · loading = two grey lines (--cx-mono-30, 100% and 64%) under the
// title while the text is on its way, with text (if any) under them.
// info (Nov 12, from Activity log): the AI card colours --cx-ai-bg and --cx-ai-border; title and icon stay --cx-info-dark (4.86:1 on
// the new background). The fallbacks keep the look right until tokens.css is regenerated with the two new tokens.
const TONES = { info: { ink: 'var(--cx-info-dark)', border: 'var(--cx-ai-border, #c6e8fc)', bg: 'var(--cx-ai-bg, #f6fafc)' } };
function InfoCard({ icon = 'file-lines', iconVariant, iconSize, title, time, text, clamp, before, loading = false, tone, children, rows = [], footnote, style }) {
  const [open, setOpen] = React.useState(false);
  const [long, setLong] = React.useState(false);
  const ref = React.useRef(null);
  const t = TONES[tone] || null;
  const ink = t ? t.ink : 'var(--cx-mono-90)';
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !clamp || open) return;
    setLong(el.scrollHeight > el.clientHeight + 1);
  }, [text, clamp, open]);
  const textStyle = { marginTop: loading ? 12 : 0, fontWeight: 300, fontSize: 14, lineHeight: '22px', color: '#000', whiteSpace: 'pre-line', ...(clamp && !open ? { display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: clamp, overflow: 'hidden' } : null) };
  const modern = text != null || loading || before != null;
  const body = modern
    ? React.createElement('div', { style: { marginTop: 6 } },
      before != null ? React.createElement('div', { style: { marginBottom: 8 } }, before) : null,
      loading ? React.createElement('div', { 'aria-hidden': true, style: { display: 'grid', rowGap: 9, marginTop: 12 } },
        React.createElement('div', { style: { height: 11, borderRadius: 6, background: 'var(--cx-mono-30)', width: '100%' } }),
        React.createElement('div', { style: { height: 11, borderRadius: 6, background: 'var(--cx-mono-30)', width: '64%' } })) : null,
      text != null && text !== '' ? React.createElement('div', { ref, style: textStyle }, text) : null,
      clamp && (long || open) ? React.createElement('button', { type: 'button', 'aria-expanded': open, onClick: () => setOpen(!open), style: { display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, padding: 0, border: 'none', background: 'none', fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 12, lineHeight: '14px', color: 'var(--cx-mono-90)', cursor: 'pointer' } }, open ? 'Show less' : 'Show more', React.createElement(Icon, { name: open ? 'chevron-up' : 'chevron-down', size: 12, color: 'var(--cx-mono-80)' })) : null,
      children != null ? children : null)
    : children ? React.createElement('div', { style: { fontWeight: 300, fontSize: 14, lineHeight: '18px', letterSpacing: '0.3px', color: 'var(--cx-mono-80)', marginTop: 6 } }, children) : null;
  return React.createElement('div', { style: { background: t && t.bg ? t.bg : '#fff', border: '1px solid ' + (t ? t.border : 'var(--cx-subtle-border)'), borderRadius: 8, fontFamily: 'var(--font-body)', overflow: 'hidden', ...style } },
    (title || children || modern) ? React.createElement('div', { style: { padding: '13px 16px 16px 16px' } },
      title ? React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: icon ? 8 : 0, fontWeight: 500, fontSize: 16, lineHeight: '19px', color: ink } },
        icon ? React.createElement(Icon, { name: icon, variant: iconVariant || (tone === 'info' ? 'solid' : 'regular'), size: iconSize || (tone === 'info' ? 16 : 18), color: ink }) : null,
        React.createElement('span', { style: { flex: 1, minWidth: 0 } }, title),
        time ? React.createElement('span', { style: { flex: 'none', marginLeft: 12, fontWeight: 300, fontSize: 12, lineHeight: '16px', color: 'var(--cx-mono-80)' } }, time) : null) : null,
      body) : null,
    rows.map((r, i) => React.createElement('div', { key: i, style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '17px 16px', borderTop: '1px solid var(--cx-subtle-border)', fontSize: 16 } }, React.createElement('span', { style: { fontWeight: 500, color: 'var(--cx-mono-90)' } }, r.label), React.createElement('span', { style: { fontWeight: 400, color: 'var(--cx-mono-80)' } }, r.value))),
    footnote ? React.createElement('div', { style: { padding: '10px 16px 14px', borderTop: '1px solid var(--cx-subtle-border)', fontWeight: 300, fontSize: 14, lineHeight: '18px', color: 'var(--cx-mono-80)' } }, footnote) : null);
}
Object.assign(__ds_scope, { InfoCard });
})(); } catch (e) { __dsError("components/tours/InfoCard.jsx", e); }

// components/tours/RequirementCard.jsx
try { (() => {
// Source: Tours/Requirement card | Requirement card completed — 14px padding, 36px peach icon disc, 16px Medium title, 14px Light body, full-width 50px button; completed = teal tint + "Done".
function RequirementCard({
  icon = 'clipboard',
  title,
  description,
  action,
  actionIcon,
  onAction,
  completed = false,
  style
}) {
  return React.createElement('div', {
    style: {
      padding: 14,
      borderRadius: 8,
      boxShadow: 'var(--shadow-card-raised)',
      background: completed ? 'var(--cx-success-light)' : '#fff',
      border: '0.5px solid ' + (completed ? 'var(--cx-success-dark)' : 'var(--cx-primary)'),
      fontFamily: 'var(--font-body)',
      boxSizing: 'border-box',
      ...style
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      gap: 7,
      alignItems: 'flex-start'
    }
  }, React.createElement('div', {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: completed ? 'var(--cx-success-soft)' : 'var(--cx-bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none',
      marginTop: 8
    }
  }, React.createElement(__ds_scope.Icon, {
    name: icon,
    variant: 'regular',
    size: 14,
    color: completed ? 'var(--cx-success-dark)' : 'var(--cx-primary)'
  })), React.createElement('div', {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement('div', {
    style: {
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '19px',
      color: 'var(--cx-mono-90)'
    }
  }, title), React.createElement('div', {
    style: {
      fontWeight: 300,
      fontSize: 14,
      lineHeight: '18px',
      letterSpacing: '0.3px',
      color: 'var(--cx-mono-80)',
      marginTop: 3
    }
  }, description)), completed ? React.createElement('div', {
    style: {
      fontWeight: 400,
      fontSize: 12,
      color: 'var(--cx-success-dark)',
      alignSelf: 'center'
    }
  }, 'Done') : null), action && !completed ? React.createElement(__ds_scope.Button, {
    fullWidth: true,
    icon: actionIcon,
    onClick: onAction,
    style: {
      marginTop: 12
    }
  }, action) : null);
}
Object.assign(__ds_scope, { RequirementCard });
})(); } catch (e) { __dsError("components/tours/RequirementCard.jsx", e); }

// components/tours/TourCard.jsx
try { (() => {
const { Icon, StatusPill, ProgressBar, Button } = __ds_scope;
// Source: Mobile components/Tours/Tour card-in progress|regular — white, 8px radius, shadow 0 0 4 .2, 14px padding; highlighted = 0.5px orange border.
function TourCard({ title, meta, status, highlighted = false, action, actionIcon = 'play', actionVariant = 'outlined', onAction, progress, progressLabel, progressPct, onOpen, style }) {
  return React.createElement('div', { style: { background: '#fff', borderRadius: 8, boxShadow: 'var(--shadow-card-raised)', border: highlighted ? '0.5px solid var(--cx-primary)' : '0.5px solid transparent', padding: 14, fontFamily: 'var(--font-body)', boxSizing: 'border-box', ...style } },
    React.createElement('button', { type: 'button', onClick: onOpen, style: { display: 'flex', alignItems: 'center', gap: 6, border: 'none', background: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 14, lineHeight: '16px', letterSpacing: '0.3px', color: 'var(--cx-mono-90)' } }, title, React.createElement(Icon, { name: 'angle-right', variant: 'solid', size: 12, color: 'var(--cx-mono-80)' })),
    meta ? React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 5, marginTop: 10, fontWeight: 300, fontSize: 14, lineHeight: '20px', color: 'var(--cx-mono-80)' } }, React.createElement(Icon, { name: 'clock', variant: 'light', size: 12, color: 'var(--cx-mono-80)' }), meta) : null,
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 } }, status ? React.createElement(StatusPill, { status }) : React.createElement('span'), action ? React.createElement(Button, { size: 'sm', variant: actionVariant, icon: actionIcon, onClick: onAction }, action) : null),
    progress != null ? React.createElement('div', { style: { marginTop: 11 } }, React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontWeight: 500, fontSize: 14, color: 'var(--cx-mono-80)', marginBottom: 5 } }, React.createElement('span', null, progressLabel), React.createElement('span', null, progressPct ?? (progress + ' %'))), React.createElement(ProgressBar, { value: progress })) : null);
}
Object.assign(__ds_scope, { TourCard });
})(); } catch (e) { __dsError("components/tours/TourCard.jsx", e); }

// components/inputs/SheetParts.jsx
try { (() => {
const { Icon, IconButton, SearchField, PageHeader } = __ds_scope;
// Shared parts of the Dropdowns bottom sheets. Source: TeamXP templates/Dropdowns (single select + multi-select,
// half and full sheet): scrim #333 @ 50%, cream sheet with 8px top radius, 39x5 #a7a7a7 grip, 56px header,
// 80px search block with a 40px pill, 60px rows in white 8px containers with the 0 0 5 -1 glow.
// Review lines 88-90 (Oct 28): bold title and group names, and light grey close, chevron and search icons, as in the app.
// The greys are --cx-mono-70, the lightest that keeps icons at 3:1 on the sheet.
// Grip (Lana, Nov 10): 40x6, in its own 22px strip above the header (10px above, 6px below), so it no longer crowds the title;
// Sketch's 39x5 grip sat 8px from the top, over the header.
const SHEET_GROUP_LABEL = { fontWeight: 700, fontSize: 16, color: 'var(--cx-mono-90)' };
const SHEET_ICON = 'var(--cx-mono-70)';
function sheetValue(o) { return typeof o === 'object' && o !== null ? o.value : o; }
function sheetLabel(o) { return typeof o === 'object' && o !== null ? (o.label != null ? o.label : String(o.value)) : String(o); }
function sheetGroups(groups, options) {
  if (groups && groups.length) return groups.map((g, i) => ({ key: g.key != null ? g.key : (g.label || 'group-' + i), label: g.label, options: g.options || [] }));
  return [{ key: '__flat', label: null, options: options || [] }];
}
function filterSheetGroups(groups, query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return groups;
  return groups.map(g => {
    if (g.label && String(g.label).toLowerCase().includes(q)) return g;
    return { ...g, options: g.options.filter(o => sheetLabel(o).toLowerCase().includes(q)) };
  }).filter(g => g.options.length > 0);
}
// size "auto" (ActionSheet): as tall as its content, up to the full-sheet height. bodyRole / bodyStyle: the content area's role
// (listbox by default) and style.
function SheetFrame({ title, right, size = 'full', scrim = true, onClose, searchable = true, searchPlaceholder = 'Search', query, onQuery, gutter = 15, toolbar, homeIndicator = true, multiselectable, bodyRole = 'listbox', bodyStyle, children, style }) {
  const height = size === 'auto' ? 'auto' : scrim ? (size === 'half' ? '56%' : 'calc(100% - 74px)') : (size === 'half' ? 488 : 800);
  const sheet = React.createElement('div', {
    role: 'dialog', 'aria-modal': scrim ? true : undefined, 'aria-label': typeof title === 'string' ? title : undefined,
    onKeyDown: e => { if (e.key === 'Escape' && onClose) onClose(); },
    style: { position: 'relative', height, maxHeight: size === 'auto' ? 'calc(100% - 74px)' : undefined, display: 'flex', flexDirection: 'column', background: 'var(--cx-bg)', borderRadius: '8px 8px 0 0', overflow: 'hidden', fontFamily: 'var(--font-body)', boxSizing: 'border-box', ...(scrim ? null : style) }
  },
    React.createElement('div', { 'aria-hidden': true, style: { flex: 'none', display: 'flex', justifyContent: 'center', padding: '10px 0 6px' } },
      React.createElement('div', { style: { width: 40, height: 6, borderRadius: 3, background: 'var(--cx-mono-60)' } })),
    React.createElement(PageHeader, { title: typeof title === 'string' ? React.createElement('span', { style: { fontWeight: 700 } }, title) : title, border: true, style: { background: 'transparent', flex: 'none' },
      left: React.createElement(IconButton, { icon: 'xmark', iconSize: 18, label: 'Close', color: SHEET_ICON, onClick: onClose }),
      right: right || React.createElement('span', { style: { width: 40 } }) }),
    searchable ? React.createElement('div', { style: { flex: 'none', padding: '20px ' + gutter + 'px' } },
      React.createElement(SearchField, { iconColor: SHEET_ICON, value: query, placeholder: searchPlaceholder, onChange: onQuery, onClear: query ? () => onQuery('') : undefined })) : null,
    toolbar || null,
    React.createElement('div', { role: bodyRole, 'aria-multiselectable': multiselectable ? true : undefined, 'aria-label': typeof title === 'string' ? title : undefined,
      style: { flex: size === 'auto' ? '0 1 auto' : 1, minHeight: 0, overflowY: 'auto', paddingTop: searchable ? 0 : 20, paddingBottom: homeIndicator ? 34 : 16, scrollbarWidth: 'none', ...bodyStyle } }, children),
    homeIndicator ? React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', bottom: 8, left: '50%', marginLeft: -69.5, width: 139, height: 5, borderRadius: 3, background: '#000' } }) : null);
  if (!scrim) return sheet;
  return React.createElement('div', {
    onClick: e => { if (e.target === e.currentTarget && onClose) onClose(); },
    style: { position: 'absolute', inset: 0, background: 'rgba(51,51,51,.5)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 10, ...style }
  }, sheet);
}
function SheetList({ gutter = 15, children }) {
  return React.createElement('div', { role: 'group', style: { margin: '0 ' + gutter + 'px 15px', background: '#fff', border: '1px solid var(--cx-mono-30)', borderRadius: 8, boxShadow: 'var(--shadow-pressed)', overflow: 'hidden' } }, children);
}
function SheetRow({ label, selected, onSelect, last }) {
  return React.createElement('div', {
    role: 'option', 'aria-selected': !!selected, tabIndex: 0,
    onClick: onSelect,
    onKeyDown: e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect && onSelect(); } },
    style: { display: 'flex', alignItems: 'center', height: 60, padding: '0 15px', boxSizing: 'border-box', background: selected ? 'var(--cx-bg-primary-alt)' : '#fff', borderBottom: last ? 'none' : '1px solid var(--cx-mono-30)', cursor: 'pointer', outlineOffset: -2 }
  },
    React.createElement('span', { style: { flex: 1, minWidth: 0, fontWeight: 400, fontSize: 14, lineHeight: '16px', letterSpacing: '0.3px', color: 'var(--cx-mono-90)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, label),
    React.createElement('span', { style: { width: 22, display: 'flex', justifyContent: 'center', flex: 'none' } },
      selected ? React.createElement(Icon, { name: 'check', size: 18, color: 'var(--cx-primary)' }) : null));
}
function SheetEmpty({ query }) {
  return React.createElement('div', { style: { padding: '40px 24px', textAlign: 'center', fontWeight: 300, fontSize: 14, lineHeight: '20px', color: 'var(--cx-mono-70)' } }, query ? 'No matches for “' + query + '”' : 'Nothing to choose from');
}
Object.assign(__ds_scope, { SHEET_GROUP_LABEL, SHEET_ICON, sheetValue, sheetLabel, sheetGroups, filterSheetGroups, SheetFrame, SheetList, SheetRow, SheetEmpty });
})(); } catch (e) { __dsError("components/inputs/SheetParts.jsx", e); }

// components/inputs/SelectSheet.jsx
try { (() => {
const { GroupHeader, SheetFrame, SheetList, SheetRow, SheetEmpty, sheetGroups, filterSheetGroups, sheetValue, sheetLabel, SHEET_GROUP_LABEL, SHEET_ICON } = __ds_scope;
// Single-select bottom sheet. Source: TeamXP templates/Dropdowns/Single select (Select site, Select service,
// Shift reminder; half and full sheet). Tapping a row commits it and closes the sheet: there is no Done.
// Group names are bold and line up with the list box's left edge, with a small light chevron, as in the app (review line 88).
// noneOption (Nov 10, incident reporting request line 7; optional, off by default): a label such as "No checkpoint", shown first
// on its own with no group header, ticked when value is empty; picking it calls onChange(null). Only sheets where "none" is a
// valid answer pass it (Checkpoint); sheets with a mandatory value (Site, Service) never do. Searching hides it unless it matches.
function SelectSheet({ title, options, groups, value, onChange, onClose, size = 'full', scrim = true, searchable = true, searchPlaceholder = 'Search', closeOnSelect = true, homeIndicator = true, noneOption, style }) {
  const [query, setQuery] = React.useState('');
  const [closed, setClosed] = React.useState({});
  const all = sheetGroups(groups, options);
  const shown = filterSheetGroups(all, query);
  const pick = o => { if (onChange) onChange(sheetValue(o)); if (closeOnSelect && onClose) onClose(); };
  const grouped = !!(groups && groups.length);
  const empty = value == null || value === '';
  const showNone = !!noneOption && (!query || String(noneOption).toLowerCase().includes(query.trim().toLowerCase()));
  const none = showNone ? React.createElement(SheetList, { key: '__none', gutter: 15 }, React.createElement(SheetRow, { label: noneOption, selected: empty, last: true, onSelect: () => { if (onChange) onChange(null); if (closeOnSelect && onClose) onClose(); } })) : null;
  return React.createElement(SheetFrame, { title, size, scrim, onClose, searchable, searchPlaceholder, query, onQuery: setQuery, gutter: 15, homeIndicator, style },
    none,
    shown.length === 0 ? (none ? null : React.createElement(SheetEmpty, { query })) :
    shown.map(g => {
      const open = query ? true : !closed[g.key];
      return React.createElement(React.Fragment, { key: g.key },
        grouped ? React.createElement(GroupHeader, { label: g.label, open, onToggle: () => setClosed({ ...closed, [g.key]: open }), inset: false, labelStyle: SHEET_GROUP_LABEL, chevronColor: SHEET_ICON, chevronSize: 12, style: { background: 'transparent', paddingLeft: 15, gap: 0 } }) : null,
        open ? React.createElement(SheetList, { gutter: 15 }, g.options.map((o, i) =>
          React.createElement(SheetRow, { key: String(sheetValue(o)), label: sheetLabel(o), selected: sheetValue(o) === value, last: i === g.options.length - 1, onSelect: () => pick(o) }))) : null);
    }));
}
Object.assign(__ds_scope, { SelectSheet });
})(); } catch (e) { __dsError("components/inputs/SelectSheet.jsx", e); }

// components/feedback/EmptyState.jsx
try { (() => {
const { Icon } = __ds_scope;
// Source: Feedback messages/no data empty states/common empty state | empty state w multiple actions (Dashboard, Action needed).
// 20px side padding; 14px Light #000 message centred (lh 21) 25px from the top; actions row 20px below it, each an 80px white disc
// A \n in an action label breaks it onto two lines (Review my\nschedule).
// (1px #d2d2d2 ring, 0 0 5 -1 glow) holding a 36px #676767 glyph (Regular unless the action sets variant: the Dashboard's
// Review my schedule and Create unscheduled shift are Solid in Sketch, Contact supervisor Regular), with a 14px Regular #333 label 12px under the disc.
function EmptyState({ message, actions = [], style }) {
  return React.createElement('div', { style: { padding: '25px 20px', fontFamily: 'var(--font-body)', textAlign: 'center', ...style } },
    message ? React.createElement('div', { style: { fontWeight: 300, fontSize: 14, lineHeight: '21px', color: '#000' } }, message) : null,
    actions.length ? React.createElement('div', { style: { display: 'flex', justifyContent: 'center', marginTop: 20 } }, actions.map((a, i) => React.createElement('button', { key: i, type: 'button', onClick: a.onClick, style: { flex: '1 1 0', maxWidth: actions.length > 2 ? 121 : 181, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, border: 'none', background: 'transparent', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-body)' } },
      React.createElement('span', { style: { width: 80, height: 80, borderRadius: '50%', background: '#fff', boxShadow: 'inset 0 0 0 1px var(--cx-mono-40), var(--shadow-pressed)', display: 'flex', alignItems: 'center', justifyContent: 'center' } }, React.createElement(Icon, { name: a.icon, variant: a.variant || 'regular', size: 36, color: 'var(--cx-mono-80)' })),
      React.createElement('span', { style: { fontWeight: 400, fontSize: 14, lineHeight: '16px', color: 'var(--cx-mono-90)', whiteSpace: 'pre-line' } }, a.label)))) : null);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __dsError("components/feedback/EmptyState.jsx", e); }

// components/navigation/SubHeader.jsx
try { (() => {
const { IconButton } = __ds_scope;
// Source: Mobile components/Headers/page header/Sub-header (Tour completed, Tour details, Checkpoint details). 78px on the page cream, no border,
// under the PageHeader: 18px Regular #000 title and a 14px Light #000 line 5px under it (lh 21), centred; optional 40px icon cells at either side.
function SubHeader({ title, subtitle, leftIcon, onLeft, rightIcon, onRight, style }) {
  const cell = (icon, on) => React.createElement('div', { style: { width: 40, flex: 'none', display: 'flex', justifyContent: 'center' } }, icon ? React.createElement(IconButton, { icon, onClick: on, iconSize: 18 }) : null);
  return React.createElement('div', { style: { display: 'flex', alignItems: 'center', minHeight: 78, padding: '0 0', background: 'var(--cx-bg)', fontFamily: 'var(--font-body)', ...style } },
    cell(leftIcon, onLeft),
    React.createElement('div', { style: { flex: 1, minWidth: 0, textAlign: 'center', padding: '16px 12px' } },
      React.createElement('div', { style: { fontWeight: 400, fontSize: 18, lineHeight: '21px', color: '#000' } }, title),
      subtitle ? React.createElement('div', { style: { marginTop: 5, fontWeight: 300, fontSize: 14, lineHeight: '21px', color: '#000' } }, subtitle) : null),
    cell(rightIcon, onRight));
}
Object.assign(__ds_scope, { SubHeader });
})(); } catch (e) { __dsError("components/navigation/SubHeader.jsx", e); }

// components/buttons/ShiftActions.jsx
try { (() => {
const { SlideButton } = __ds_scope;
// The slide buttons on Shift details, for the stage the shift is in (review section 19, corrected by Lana Oct 28).
// notOpen: nothing (the check-in window hasn't opened) · checkIn: Check in · onShift: Start break, Safety check, Check out ·
// onBreak: End break, Safety check, Check out (the break slider stays on top and turns into End break) · checkedOut: nothing.
// Each slide shows its done pill for confirmFor ms, then moves on. Safety check can be done any number of times.
// With onCheckout, the check-out questions come first: call confirm() when the employee continues (then "Checked out" shows
// and the sliders go), or cancel() to put the slider back.
// disabled: the Check in slider shows but can't be used (unscheduled shift before Site and Service are picked, line 122).
// The Acknowledge slider is not part of this: it shows on its own, before the shift's date (SlideButton action="acknowledge").
function ShiftActions({ stage = 'checkIn', disabled = false, confirmFor = 1500, width = 282, onStageChange, onCheckout, style }) {
  const [s, setS] = React.useState(stage);
  const [round, setRound] = React.useState(0);
  const [leaving, setLeaving] = React.useState(false);
  React.useEffect(() => { setS(stage); setLeaving(false); }, [stage]);
  const go = next => { setS(next); setLeaving(false); if (onStageChange) onStageChange(next); };
  React.useEffect(() => {
    if (!leaving) return undefined;
    const t = setTimeout(() => go('checkedOut'), confirmFor);
    return () => clearTimeout(t);
  }, [leaving]);
  const slide = (key, props) => React.createElement(SlideButton, { key, width, confirmFor, ...props });
  let items = [];
  if (s === 'checkIn') items = [slide('checkin', { action: 'checkin', disabled, onConfirmed: () => go('onShift') })];
  if (s === 'onShift' || s === 'onBreak') items = [
    s === 'onShift' ? slide('break', { action: 'break', onConfirmed: () => go('onBreak') }) : slide('endbreak', { action: 'endbreak', onConfirmed: () => go('onShift') }),
    slide('safety', { action: 'safety' }),
    onCheckout
      ? slide('checkout' + round, { action: 'checkout', confirmFor: null, onComplete: () => onCheckout({ confirm: () => setLeaving(true), cancel: () => setRound(round + 1) }) })
      : slide('checkout', { action: 'checkout', onConfirmed: () => go('checkedOut') })
  ];
  if (!items.length) return null;
  return React.createElement('div', { style: { display: 'grid', gap: 8, justifyContent: 'center', ...style } }, items);
}
Object.assign(__ds_scope, { ShiftActions });
})(); } catch (e) { __dsError("components/buttons/ShiftActions.jsx", e); }


















// components/inputs/ActionSheet.jsx
try { (() => {
const { Icon, SheetFrame } = __ds_scope;
// Action sheet: "Start an action" (Nov 10, incident reporting request line 1; hand-built on the incident reporting canvas, Report
// actions board). On SheetFrame without search and as tall as its content: scrim, cream sheet, grip strip, 56px header with Close
// on the left and the bold title centred. Under it, 14px top and 15px side padding; cards 10px apart, white, 1px
// --cx-subtle-border, 8px corners, at least 66px tall, a 36px icon disc 12px from a 14px Medium label.
// actions: [{ icon, label, iconBg, iconColor, iconVariant, onClick }]; a card calls its onClick. Close, a tap on the scrim or Escape
// calls onClose.
function ActionSheet({ title, actions = [], onClose, scrim = true, homeIndicator = true, style }) {
  React.useEffect(() => {
    if (!onClose) return undefined;
    const k = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  }, [onClose]);
  return React.createElement(SheetFrame, { title, size: 'auto', scrim, onClose, searchable: false, homeIndicator, bodyRole: 'group', bodyStyle: { paddingTop: 14 }, style },
    React.createElement('div', { style: { padding: '0 15px', display: 'grid', gap: 10 } },
      actions.map((a, i) => React.createElement('button', { key: a.label || i, type: 'button', onClick: a.onClick, style: { display: 'flex', alignItems: 'center', gap: 12, width: '100%', minHeight: 66, padding: '5px 15px', boxSizing: 'border-box', textAlign: 'left', border: '1px solid var(--cx-subtle-border)', borderRadius: 8, background: '#fff', fontFamily: 'var(--font-body)', cursor: 'pointer' } },
        React.createElement('span', { style: { width: 36, height: 36, flex: 'none', borderRadius: '50%', background: a.iconBg || 'var(--cx-mono-20)', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(Icon, { name: a.icon, variant: a.iconVariant || 'auto', size: 14, color: a.iconColor || 'var(--cx-mono-80)' })),
        React.createElement('span', { style: { flex: 1, minWidth: 0, padding: '8px 0', fontWeight: 500, fontSize: 14, lineHeight: '19px', color: 'var(--cx-mono-90)' } }, a.label)))));
}
Object.assign(__ds_scope, { ActionSheet });
})(); } catch (e) { __dsError("components/inputs/ActionSheet.jsx", e); }

// components/lists/ReportCard.jsx
try { (() => {
const { Icon, StatusPill } = __ds_scope;
// Report card (Nov 10, incident reporting request line 2; Report history and Shift reports). The whole card is one button: white,
// 1px --cx-subtle-border, 8px corners, 14px padding. Top row: StatusPills (wrapping, 6px apart) on the left, the time (12px
// Light, --cx-mono-80) on the right. Optional title, 14px Medium with a 12px angle-right; text 14px Light black, at most 2 lines;
// meta 12px --cx-mono-80, 10px below. pills: StatusPill props ({ status } or { label, tone, icon }), e.g. [{ status: 'queued' }].
function ReportCard({ pills = [], time, title, text, meta, onClick, style }) {
  return React.createElement('button', { type: 'button', onClick, style: { display: 'block', width: '100%', background: '#fff', borderRadius: 8, border: '1px solid var(--cx-subtle-border)', padding: 14, boxSizing: 'border-box', textAlign: 'left', fontFamily: 'var(--font-body)', cursor: onClick ? 'pointer' : 'default', ...style } },
    React.createElement('span', { style: { display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 12 } },
      React.createElement('span', { style: { flex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 } }, pills.map((p, i) => React.createElement(StatusPill, { key: i, icon: p.status ? undefined : (p.icon || null), ...p }))),
      time ? React.createElement('span', { style: { flex: 'none', fontWeight: 300, fontSize: 12, lineHeight: '24px', color: 'var(--cx-mono-80)' } }, time) : null),
    title ? React.createElement('span', { style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, fontWeight: 500, fontSize: 14, lineHeight: '16px', letterSpacing: '0.3px', color: 'var(--cx-mono-90)' } }, title, React.createElement(Icon, { name: 'angle-right', size: 12, color: 'var(--cx-mono-80)' })) : null,
    text ? React.createElement('span', { style: { fontWeight: 300, fontSize: 14, lineHeight: '20px', color: '#000', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } }, text) : null,
    meta ? React.createElement('span', { style: { display: 'block', marginTop: 10, fontWeight: 400, fontSize: 12, lineHeight: '16px', color: 'var(--cx-mono-80)' } }, meta) : null);
}
Object.assign(__ds_scope, { ReportCard });
})(); } catch (e) { __dsError("components/lists/ReportCard.jsx", e); }

// components/inputs/AttachmentGrid.jsx
try { (() => {
const { Icon, AttachmentThumb } = __ds_scope;
// Attachment grid (Nov 10, incident reporting request line 6; Adding a report). The label (14px Medium) on the left and
// "N of max attachments" (12px Light) on the right; a 4-across grid, 12px gaps, that starts with a dashed Add tile (8px corners,
// plus icon, "Add") and then the AttachmentThumbs with remove. The Add tile hides once max is reached.
// items: [{ src, alt }]. onAdd(event) — the event's currentTarget is the Add tile, to place a menu under it; onRemove(index); onOpen(index).
// When the Add tile opens an AttachMenu (request lines 24 and 25), pass menuOpen (and the menu's id as menuId): the tile then tells
// screen readers it opens a menu (aria-haspopup) and whether that menu is open (aria-expanded). addRef reaches the tile, as
// the menu's anchor.
function AttachmentGrid({ label = 'Photos and videos', items = [], max = 20, onAdd, onRemove, onOpen, menuOpen, menuId, addRef, style }) {
  const full = items.length >= max;
  const hasMenu = menuOpen !== undefined;
  return React.createElement('div', { style: { fontFamily: 'var(--font-body)', ...style } },
    React.createElement('div', { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 } },
      React.createElement('span', { style: { fontWeight: 500, fontSize: 14, lineHeight: '18px', color: '#000' } }, label),
      React.createElement('span', { style: { fontWeight: 300, fontSize: 12, lineHeight: '16px', color: '#000' } }, items.length + ' of ' + max + ' attachments')),
    React.createElement('div', { style: { position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12, marginTop: 10 } },
      full ? null : React.createElement('div', { style: { position: 'relative', aspectRatio: '1' } },
        React.createElement('button', { ref: addRef, type: 'button', 'aria-label': 'Add ' + String(label).toLowerCase(), 'aria-haspopup': hasMenu ? 'menu' : undefined, 'aria-expanded': hasMenu ? !!menuOpen : undefined, 'aria-controls': hasMenu && menuOpen && menuId ? menuId : undefined, onClick: onAdd, style: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, position: 'relative', border: 'none', borderRadius: 8, background: 'transparent', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 12, lineHeight: '14px', color: 'var(--cx-mono-80)' } },
          React.createElement('svg', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' } },
            React.createElement('rect', { x: 0.75, y: 0.75, rx: 8, style: { width: 'calc(100% - 1.5px)', height: 'calc(100% - 1.5px)' }, fill: 'none', stroke: 'var(--cx-mono-80)', strokeWidth: 1.5, strokeDasharray: '6 4' })),
          React.createElement(Icon, { name: 'plus', size: 18, color: 'var(--cx-mono-80)' }), 'Add')),
      items.map((it, i) => React.createElement('div', { key: (it.src || '') + i, role: onOpen ? 'button' : undefined, tabIndex: onOpen ? 0 : undefined, 'aria-label': it.alt || undefined, onClick: onOpen ? () => onOpen(i) : undefined, style: { cursor: onOpen ? 'zoom-in' : 'default' } },
        React.createElement(AttachmentThumb, { src: it.src, onRemove: onRemove ? e => { if (e && e.stopPropagation) e.stopPropagation(); onRemove(i); } : undefined, style: { width: '100%', height: 'auto', aspectRatio: '1' } })))));
}
Object.assign(__ds_scope, { AttachmentGrid });
})(); } catch (e) { __dsError("components/inputs/AttachmentGrid.jsx", e); }

// components/inputs/AttachMenu.jsx
try { (() => {
const { Icon } = __ds_scope;
// Attach menu (incident reporting request lines 16 and 25; Attach menu board). The menu that opens from the Add tile of an
// AttachmentGrid: one 48px row per choice, label on the left and a Regular icon on the right, in black. As on the canvas: 250px
// wide, 13px corners, near-white fill with a soft shadow, rows 16px from the edges, 17px labels, thin dividers.
// Render it at screen level (a sibling of the scrolling body, inside the phone screen), not inside the grid, so the scroll area
// doesn't clip it and it sits above the footer. It places itself under `anchor` (the Add tile), 8px away, and opens above the
// anchor when there isn't room below. A tap outside, Escape or Tab calls onClose; picking a row calls onSelect(key) then onClose.
// Opening moves focus to the first row (arrow keys move between rows); closing returns focus to the anchor.
// anchor: the Add tile element, or a ref to it (AttachmentGrid's addRef, or onAdd's event.currentTarget).
const DEFAULT_ITEMS = [
  { key: 'photo', label: 'Take Photo', icon: 'camera' },
  { key: 'video', label: 'Record Video', icon: 'video' },
  { key: 'library', label: 'Choose Photo or Video', icon: 'image' },
];

function AttachMenu({ open, anchor, items = DEFAULT_ITEMS, onSelect, onClose, label = 'Attach', id, gap = 8, margin = 24, style }) {
  const autoId = React.useId();
  const menuId = id || 'attach-menu-' + autoId.replace(/:/g, '');
  const menuRef = React.useRef(null);
  const [pos, setPos] = React.useState(null);
  const anchorEl = () => (anchor && 'current' in anchor ? anchor.current : anchor) || null;

  React.useLayoutEffect(() => {
    if (!open) { setPos(null); return undefined; }
    const place = () => {
      const menu = menuRef.current, a = anchorEl();
      const parent = menu && menu.offsetParent;
      if (!menu || !a || !parent) return;
      const pr = parent.getBoundingClientRect(), ar = a.getBoundingClientRect();
      const k = pr.width / (parent.offsetWidth || pr.width || 1) || 1; // the phone may be scaled
      const H = menu.offsetHeight, W = menu.offsetWidth;
      let left = (ar.left - pr.left) / k;
      let top = (ar.bottom - pr.top) / k + gap;
      if (top + H > parent.clientHeight - margin) top = (ar.top - pr.top) / k - gap - H;
      left = Math.max(16, Math.min(left, parent.clientWidth - W - 16));
      setPos({ left: Math.round(left), top: Math.round(Math.max(margin, top)) });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [open, anchor]);

  // Focus the first row once placed; give focus back to the anchor when the menu closes.
  React.useEffect(() => {
    if (!open || !pos || !menuRef.current) return undefined;
    const first = menuRef.current.querySelector('[role="menuitem"]');
    if (first && !menuRef.current.contains(document.activeElement)) first.focus({ preventScroll: true });
    return undefined;
  }, [open, pos]);
  React.useEffect(() => {
    if (!open) return undefined;
    return () => {
      const a = anchorEl();
      if (a && a.isConnected && (!document.activeElement || document.activeElement === document.body || (menuRef.current && menuRef.current.contains(document.activeElement)))) a.focus({ preventScroll: true });
    };
  }, [open]);

  if (!open) return null;
  const rows = () => Array.from(menuRef.current ? menuRef.current.querySelectorAll('[role="menuitem"]') : []);
  const onKeyDown = e => {
    const list = rows(), i = list.indexOf(document.activeElement);
    if (e.key === 'Escape' || e.key === 'Tab') { e.preventDefault(); if (onClose) onClose(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1) % list.length].focus(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
    else if (e.key === 'Home') { e.preventDefault(); list[0].focus(); }
    else if (e.key === 'End') { e.preventDefault(); list[list.length - 1].focus(); }
  };
  const pick = it => { if (it.onClick) it.onClick(); if (onSelect) onSelect(it.key, it); if (onClose) onClose(); };
  return React.createElement(React.Fragment, null,
    React.createElement('div', { 'aria-hidden': true, onClick: onClose, style: { position: 'absolute', inset: 0, zIndex: 40 } }),
    React.createElement('div', { ref: menuRef, id: menuId, role: 'menu', 'aria-label': label, onKeyDown, style: { position: 'absolute', left: pos ? pos.left : 0, top: pos ? pos.top : 0, visibility: pos ? 'visible' : 'hidden', zIndex: 41, width: 250, borderRadius: 13, overflow: 'hidden', background: 'rgba(249,249,249,0.97)', boxShadow: '0 10px 38px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(0,0,0,0.08)', ...style } },
      items.map((it, i) => React.createElement('button', { key: it.key || i, type: 'button', role: 'menuitem', tabIndex: -1, onClick: () => pick(it), style: { width: '100%', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '0 16px', border: 'none', borderBottom: i < items.length - 1 ? '0.5px solid rgba(60,60,67,0.29)' : 'none', background: 'transparent', fontFamily: '-apple-system, var(--font-body)', fontSize: 17, lineHeight: '22px', color: '#000', textAlign: 'left', cursor: 'pointer' } },
        it.label,
        it.icon ? React.createElement(Icon, { name: it.icon, variant: 'regular', size: 18, color: '#000' }) : null))));
}
Object.assign(__ds_scope, { AttachMenu });
})(); } catch (e) { __dsError("components/inputs/AttachMenu.jsx", e); }

// components/prototyping/Keyboard.jsx
try { (() => {
const { Icon } = __ds_scope;
// Keyboard (prototype only; incident reporting request lines 14 and 23). The phone's own keyboard, drawn so a typing screen
// looks real. It is not TeamXP: the phone draws it. Only return (onReturn) and the microphone (onDictate) react; the microphone
// turns orange on white while dictating. It ends with the home indicator, so it takes that strip's place at the bottom of the phone.
function Keyboard({ onReturn, onDictate, dictating = false, style }) {
  const h = React.createElement;
  const key = (c, extra) => h('span', { key: c, 'aria-hidden': true, style: { background: '#fff', borderRadius: 5, height: 42, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 0 rgba(0,0,0,0.3)', fontWeight: 300, fontSize: 20, color: '#000', ...extra } }, c);
  const mod = (c, flex) => key(c, { background: '#a7a7a7', fontWeight: 400, fontSize: 15, flex });
  const row = (keys, extra) => h('div', { style: { display: 'flex', gap: 6, marginBottom: 11, ...extra } }, keys);
  const on = !!dictating;
  return h('div', { role: 'group', 'aria-label': 'Keyboard', style: { flex: 'none', background: '#d2d2d2', padding: '8px 4px 0', fontFamily: 'var(--font-body)', ...style } },
    row('qwertyuiop'.split('').map(c => key(c))),
    row('asdfghjkl'.split('').map(c => key(c)), { padding: '0 18px' }),
    row([mod('⇧', 1.4), ...'zxcvbnm'.split('').map(c => key(c)), mod('⌫', 1.4)]),
    h('div', { style: { display: 'flex', gap: 6, marginBottom: 6 } }, mod('123', 1.6), key('space', { flex: 5, fontSize: 16 }),
      h('button', { type: 'button', onClick: onReturn, style: { background: '#a7a7a7', borderRadius: 5, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 0 rgba(0,0,0,0.3)', fontWeight: 400, fontSize: 15, color: '#000', flex: 2, border: 'none', padding: 0, fontFamily: 'var(--font-body)', cursor: 'pointer' } }, 'return')),
    h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', height: 44 } },
      h('span', { 'aria-hidden': true, style: { width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' } }, h(Icon, { name: 'face-smile', variant: 'regular', size: 20, color: '#676767' })),
      h('button', { type: 'button', 'aria-label': 'Dictate', 'aria-pressed': on, onClick: onDictate, style: { width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: 8, background: on ? '#fff' : 'transparent', padding: 0, cursor: 'pointer' } }, h(Icon, { name: 'microphone', variant: 'regular', size: 20, color: on ? 'var(--cx-primary)' : '#676767' }))),
    h('div', { style: { height: 22, position: 'relative' } }, h('div', { style: { position: 'absolute', left: '50%', bottom: 8, marginLeft: -60, width: 120, height: 4, borderRadius: 3, background: '#000' } })));
}
Object.assign(__ds_scope, { Keyboard });
})(); } catch (e) { __dsError("components/prototyping/Keyboard.jsx", e); }

// components/prototyping/PrototypeControl.jsx
try { (() => {
const { Icon } = __ds_scope;
// PrototypeControl (prototype only; incident reporting request lines 15 and 23). A control that exists only in the prototype,
// such as Simulate sync or Reset prototype. Dashed and monochrome, with a "Prototype only" title, so nobody mistakes it for
// TeamXP: 1px dashed --cx-mono-80 border, 8px corners, 10px by 12px padding; the title and a line of text on the left and an
// outlined pill button on the right (32px tall, inside a 44px tap area).
function PrototypeControl({ title = 'Prototype only', text, action, actionIcon, onAction, style }) {
  const h = React.createElement;
  return h('div', { role: 'group', 'aria-label': title, style: { flex: 'none', padding: '10px 12px', border: '1px dashed var(--cx-mono-80)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-body)', ...style } },
    h('span', { style: { flex: 1, minWidth: 0 } },
      h('span', { style: { display: 'block', fontWeight: 500, fontSize: 11, lineHeight: '14px', letterSpacing: '0.6px', textTransform: 'uppercase', color: 'var(--cx-mono-80)' } }, title),
      text ? h('span', { style: { display: 'block', marginTop: 2, fontWeight: 300, fontSize: 12, lineHeight: '16px', color: '#000' } }, text) : null),
    action ? h('button', { type: 'button', onClick: onAction, style: { flex: 'none', display: 'flex', alignItems: 'center', height: 44, padding: 0, margin: '-6px 0', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-body)' } },
      h('span', { style: { display: 'flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', border: '1px solid var(--cx-mono-80)', borderRadius: 16, boxSizing: 'border-box', fontWeight: 400, fontSize: 13, color: '#000' } },
        actionIcon ? h(Icon, { name: actionIcon, size: 12, color: '#000' }) : null, action)) : null);
}
Object.assign(__ds_scope, { PrototypeControl });
})(); } catch (e) { __dsError("components/prototyping/PrototypeControl.jsx", e); }

// components/lists/FileRow.jsx
try { (() => {
const { Icon } = __ds_scope;
// Source: Mobile components/lists/Detailed/List item w details and color (Add note with file attachments). 51px row:
// 32px icon column 14px from the left with a 20px #676767 file glyph, 14px Light #000 name (lh 20) at 58px, 16px #333 xmark in a 44px cell at the right.
// Rows sit in a ListContainer, divided by its hairline.
const KIND = { doc: 'file-word', pdf: 'file-pdf', video: 'video', image: 'image', file: 'file' };
function FileRow({ name, kind = 'file', icon, onRemove, divider = true, style }) {
  return React.createElement('div', { style: { display: 'flex', alignItems: 'center', minHeight: 51, paddingLeft: 14, boxSizing: 'border-box', borderBottom: divider ? '1px solid var(--cx-mono-30)' : 'none', fontFamily: 'var(--font-body)', ...style } },
    React.createElement('div', { style: { width: 32, flex: 'none', display: 'flex', justifyContent: 'center' } }, React.createElement(Icon, { name: icon || KIND[kind] || 'file', variant: 'light', size: 20, color: 'var(--cx-mono-80)' })),
    React.createElement('div', { style: { flex: 1, minWidth: 0, marginLeft: 12, fontWeight: 300, fontSize: 14, lineHeight: '20px', color: '#000', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, name),
    onRemove ? React.createElement('button', { type: 'button', 'aria-label': 'Remove ' + name, onClick: onRemove, style: { width: 44, height: 44, border: 'none', background: 'transparent', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' } }, React.createElement(Icon, { name: 'xmark', variant: 'light', size: 16, color: 'var(--cx-mono-90)' })) : null);
}
Object.assign(__ds_scope, { FileRow });
})(); } catch (e) { __dsError("components/lists/FileRow.jsx", e); }

export const { ActionSheet, FileRow, AttachMenu, AttachmentGrid, AttachmentThumb, Badge, BottomNav, Button, CheckpointRow, DateHeader, EmptyState, FooterActions, FormField, GroupHeader, IconButton, InfoCard, InlineNotice, Keyboard, ListContainer, ListRow, NAV_ITEMS, PageHeader, ProgressBar, PrototypeControl, ReportCard, RequirementCard, SHEET_GROUP_LABEL, SHEET_ICON, STATUS_PRESETS, SearchField, SectionHeader, Select, SelectSheet, SheetEmpty, SheetFrame, SheetList, SheetRow, ShiftActions, ShiftCard, SlideButton, StatusBar, StatusPill, SubHeader, SubTabs, TabRibbon, TextArea, Toast, Toggle, TourCard, filterSheetGroups, sheetGroups, sheetLabel, sheetValue } = __ds_scope
export { Icon }
