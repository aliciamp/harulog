/** @param {Date} d */
export function toYMD(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** @param {string} ymd */
export function parseYMDLocal(ymd) {
  const [y, m, day] = ymd.split('-').map(Number)
  if (!y || !m || !day) return null
  const d = new Date(y, m - 1, day)
  if (d.getFullYear() !== y || d.getMonth() !== m - 1 || d.getDate() !== day) return null
  return d
}

/** Encabezado largo en coreano, p. ej. 2026년 3월 19일 목요일 */
export function formatDateLongKO(d = new Date()) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }).format(d)
}

/** Mes y año en calendario: 2026년 3월 */
export function formatYearMonthKO(d) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
  }).format(d)
}

const WEEKDAYS_KO_SHORT = ['일', '월', '화', '수', '목', '금', '토']

/** Lista de diario: `Mar 17 · 목` */
export function formatDiaryListDateLine(ymd) {
  const d = parseYMDLocal(ymd)
  if (!d) return ymd
  const md = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(d)
  const wd = WEEKDAYS_KO_SHORT[d.getDay()]
  return `${md} · ${wd}`
}
