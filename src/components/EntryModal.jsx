import { useId, useState } from 'react'
import { ChevronLeft, PencilIcon } from './icons'
import { MoodFigure } from './MoodFigure'
import { MOODS } from '../content/moods'
import { compressImageToDataUrl } from '../utils/compressImage'
import { formatDateLongKO, toYMD } from '../utils/dates'
import { hasJournalEntryContent, journalKeyForDate, loadJournalEntry, saveJournalEntry } from '../utils/journalKeys'

/** @param {string} ymd */
function initialModalState(ymd) {
  const ex = loadJournalEntry(journalKeyForDate(ymd))
  if (hasJournalEntryContent(ex)) {
    return {
      step: 2,
      mood: ex.mood ?? null,
      photo: ex.photo ?? null,
      text: ex.text ?? '',
    }
  }
  return { step: 1, mood: null, photo: null, text: '' }
}

/**
 * Bottom sheet de entrada. Modo calendario: solo `onSave`, FAB interno. Modo controlado: `open`, `onOpenChange`, `dateYmd`, `onSaved`.
 * @param {{
 *   onSave?: () => void,
 *   dateYmd?: string,
 *   open?: boolean,
 *   onOpenChange?: (open: boolean) => void,
 *   onSaved?: () => void,
 * }} props
 */
export default function EntryModal({ onSave, dateYmd: dateYmdProp, open: openProp, onOpenChange, onSaved }) {
  const effectiveYmd = dateYmdProp ?? toYMD(new Date())
  const photoInputId = useId()
  const controlled = openProp !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlled ? openProp : internalOpen

  const [paso, setPaso] = useState(() => initialModalState(effectiveYmd).step)
  const [mood, setMood] = useState(() => initialModalState(effectiveYmd).mood)
  const [photo, setPhoto] = useState(() => initialModalState(effectiveYmd).photo)
  const [text, setText] = useState(() => initialModalState(effectiveYmd).text)

  function setOpen(v) {
    if (controlled) {
      onOpenChange?.(v)
    } else {
      setInternalOpen(v)
    }
  }

  function handleFabOpen() {
    const next = initialModalState(effectiveYmd)
    setPaso(next.step)
    setMood(next.mood)
    setPhoto(next.photo)
    setText(next.text)
    setOpen(true)
  }

  function close() {
    setOpen(false)
  }

  async function handlePhoto(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      setPhoto(await compressImageToDataUrl(file))
    } catch {
      /* ignore */
    }
  }

  function handleSave() {
    saveJournalEntry(journalKeyForDate(effectiveYmd), {
      date: effectiveYmd,
      mood,
      photo,
      text,
    })
    onSave?.()
    if (controlled) {
      onSaved?.()
    } else {
      setInternalOpen(false)
    }
  }

  const dateLine = formatDateLongKO(new Date(`${effectiveYmd}T12:00:00`))
  const moodLabel = MOODS.find((m) => m.id === mood)?.label_ko

  return (
    <>
      {!controlled ? (
        <button
          type="button"
          onClick={handleFabOpen}
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '24px',
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'var(--color-accent)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 150,
          }}
          aria-label="오늘 일기 쓰기"
        >
          <PencilIcon size={22} color="var(--color-surface)" />
        </button>
      ) : null}

      {open ? (
        <>
          <div
            role="presentation"
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(44,44,42,0.4)',
              zIndex: 400,
            }}
          />
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'var(--color-surface)',
              borderRadius: '16px 16px 0 0',
              padding: '24px 20px 40px',
              paddingTop: '32px',
              paddingBottom: 'calc(40px + env(safe-area-inset-bottom, 0px))',
              maxHeight: '95vh',
              minHeight: '75vh',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              zIndex: 401,
              boxSizing: 'border-box',
              maxWidth: '480px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '20px', flexShrink: 0 }} aria-hidden>
              {[1, 2].map((p) => (
                <div
                  key={p}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: paso === p ? 'var(--color-accent)' : 'var(--color-border)',
                  }}
                />
              ))}
            </div>

            {paso === 1 ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '4px', fontSize: '20px', fontWeight: 700 }}>
                  오늘의 기분은?
                </div>
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '13px',
                    color: 'var(--color-text-muted)',
                    marginBottom: '28px',
                  }}
                >
                  {dateLine}
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                    gap: '14px 12px',
                    padding: '0 4px',
                    justifyItems: 'center',
                    width: '100%',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                  }}
                >
                  {MOODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        setMood(m.id)
                        window.setTimeout(() => setPaso(2), 300)
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '50%',
                        outline: mood === m.id ? '2.5px solid var(--color-accent)' : 'none',
                        outlineOffset: '3px',
                        minWidth: 0,
                      }}
                    >
                      <MoodFigure id={m.id} size={64} />
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {paso === 2 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  minHeight: 0,
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr 40px',
                    alignItems: 'center',
                    marginBottom: '20px',
                    flexShrink: 0,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setPaso(1)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-text-muted)',
                      justifySelf: 'start',
                    }}
                    aria-label="이전"
                  >
                    <ChevronLeft size={24} color="var(--color-text-muted)" />
                  </button>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {mood ? <MoodFigure id={mood} size={48} /> : null}
                    <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>{moodLabel}</div>
                  </div>
                  <span aria-hidden />
                </div>

                {photo ? (
                  <div style={{ marginBottom: '12px', textAlign: 'center', flexShrink: 0 }}>
                    <img
                      src={photo}
                      style={{ maxWidth: '120px', borderRadius: '12px', border: '0.5px solid var(--color-border)' }}
                      alt=""
                    />
                  </div>
                ) : null}

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="오늘은 어땠어요?"
                  style={{
                    width: '100%',
                    flex: 1,
                    minHeight: '200px',
                    padding: '16px',
                    background: 'var(--color-bg)',
                    border: '0.5px solid var(--color-border)',
                    borderRadius: '10px',
                    fontSize: '17px',
                    resize: 'none',
                    fontFamily: 'inherit',
                    color: 'var(--color-text-body)',
                    outline: 'none',
                  }}
                />

                <label
                  htmlFor={photoInputId}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'var(--color-text-muted)',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '0.5px solid var(--color-border)',
                    background: 'var(--color-surface)',
                    flexShrink: 0,
                    alignSelf: 'flex-start',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 3l1-2h4l1 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  사진 추가
                  <input id={photoInputId} type="file" accept="image/*" hidden onChange={handlePhoto} />
                </label>

                <button
                  type="button"
                  onClick={handleSave}
                  style={{
                    marginTop: '16px',
                    width: '100%',
                    padding: '14px',
                    background: 'var(--color-accent)',
                    color: 'var(--color-surface)',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '17px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  저장하기
                </button>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  )
}
