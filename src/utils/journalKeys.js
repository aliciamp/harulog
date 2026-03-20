const PREFIX = 'journal_'

export function journalKeyForDate(ymd) {
  return `${PREFIX}${ymd}`
}

/** @param {{ mood?: string | null, photo?: string | null, text?: string } | null | undefined} entry */
export function hasJournalEntryContent(entry) {
  if (!entry) return false
  return !!(
    (entry.mood && String(entry.mood)) ||
    entry.photo ||
    (entry.text && String(entry.text).trim())
  )
}

/** @returns {{ date: string, mood: string | null, photo: string | null, text: string } | null} */
export function loadJournalEntry(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function saveJournalEntry(key, entry) {
  try {
    localStorage.setItem(key, JSON.stringify(entry))
  } catch {
    /* ignore */
  }
}

/** Lista de claves YYYY-MM-DD que tienen entrada guardada (cualquier campo), orden ascendente */
export function listJournalDatesWithData() {
  const out = []
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (!k || !k.startsWith(PREFIX)) continue
      const date = k.slice(PREFIX.length)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue
      const entry = loadJournalEntry(k)
      if (!entry) continue
      if (hasJournalEntryContent(entry)) {
        out.push(date)
      }
    }
  } catch {
    /* ignore */
  }
  out.sort()
  return out
}
