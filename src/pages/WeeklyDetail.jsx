import { Link, Navigate, useParams } from 'react-router-dom'
import { PageBackBar } from '../components/PageBackBar'
import { getWeekData } from '../content/weeks'

export default function WeeklyDetail() {
  const { weekNum: raw } = useParams()
  const weekNum = parseInt(raw ?? '', 10)
  if (Number.isNaN(weekNum) || weekNum < 1) {
    return <Navigate to="/semana" replace />
  }

  const data = getWeekData(weekNum)
  const topicEs = data?.topic_es ?? `${weekNum}주차`

  return (
    <div className="page page-weekly-detail" style={{ padding: '16px 16px 0' }}>
      <PageBackBar tituloDeSeccion={topicEs} />

      <p className="weekly-detail-meta">{weekNum}주차</p>
      <h1 className="weekly-detail-title">{topicEs}</h1>

      <Link to={`/semana/${weekNum}/flashcards`} className="btn-primary-block">
        단어 보기
      </Link>
      <Link to={`/semana/${weekNum}/escribir`} className="btn-primary-block">
        글쓰기
      </Link>
    </div>
  )
}
