import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import EntryModal from '../components/EntryModal'
import { PageBackBar } from '../components/PageBackBar'
import { MoodFigure } from '../components/MoodFigure'
import { compressImageToDataUrl } from '../utils/compressImage'
import { formatDateLongKO, parseYMDLocal } from '../utils/dates'
import {
  hasJournalEntryContent,
  journalKeyForDate,
  loadJournalEntry,
  saveJournalEntry,
} from '../utils/journalKeys'

function loadSliceForYmd(ymd) {
  const ex = loadJournalEntry(journalKeyForDate(ymd))
  return {
    date: ymd,
    mood: ex?.mood ?? null,
    photo: ex?.photo ?? null,
    text: ex?.text ?? '',
  }
}

/** @param {{ fecha: string }} props */
function JournalEditor({ fecha }) {
  const [{ date, mood, photo, text }, setEntry] = useState(() => loadSliceForYmd(fecha))
  const [savedHint, setSavedHint] = useState(false)
  const skipSaveAfterHydrate = useRef(true)

  const storageKey = journalKeyForDate(date)

  useEffect(() => {
    if (skipSaveAfterHydrate.current) {
      skipSaveAfterHydrate.current = false
      return
    }
    const t = setTimeout(() => {
      saveJournalEntry(storageKey, { date, mood, photo, text })
      setSavedHint(true)
    }, 400)
    return () => clearTimeout(t)
  }, [storageKey, date, mood, photo, text])

  useEffect(() => {
    if (!savedHint) return
    const h = window.setTimeout(() => setSavedHint(false), 2000)
    return () => clearTimeout(h)
  }, [savedHint])

  function patchEntry(patch) {
    setEntry((e) => ({ ...e, ...patch }))
  }

  async function onPhotoPick(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const data = await compressImageToDataUrl(file)
      patchEntry({ photo: data })
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="page page-journal-edit" style={{ padding: '16px 16px 0' }}>
      <PageBackBar />
      <h1 className="page-journal-edit__title">{formatDateLongKO(new Date(`${fecha}T12:00:00`))}</h1>

      {mood ? (
        <div className="page-journal-edit__mood" aria-hidden>
          <MoodFigure id={mood} size={52} />
        </div>
      ) : null}

      <textarea
        className="textarea-field"
        placeholder="오늘은 어땠어요?"
        value={text}
        onChange={(e) => patchEntry({ text: e.target.value })}
      />

      <div className="polaroid-block">
        <input id="journal-photo" type="file" accept="image/*" hidden onChange={onPhotoPick} />
        <label htmlFor="journal-photo" className="btn-secondary btn-secondary--journal-photo">
          사진 추가
        </label>
        {photo && (
          <div className="polaroid">
            <img src={photo} alt="" />
          </div>
        )}
        {photo && (
          <div className="page-journal-edit__photo-actions">
            <button type="button" className="link-quiet" onClick={() => patchEntry({ photo: null })}>
              사진 삭제
            </button>
          </div>
        )}
      </div>

      <div className="save-hint" style={{ opacity: savedHint ? 1 : 0 }}>
        저장됨
      </div>

    </div>
  )
}

/** @param {{ fecha: string }} props */
function JournalContent({ fecha }) {
  const navigate = useNavigate()
  const [showCreateModal, setShowCreateModal] = useState(
    () => !hasJournalEntryContent(loadSliceForYmd(fecha)),
  )
  const closedAfterSaveRef = useRef(false)

  if (showCreateModal) {
    return (
      <EntryModal
        key={fecha}
        open={showCreateModal}
        dateYmd={fecha}
        onOpenChange={(open) => {
          setShowCreateModal(open)
          if (!open && !closedAfterSaveRef.current) {
            navigate('/diario', { replace: true })
          }
          closedAfterSaveRef.current = false
        }}
        onSaved={() => {
          closedAfterSaveRef.current = true
          setShowCreateModal(false)
        }}
      />
    )
  }

  return <JournalEditor fecha={fecha} />
}

export default function Journal() {
  const { fecha } = useParams()
  if (!fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha) || !parseYMDLocal(fecha)) {
    return <Navigate to="/diario" replace />
  }
  return <JournalContent key={fecha} fecha={fecha} />
}
