import { MOODS } from '../content/moods'
import { MoodFigure } from './MoodFigure'

/** @param {{ value: string | null, onChange: (id: string) => void }} props */
export function MoodPicker({ value, onChange }) {
  return (
    <div className="mood-picker">
      {MOODS.map((m) => (
        <button
          key={m.id}
          type="button"
          className={`mood-picker__btn ${value === m.id ? 'selected' : ''}`}
          onClick={() => onChange(m.id)}
          aria-pressed={value === m.id}
          aria-label={m.label_ko}
        >
          <MoodFigure id={m.id} size={56} className="mood-picker__figure" />
        </button>
      ))}
    </div>
  )
}
