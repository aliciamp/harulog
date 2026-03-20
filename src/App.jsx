import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Archive from './pages/Archive'
import Calendar from './pages/Calendar'
import DiaryList from './pages/DiaryList'
import Flashcards from './pages/Flashcards'
import Journal from './pages/Journal'
import WeeklyDetail from './pages/WeeklyDetail'
import WeeklyList from './pages/WeeklyList'
import WeeklyWrite from './pages/WeeklyWrite'

export default function App() {
  return (
    <>
      <Sidebar />
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/diario" element={<DiaryList />} />
          <Route path="/diario/historial" element={<Navigate to="/diario" replace />} />
          <Route path="/diario/:fecha" element={<Journal />} />
          <Route path="/semana" element={<WeeklyList />} />
          <Route path="/semana/:weekNum" element={<WeeklyDetail />} />
          <Route path="/semana/:weekNum/flashcards" element={<Flashcards />} />
          <Route path="/semana/:weekNum/escribir" element={<WeeklyWrite />} />
          <Route path="/archivo" element={<Archive />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}
