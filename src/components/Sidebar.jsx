import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CalendarIcon, JournalIcon, ThisWeekIcon } from './icons'

function pathMatchesItem(itemPath, pathname) {
  if (itemPath === '/') return pathname === '/'
  if (itemPath === '/diario') return pathname === '/diario' || pathname.startsWith('/diario/')
  if (itemPath === '/semana') return pathname.startsWith('/semana')
  return pathname === itemPath
}

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const items = [
    { path: '/', label: '달력', icon: <CalendarIcon size={20} /> },
    { path: '/diario', label: '일기', icon: <JournalIcon size={20} /> },
    { path: '/semana', label: '이번 주', icon: <ThisWeekIcon size={20} /> },
  ]

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 100,
          color: 'var(--color-text-primary)',
        }}
        aria-label="메뉴 열기"
      >
        <HamburgerIcon />
      </button>

      {open ? (
        <button
          type="button"
          aria-label="메뉴 닫기"
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(44,44,42,0.3)',
            zIndex: 200,
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        />
      ) : null}

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          width: '72vw',
          maxWidth: '280px',
          background: 'var(--color-surface)',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 280ms ease',
          zIndex: 300,
          padding: '32px 20px',
          paddingTop: 'calc(32px + env(safe-area-inset-top, 0px))',
          paddingBottom: 'calc(20px + env(safe-area-inset-bottom, 0px))',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          pointerEvents: open ? 'auto' : 'none',
          boxSizing: 'border-box',
          borderRadius: 0,
        }}
        aria-hidden={!open}
      >
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-primary)' }}>하루log</div>
          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {new Date().toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          </div>
        </div>
        <div style={{ height: '0.5px', background: 'var(--color-border)', marginBottom: '16px' }} />
        {items.map((item) => {
          const active = pathMatchesItem(item.path, location.pathname)
          return (
            <button
              key={item.path}
              type="button"
              onClick={() => {
                navigate(item.path)
                setOpen(false)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                background: active ? 'var(--color-accent-light)' : 'transparent',
                color: active ? 'var(--color-accent)' : 'var(--color-text-body)',
                fontWeight: active ? 700 : 400,
                fontSize: '17px',
                width: '100%',
                textAlign: 'left',
              }}
            >
              {item.icon}
              {item.label}
            </button>
          )
        })}
      </div>
    </>
  )
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="M3 6h16M3 11h16M3 16h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
