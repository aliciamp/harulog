/** @param {number} weekNum */
export function readWeeklyPractice(weekNum) {
  try {
    const raw = localStorage.getItem(`weekly_W${weekNum}`)
    if (raw === null) return ''
    const parsed = JSON.parse(raw)
    return typeof parsed === 'string' ? parsed : ''
  } catch {
    return ''
  }
}
