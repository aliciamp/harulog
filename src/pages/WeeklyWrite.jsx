import { useEffect, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { PageBackBar } from '../components/PageBackBar'
import { getWeekData } from '../content/weeks'
import { useLocalStorage } from '../hooks/useLocalStorage'

/** @param {{ weekNum: number }} props */
function WeeklyWriteContent({ weekNum }) {
  const data = getWeekData(weekNum)
  const topicEs = data?.topic_es ?? `${weekNum}주차`
  const practiceKey = `weekly_W${weekNum}`
  const [practice, setPractice] = useLocalStorage(practiceKey, '')
  const base = typeof practice === 'string' ? practice : ''
  const [text, setText] = useState(base)
  const [savedSnapshot, setSavedSnapshot] = useState(base)
  const [savedHint, setSavedHint] = useState(false)
  const skipSaveAfterMount = useRef(true)

  useEffect(() => {
    if (skipSaveAfterMount.current) {
      skipSaveAfterMount.current = false
      return
    }
    const t = window.setTimeout(() => {
      setPractice(text)
      setSavedSnapshot(text)
      setSavedHint(true)
    }, 400)
    return () => window.clearTimeout(t)
  }, [text, setPractice])

  useEffect(() => {
    if (!savedHint) return
    const h = window.setTimeout(() => setSavedHint(false), 2000)
    return () => clearTimeout(h)
  }, [savedHint])

  const dirty = text !== savedSnapshot

  function saveNow() {
    setPractice(text)
    setSavedSnapshot(text)
    setSavedHint(true)
  }

  return (
    <div className="page page-weekly-write" style={{ padding: '16px 16px 0' }}>
      <PageBackBar tituloDeSeccion={topicEs} />

      <textarea
        className="weekly-write-area"
        placeholder="이번 주 주제로 자유롭게 써보세요..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="save-hint" style={{ opacity: savedHint ? 1 : 0 }}>
        저장됨
      </div>

      {dirty ? (
        <div className="weekly-write-footer">
          <button type="button" className="journal-modal__save weekly-write-savebtn" onClick={saveNow}>
            저장하기
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default function WeeklyWrite() {
  const { weekNum: raw } = useParams()
  const weekNum = parseInt(raw ?? '', 10)
  if (Number.isNaN(weekNum) || weekNum < 1) {
    return <Navigate to="/semana" replace />
  }
  return <WeeklyWriteContent key={weekNum} weekNum={weekNum} />
}
