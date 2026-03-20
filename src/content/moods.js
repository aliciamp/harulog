export const MOODS = [
  { id: 'happy', label_es: 'Feliz', label_ko: '행복' },
  { id: 'sad', label_es: 'Triste', label_ko: '슬픔' },
  { id: 'anxious', label_es: 'Ansioso', label_ko: '불안' },
  { id: 'tired', label_es: 'Cansado', label_ko: '피곤' },
  { id: 'angry', label_es: 'Enfadado', label_ko: '화남' },
  { id: 'calm', label_es: 'Tranquilo', label_ko: '평온' },
  { id: 'love', label_es: 'Amor', label_ko: '사랑' },
  { id: 'blank', label_es: 'En blanco', label_ko: '멍함' },
]

export const MOODS_BY_ID = Object.fromEntries(MOODS.map((m) => [m.id, m]))
