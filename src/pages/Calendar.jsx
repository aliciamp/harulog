import { useMemo, useState } from 'react'
import EntryModal from '../components/EntryModal'
import { ChevronLeft, ChevronRight } from '../components/icons'
import { MoodFigure } from '../components/MoodFigure'
import { formatYearMonthKO, toYMD } from '../utils/dates'
import { journalKeyForDate, loadJournalEntry } from '../utils/journalKeys'

const WEEKDAYS_KO = ['일', '월', '화', '수', '목', '금', '토']

function buildMonthGrid(year, monthIndex) {
  const first = new Date(year, monthIndex, 1)
  const pad = first.getDay()
  const dim = new Date(year, monthIndex + 1, 0).getDate()
  const out = []
  for (let i = 0; i < pad; i++) {
    const d = new Date(year, monthIndex, -pad + i + 1)
    out.push({ ymd: toYMD(d), muted: true })
  }
  for (let d = 1; d <= dim; d++) {
    out.push({ ymd: toYMD(new Date(year, monthIndex, d)), muted: false })
  }
  let n = 1
  while (out.length % 7 !== 0) {
    out.push({ ymd: toYMD(new Date(year, monthIndex + 1, n)), muted: true })
    n++
  }
  return out
}

export default function Calendar() {
  const [refreshTick, setRefreshTick] = useState(0)
  const today = toYMD(new Date())
  const [cursor, setCursor] = useState(() => {
    const n = new Date()
    return { y: n.getFullYear(), m: n.getMonth() }
  })

  const cells = useMemo(
    () => buildMonthGrid(cursor.y, cursor.m),
    [cursor.y, cursor.m],
  )

  const headerDate = useMemo(() => new Date(cursor.y, cursor.m, 1), [cursor.y, cursor.m])

  function goPrev() {
    setCursor((c) => {
      const d = new Date(c.y, c.m - 1, 1)
      return { y: d.getFullYear(), m: d.getMonth() }
    })
  }

  function goNext() {
    setCursor((c) => {
      const d = new Date(c.y, c.m + 1, 1)
      return { y: d.getFullYear(), m: d.getMonth() }
    })
  }

  function bumpRefresh() {
    setRefreshTick((n) => n + 1)
  }

  return (
    <div className="page page--calendar">
      <h1 className="calendar__title">{formatYearMonthKO(headerDate)}</h1>

      <div className="calendar__nav">
        <button type="button" className="calendar__nav-btn" onClick={goPrev} aria-label="이전 달">
          <ChevronLeft size={22} color="var(--color-text-primary)" />
        </button>
        <button type="button" className="calendar__nav-btn" onClick={goNext} aria-label="다음 달">
          <ChevronRight size={22} color="var(--color-text-primary)" />
        </button>
      </div>

      <div className="calendar__weekdays">
        {WEEKDAYS_KO.map((d) => (
          <span key={d} className="calendar__weekday">
            {d}
          </span>
        ))}
      </div>

      <div className="calendar__grid" data-refresh={refreshTick}>
        {cells.map(({ ymd, muted }) => {
          const entry = loadJournalEntry(journalKeyForDate(ymd))
          const mood = entry?.mood
          const isToday = ymd === today
          const dayNum = parseInt(ymd.slice(8), 10)
          const hasMood = Boolean(mood)

          return (
            <div
              key={ymd}
              className={`calendar__day ${muted ? 'calendar__day--muted' : ''} ${isToday ? 'calendar__day--today' : ''} ${hasMood ? 'calendar__day--has-mood' : ''}`}
            >
              {hasMood ? (
                <MoodFigure id={mood} fillCell />
              ) : (
                <>
                  <span className="calendar__day-num">{dayNum}</span>
                  <span className="calendar__mood calendar__mood--empty" aria-hidden />
                </>
              )}
            </div>
          )
        })}
      </div>

      <EntryModal onSave={bumpRefresh} />
    </div>
  )
}
