import { useState } from 'react'

/**
 * @param {{
 *   ko: string,
 *   es: string,
 *   learned?: boolean,
 *   onToggleLearned?: () => void,
 *   readOnly?: boolean,
 *   variant?: 'grid' | 'carousel',
 * }} props
 */
export function FlipCard({
  ko,
  es,
  learned = false,
  onToggleLearned,
  readOnly = false,
  variant = 'grid',
}) {
  const [flipped, setFlipped] = useState(false)
  const showLearn = !readOnly && typeof onToggleLearned === 'function'

  return (
    <div
      className={`flip-card-wrap ${learned ? 'learned' : ''} ${variant === 'carousel' ? 'flip-card-wrap--carousel' : ''}`}
    >
      {showLearn && (
        <div className="flip-card__toolbar">
          <button
            type="button"
            className={`flip-card__learn-btn ${learned ? 'active' : ''}`}
            aria-pressed={learned}
            title={learned ? '학습 취소' : '학습 완료'}
            onClick={(e) => {
              e.stopPropagation()
              onToggleLearned()
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </button>
        </div>
      )}
      <div
        role="button"
        tabIndex={0}
        className={`flip-card ${flipped ? 'flipped' : ''} ${readOnly ? 'grid-static' : ''}`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setFlipped((f) => !f)
          }
        }}
      >
        <div className="flip-card__face flip-card__front">
          <div className="flip-card__hit">
            <p className="flip-card__ko">{ko}</p>
          </div>
        </div>
        <div className="flip-card__face flip-card__back">
          <div className="flip-card__hit">
            <p className="flip-card__es">{es}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
