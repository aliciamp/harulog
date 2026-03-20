import { Link } from 'react-router-dom'
import { getCalendarWeekNumber, getWeekData } from '../content/weeks'

export default function WeeklyList() {
  const current = getCalendarWeekNumber()
  const nums = [0, 1, 2, 3, 4].map((k) => current - k).filter((w) => w >= 1)
  const [first, ...rest] = nums

  return (
    <div className="page page-weekly-list">
      {first != null && <CurrentWeekCard weekNum={first} />}

      <div className="weekly-list-past">
        {rest.map((w) => (
          <PastWeekCard key={w} weekNum={w} />
        ))}
      </div>
    </div>
  )
}

/** @param {{ weekNum: number }} props */
function CurrentWeekCard({ weekNum }) {
  const data = getWeekData(weekNum)
  const topicEs = data?.topic_es ?? '이번 주'

  return (
    <div className="card weekly-list-card weekly-list-card--current">
      <p className="weekly-list-card__num weekly-list-card__num--solo">{weekNum}주차</p>
      <h2 className="weekly-list-card__title">{topicEs}</h2>
      <div className="weekly-list-card__actions">
        <Link to={`/semana/${weekNum}/flashcards`} className="btn-inline-pair">
          단어 보기
        </Link>
        <Link to={`/semana/${weekNum}/escribir`} className="btn-inline-pair">
          글쓰기
        </Link>
      </div>
    </div>
  )
}

/** @param {{ weekNum: number }} props */
function PastWeekCard({ weekNum }) {
  const data = getWeekData(weekNum)
  const topicEs = data?.topic_es ?? `${weekNum}주차`

  return (
    <Link to={`/semana/${weekNum}`} className="card weekly-list-card weekly-list-card--past">
      <span className="weekly-list-card__num">{weekNum}주차</span>
      <span className="weekly-list-card__title-sm">{topicEs}</span>
    </Link>
  )
}
