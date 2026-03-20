import { useNavigate } from 'react-router-dom'

/**
 * @param {{ tituloDeSeccion?: string | null }} props
 */
export function PageBackBar({ tituloDeSeccion }) {
  const navigate = useNavigate()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '24px',
      }}
    >
      <button
        type="button"
        onClick={() => navigate(-1)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          color: 'var(--color-text-body)',
        }}
        aria-label="뒤로"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="var(--color-text-body)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {tituloDeSeccion ? (
        <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{tituloDeSeccion}</span>
      ) : null}
    </div>
  )
}
