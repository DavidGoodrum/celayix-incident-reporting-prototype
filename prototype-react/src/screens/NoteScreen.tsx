import { StatusBar } from '../components/StatusBar'
import { CheckIcon, PlusIcon } from '../components/Icons'
import type { PrototypeApi } from '../state'

const KEY_ROW_1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
const KEY_ROW_2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
const KEY_ROW_3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm']

function Key({ children, wide }: { children: React.ReactNode; wide?: number }) {
  return (
    <span
      className="bg-white rounded-[5px] h-[38px] flex items-center justify-center text-[17px] text-navy shadow-[0_1px_0_rgba(0,0,0,.25)]"
      style={{ flex: wide ?? 1, background: wide ? '#d2d2d2' : '#fff', fontSize: wide ? 14 : undefined }}
    >
      {children}
    </span>
  )
}

export function NoteScreen({ api }: { api: PrototypeApi }) {
  const { state, actions, ctx } = api
  const composeTitle = state.composeMode === 'followup' ? 'Add follow-up' : 'New incident'
  const canSubmit = !!state.noteText.trim()
  const showKeyboard = state.keyboardOpen && state.screen === 'note' && !state.attachSheetOpen

  return (
    <>
      <StatusBar time="4:12" color="#000000" bg="#fcfbf8" />
      <div className="h-[52px] flex-none flex items-center gap-3.5 px-5 bg-[#fcfbf8] relative">
        <span className="cursor-pointer active:opacity-70" onClick={() => actions.goTo(state.prevScreen)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </span>
        <span className="absolute inset-0 flex items-center justify-center font-bold text-[17px] text-navy pointer-events-none">
          {composeTitle}
        </span>
        <span className="flex-1" />
        <span className="w-[22px] flex-none" />
      </div>
      <div
        className="px-5 py-2.5 flex items-center gap-2 border-b border-[#e7e0d9] flex-none bg-[#fcfbf8] cursor-pointer active:opacity-70"
        onClick={actions.openDetails}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#676767" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="flex-none">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="flex-1 min-w-0">
          <span className="block text-[13.5px] text-ink">{ctx.line1}</span>
          <span className="block text-[12.5px] text-muted mt-0.5">{ctx.line2}</span>
        </span>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8f8f8f" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="flex-none">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>
      <div className="px-5 pt-3.5 bg-[#fcfbf8] flex-1">
        <textarea
          className="border-none outline-none resize-none bg-transparent w-full text-[17px] leading-[1.55] text-navy p-0 font-sans placeholder:text-[#8f8f8f]"
          placeholder="What happened?"
          value={state.noteText}
          onChange={(e) => actions.onNoteInput(e.target.value)}
          onFocus={actions.showKeyboard}
          rows={4}
        />
      </div>
      <div className="pl-5 flex gap-2 overflow-x-auto bg-[#fcfbf8] flex-none">
        {state.attachments.map((_, i) => (
          <span
            key={i}
            className="relative flex-none w-[78px] h-[78px] rounded-lg bg-[#eeeeee] border border-[#e7e0d9] flex items-center justify-center"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#676767" strokeWidth={1.6}>
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="m3 16 5-4 4 3 3-2 6 5" />
            </svg>
            <span
              className="absolute -top-1.5 -right-1.5 w-[22px] h-[22px] rounded-full bg-navy text-white flex items-center justify-center font-bold text-[13px] cursor-pointer active:opacity-70"
              onClick={() => actions.removeAttachment(i)}
            >
              ×
            </span>
          </span>
        ))}
        <span
          className="flex-none w-[78px] h-[78px] rounded-lg border-[1.5px] border-dashed border-[#a7a7a7] flex flex-col items-center justify-center gap-1.5 mr-5 cursor-pointer active:opacity-70"
          onClick={actions.openAttachSheet}
        >
          <PlusIcon />
          <span className="font-bold text-xs text-ink">Add</span>
        </span>
      </div>
      <div className="px-5 pt-2.5 text-[13px] text-ink bg-[#fcfbf8] flex-none">
        {state.attachments.length} of 20 attachments
      </div>
      <div className="flex items-center gap-3 px-5 py-2.5 border-t border-[#e7e0d9] flex-none cursor-pointer" onClick={actions.toggleAttention}>
        <span
          className="w-6 h-6 rounded-[5px] flex items-center justify-center flex-none border"
          style={{ background: state.requiresAttention ? '#e96c24' : '#fff', borderColor: state.requiresAttention ? '#e96c24' : '#a7a7a7' }}
        >
          {state.requiresAttention && <CheckIcon />}
        </span>
        <span className="flex-1 text-[15.5px] text-navy">Notify supervisor now</span>
      </div>
      <div className="flex gap-2.5 px-4 py-2.5 border-t border-[#e7e0d9] bg-white flex-none">
        <span
          className="flex-1 h-11 rounded-lg flex items-center justify-center font-bold text-[16px] border border-[#a7a7a7] bg-white text-navy cursor-pointer active:opacity-70 shadow-[0_0_4px_rgba(0,0,0,.3)]"
          onClick={() => actions.goTo(state.prevScreen)}
        >
          Cancel
        </span>
        <span
          className="flex-1 h-11 rounded-lg flex items-center justify-center font-bold text-[16px] text-white cursor-pointer active:opacity-70 shadow-[0_0_4px_rgba(0,0,0,.3)]"
          style={{ background: canSubmit ? '#e96c24' : '#a7a7a7' }}
          onClick={actions.submitReport}
        >
          Save
        </span>
      </div>

      {showKeyboard && (
        <div className="bg-[#d2d2d2] pt-2.5 px-1.5 flex-none">
          <div className="flex gap-1.5 mb-2.5">
            {KEY_ROW_1.map((k) => (
              <Key key={k}>{k}</Key>
            ))}
          </div>
          <div className="flex gap-1.5 mb-2.5 px-[18px]">
            {KEY_ROW_2.map((k) => (
              <Key key={k}>{k}</Key>
            ))}
          </div>
          <div className="flex gap-1.5 mb-2.5">
            <Key wide={1.4}>⇧</Key>
            {KEY_ROW_3.map((k) => (
              <Key key={k}>{k}</Key>
            ))}
            <Key wide={1.4}>⌫</Key>
          </div>
          <div className="flex gap-1.5 mb-2.5">
            <Key wide={1.6}>123</Key>
            <span className="flex-[5] bg-white rounded-[5px] h-[38px] flex items-center justify-center text-[17px] text-navy shadow-[0_1px_0_rgba(0,0,0,.25)]">
              space
            </span>
            <span
              className="flex-[2] bg-[#d2d2d2] rounded-[5px] h-[38px] flex items-center justify-center text-[15px] text-navy shadow-[0_1px_0_rgba(0,0,0,.25)] cursor-pointer active:opacity-70"
              onClick={actions.hideKeyboard}
            >
              return
            </span>
          </div>
          <div className="flex items-center justify-between px-1.5 pb-0.5 mb-1.5">
            <span className="w-[34px] h-[30px] flex items-center justify-center">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M8.5 14.5a4.5 4.5 0 0 0 7 0" />
                <path d="M9 9.5h.01M15 9.5h.01" />
              </svg>
            </span>
            <span className="w-[34px] h-[30px] rounded-md flex items-center justify-center cursor-pointer active:bg-[#d2d2d2]" onClick={actions.dictate}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={state.dictating ? '#e96c24' : '#333333'} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0" />
                <path d="M12 18v4" />
              </svg>
            </span>
          </div>
          <div className="h-[22px] flex items-center justify-center">
            <span className="w-[132px] h-[5px] rounded-[3px] bg-navy" />
          </div>
        </div>
      )}

      {state.attachSheetOpen && (
        <div className="absolute inset-0 bg-[rgba(120,118,112,.45)] flex flex-col justify-end px-2 pb-6">
          <div className="bg-[rgba(255,255,255,.96)] rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,.2)] overflow-hidden">
            <span
              className="flex items-center gap-4 px-5 py-[15px] border-b border-[rgba(60,60,67,.14)] text-[19px] text-[#007eb5] cursor-pointer active:opacity-70"
              onClick={actions.pickAttachment}
            >
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#007eb5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="flex-none">
                <path d="M14.5 4h-5L8 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              Take Photo
            </span>
            <span
              className="flex items-center gap-4 px-5 py-[15px] border-b border-[rgba(60,60,67,.14)] text-[19px] text-[#007eb5] cursor-pointer active:opacity-70"
              onClick={actions.pickAttachment}
            >
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#007eb5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="flex-none">
                <rect x="2" y="6" width="14" height="12" rx="2" />
                <path d="m16 11 6-4v10l-6-4z" />
              </svg>
              Record Video
            </span>
            <span
              className="flex items-center gap-4 px-5 py-[15px] text-[19px] text-[#007eb5] cursor-pointer active:opacity-70"
              onClick={actions.pickAttachment}
            >
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#007eb5" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="flex-none">
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="8.5" cy="9.5" r="1.5" />
                <path d="m3 16 5-4 4 3 3-2 6 5" />
              </svg>
              Choose Photo or Video
            </span>
          </div>
          <div
            className="bg-[rgba(255,255,255,.96)] rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,.2)] mt-2 py-[15px] px-5 text-center font-bold text-[19px] text-[#007eb5] cursor-pointer active:opacity-70"
            onClick={actions.closeAttachSheet}
          >
            Cancel
          </div>
        </div>
      )}
    </>
  )
}
