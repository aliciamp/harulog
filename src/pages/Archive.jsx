import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FlipCard } from '../components/FlipCard'
import { PageBackBar } from '../components/PageBackBar'
import { getCalendarWeekNumber, getWeekData } from '../content/weeks'
import { readWeeklyPractice } from '../utils/weeklyStorage'

export default function Archive() {
  const current = getCalendarWeekNumber()
  const pastWeeks = []
  for (let w = 1; w < current; w++) pastWeeks.push(w)

  const [open, setOpen] = useState(() => ({}))

  function toggleWeek(w) {
    setOpen((prev) => ({ ...prev, [w]: !prev[w] }))
  }

  return (
    <div className="page" style={{ padding: '16px 16px 0' }}>
      <PageBackBar tituloDeSeccion="지난 주들" />
      <h1 className="archive-page-title">지난 주들</h1>

      <div style={{ marginBottom: '1rem' }}>
        <Link to="/semana" className="link-quiet">
          이번 주로 돌아가기
        </Link>
      </div>

      {pastWeeks.length === 0 ? (
        <p className="empty-muted">아직 표시할 지난 주가 없어요.</p>
      ) : (
        <div className="archive-list">
          {pastWeeks.map((w) => {
            const data = getWeekData(w)
            const topicEs = data?.topic_es ?? `${w}주차`
            const topicKo = data?.topic_ko ?? ''
            const text = readWeeklyPractice(w)
            const vocabulary = data?.vocabulary ?? []
            const expanded = !!open[w]

            return (
              <div key={w} className="card archive-item">
                <div className="archive-item__head">
                  <span className="week-header__num" style={{ margin: 0 }}>
                    {w}주차
                  </span>
                  <span className="week-header__es archive-item__topic-es">{topicEs}</span>
                  {topicKo ? <span className="week-header__ko archive-item__topic-ko">{topicKo}</span> : null}
                </div>
                {text.trim() ? (
                  <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{text}</p>
                ) : (
                  <p className="empty-muted" style={{ margin: 0 }}>
                    이번 주에 작성한 글이 없어요
                  </p>
                )}
                {vocabulary.length > 0 && (
                  <div className="archive-item__actions">
                    <button type="button" className="btn-secondary" onClick={() => toggleWeek(w)}>
                      {expanded ? '단어 접기' : '단어 보기'}
                    </button>
                    {expanded && (
                      <div className="flash-grid" style={{ marginTop: '0.75rem' }}>
                        {vocabulary.map((item) => (
                          <FlipCard key={item.ko} ko={item.ko} es={item.es} readOnly />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
