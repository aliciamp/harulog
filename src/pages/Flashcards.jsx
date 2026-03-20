import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { PageBackBar } from '../components/PageBackBar'
import { getWeekData } from '../content/weeks'
import { useLocalStorage } from '../hooks/useLocalStorage'

/** @param {{ weekNum: number }} props */
function FlashcardsContent({ weekNum }) {
  const data = getWeekData(weekNum)
  const topicEs = data?.topic_es ?? `${weekNum}주차`
  const vocabulary = data?.vocabulary ?? []
  const learnedKey = `learned_W${weekNum}`
  const [learnedList, setLearnedList] = useLocalStorage(learnedKey, [])

  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const item = vocabulary[idx]
  const total = vocabulary.length
  const learned = item && Array.isArray(learnedList) && learnedList.includes(item.ko)

  function goPrev() {
    setFlipped(false)
    setIdx((i) => Math.max(0, i - 1))
  }

  function goNext() {
    setFlipped(false)
    setIdx((i) => Math.min(total - 1, i + 1))
  }

  function toggleLearned() {
    if (!item) return
    const ko = item.ko
    const arr = Array.isArray(learnedList) ? learnedList : []
    if (arr.includes(ko)) {
      setLearnedList((prev) => {
        const p = Array.isArray(prev) ? prev : []
        return p.filter((x) => x !== ko)
      })
      return
    }
    setLearnedList((prev) => [...(Array.isArray(prev) ? prev : []), ko])
    if (idx < total - 1) {
      setFlipped(false)
      setIdx((i) => i + 1)
    }
  }

  if (total === 0) {
    return (
      <div
        className="page page-flashcards page-flashcards--empty"
        style={{ paddingTop: '16px', paddingInline: '16px' }}
      >
        <PageBackBar tituloDeSeccion={topicEs} />
        <p className="empty-muted">단어가 없어요.</p>
      </div>
    )
  }

  return (
    <div className="page page-flashcards" style={{ paddingTop: '16px', paddingInline: '16px' }}>
      <PageBackBar tituloDeSeccion={topicEs} />
      <p className="flashcards-progress" style={{ margin: '0 0 12px', textAlign: 'center' }}>
        {idx + 1} / {total}
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
          position: 'relative',
          zIndex: 0,
          height: '60vw',
          maxHeight: '380px',
          minHeight: '260px',
        }}
      >
        <button
          type="button"
          onClick={goPrev}
          disabled={idx === 0}
          style={{
            position: 'relative',
            zIndex: 2,
            background: 'none',
            border: 'none',
            cursor: idx === 0 ? 'default' : 'pointer',
            padding: '8px',
            flexShrink: 0,
            color: 'var(--color-text-body)',
            opacity: idx === 0 ? 0.3 : 1,
          }}
          aria-label="이전"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M15 18L9 12L15 6"
              stroke="var(--color-text-body)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            minWidth: 0,
            alignSelf: 'stretch',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className={`flashcards-card-wrap ${learned ? 'is-learned' : ''}`}>
            <button
              type="button"
              className="flashcards-learn"
              aria-pressed={learned}
              aria-label="학습 완료"
              onClick={(e) => {
                e.stopPropagation()
                toggleLearned()
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden>
                <path
                  d="M20 6L9 17l-5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              role="button"
              tabIndex={0}
              className={`flashcards-flip ${flipped ? 'is-flipped' : ''}`}
              onClick={() => setFlipped((f) => !f)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setFlipped((f) => !f)
                }
              }}
            >
              <div className="flashcards-face flashcards-face--front">
                <p className="flashcards-ko">{item.ko}</p>
              </div>
              <div className="flashcards-face flashcards-face--back">
                <p className="flashcards-es">{item.es}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={idx >= total - 1}
          style={{
            position: 'relative',
            zIndex: 2,
            background: 'none',
            border: 'none',
            cursor: idx >= total - 1 ? 'default' : 'pointer',
            padding: '8px',
            flexShrink: 0,
            color: 'var(--color-text-body)',
            opacity: idx >= total - 1 ? 0.3 : 1,
          }}
          aria-label="다음"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M9 6L15 12L9 18"
              stroke="var(--color-text-body)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flashcards-dots" aria-hidden>
        {vocabulary.map((_, i) => (
          <span key={i} className={`flashcards-dot ${i === idx ? 'is-active' : ''}`} />
        ))}
      </div>
    </div>
  )
}

export default function Flashcards() {
  const { weekNum: raw } = useParams()
  const weekNum = parseInt(raw ?? '', 10)
  if (Number.isNaN(weekNum) || weekNum < 1) {
    return <Navigate to="/semana" replace />
  }
  return <FlashcardsContent key={weekNum} weekNum={weekNum} />
}
