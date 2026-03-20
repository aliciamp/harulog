import { Link } from 'react-router-dom'
import { MoodFigure } from '../components/MoodFigure'
import { formatDiaryListDateLine } from '../utils/dates'
import { journalKeyForDate, listJournalDatesWithData, loadJournalEntry } from '../utils/journalKeys'

function previewLine(text, max = 60) {
  const line = String(text ?? '')
    .split('\n')[0]
    .trim()
  if (line.length <= max) return line
  return `${line.slice(0, max - 1)}…`
}

export default function DiaryList() {
  const year = new Date().getFullYear()
  const dates = listJournalDatesWithData()
    .slice()
    .reverse()

  return (
    <div className="page page-diary-list" style={{ padding: '16px 16px 0' }}>
      <header className="page-header-bar diary-list__year-row">
        <div className="page-header-bar__spacer" aria-hidden />
        <span className="page-header-bar__center">{year}</span>
        <div className="page-header-bar__spacer" aria-hidden />
      </header>

      {dates.length === 0 ? (
        <p className="diary-list-empty">아직 기록이 없어요</p>
      ) : (
        <ul className="diary-list">
          {dates.map((ymd) => {
            const entry = loadJournalEntry(journalKeyForDate(ymd))
            if (!entry) return null
            const { mood, photo, text } = entry
            const prev = previewLine(text, 60)

            return (
              <li key={ymd} className="diary-list__item">
                <Link to={`/diario/${ymd}`} className="diary-list__link">
                  <span className="diary-list__mood-cell">
                    {mood ? <MoodFigure id={mood} size={32} /> : <span className="diary-list__mood-placeholder" />}
                  </span>
                  <span className="diary-list__body">
                    <span className="diary-list__date">{formatDiaryListDateLine(ymd)}</span>
                    <span className="diary-list__preview">{prev || ' '}</span>
                  </span>
                  {photo ? (
                    <span className="diary-list__thumb-wrap">
                      <img src={photo} alt="" className="diary-list__thumb" />
                    </span>
                  ) : (
                    <span className="diary-list__thumb-spacer" aria-hidden />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
