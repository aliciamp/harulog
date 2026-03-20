import { useCallback, useEffect, useState } from 'react'

function readStored(key, initial) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return typeof initial === 'function' ? initial() : initial
    return JSON.parse(raw)
  } catch {
    return typeof initial === 'function' ? initial() : initial
  }
}

function writeStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore quota / private mode */
  }
}

/**
 * @template T
 * @param {string} key
 * @param {T} initial
 * @returns {[T, (v: T | ((prev: T) => T)) => void]}
 */
export function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => readStored(key, initial))

  useEffect(() => {
    setState(readStored(key, initial))
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `initial` solo si no hay valor en LS para esta clave
  }, [key])

  const setValue = useCallback(
    (value) => {
      setState((prev) => {
        const next = typeof value === 'function' ? value(prev) : value
        writeStored(key, next)
        return next
      })
    },
    [key],
  )

  return [state, setValue]
}
