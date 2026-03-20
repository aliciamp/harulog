import HappyIcon from '../assets/moods/happy.svg?react'
import LoveIcon from '../assets/moods/love.svg?react'
import SadIcon from '../assets/moods/sad.svg?react'
import AnxiousIcon from '../assets/moods/anxious.svg?react'
import TiredIcon from '../assets/moods/tired.svg?react'
import AngryIcon from '../assets/moods/angry.svg?react'
import CalmIcon from '../assets/moods/calm.svg?react'
import BlankIcon from '../assets/moods/blank.svg?react'

const MOOD_SVGS = {
  happy: HappyIcon,
  love: LoveIcon,
  sad: SadIcon,
  anxious: AnxiousIcon,
  tired: TiredIcon,
  angry: AngryIcon,
  calm: CalmIcon,
  blank: BlankIcon,
}

/**
 * Ilustración SVG por mood (assets en `src/assets/moods/`).
 * @param {{ id: string, size?: number, className?: string, fillCell?: boolean }} props
 */
export function MoodFigure({ id, size = 56, className, fillCell }) {
  const Svg = MOOD_SVGS[id]
  if (!Svg) return null
  if (fillCell) {
    return (
      <Svg
        className={className}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', objectFit: 'contain', flexShrink: 0 }}
        aria-hidden
      />
    )
  }
  return (
    <Svg
      className={className}
      width={size}
      height={size}
      style={{ display: 'block', flexShrink: 0 }}
      aria-hidden
    />
  )
}
