export const START_DATE = '2026-02-16' // 4 semanas atrás → semana actual = semana 5

export const weeks = [
  {
    week: 1,
    topic_es: "Viajes y transporte",
    topic_ko: "여행과 교통",
    intro: "Hablemos de viajes y cómo nos movemos. 여행에 대해 이야기해요.",
    vocabulary: [
      { "ko": "여행", "es": "Viaje" },
      { "ko": "떠나다", "es": "Irse / salir de viaje" },
      { "ko": "출발하다", "es": "Salir / partir" },
      { "ko": "도착하다", "es": "Llegar" },
      { "ko": "공항", "es": "Aeropuerto" },
      { "ko": "기차", "es": "Tren" },
      { "ko": "버스를 놓치다", "es": "Perder el bus" },
      { "ko": "언제 출발해요?", "es": "¿Cuándo sale?" }
    ]
  },
  {
    week: 2,
    topic_es: "Compras y comida",
    topic_ko: "쇼핑과 음식",
    intro: "Hablemos de comprar y comer. 쇼핑과 음식에 대해 이야기해요.",
    vocabulary: [
      { "ko": "쇼핑하다", "es": "Hacer compras" },
      { "ko": "슈퍼마켓", "es": "Supermercado" },
      { "ko": "시장", "es": "Mercado" },
      { "ko": "가격", "es": "Precio" },
      { "ko": "값", "es": "Precio / valor" },
      { "ko": "고기", "es": "Carne" },
      { "ko": "생선", "es": "Pescado" },
      { "ko": "채소", "es": "Verduras" }
    ]
  },
  {
    week: 3,
    topic_es: "Rutina diaria",
    topic_ko: "일상",
    intro: "Describe tu día a día. 일상을 말해요.",
    vocabulary: [
      { "ko": "일어나다", "es": "Levantarse" },
      { "ko": "공부하다", "es": "Estudiar" },
      { "ko": "일하다", "es": "Trabajar" },
      { "ko": "걷다", "es": "Caminar" },
      { "ko": "쉬다", "es": "Descansar" },
      { "ko": "아침", "es": "Mañana" },
      { "ko": "오후", "es": "Tarde" },
      { "ko": "매일", "es": "Cada día" }
    ]
  },
  {
    week: 4,
    topic_es: "Salud y estado físico",
    topic_ko: "건강",
    intro: "Hablemos de cómo te sientes. 건강에 대해 이야기해요.",
    vocabulary: [
      { "ko": "감기에 걸리다", "es": "Resfriarse" },
      { "ko": "열이 있다", "es": "Tener fiebre" },
      { "ko": "아프다", "es": "Estar enfermo / doler" },
      { "ko": "병원", "es": "Hospital" },
      { "ko": "약", "es": "Medicina" },
      { "ko": "유행이다", "es": "Estar de moda / ser común (enfermedad)" },
      { "ko": "쉬어야 해요", "es": "Tengo que descansar" },
      { "ko": "괜찮아요", "es": "Estoy bien" }
    ]
  },
  {
    week: 5,
    topic_es: "Ocio y gustos",
    topic_ko: "취미와 취향",
    intro: "Habla de lo que te gusta hacer. 취미에 대해 말해요.",
    vocabulary: [
      { "ko": "좋아하다", "es": "Gustar" },
      { "ko": "즐겁다", "es": "Ser divertido" },
      { "ko": "요리하다", "es": "Cocinar" },
      { "ko": "영화를 보다", "es": "Ver películas" },
      { "ko": "책을 읽다", "es": "Leer libros" },
      { "ko": "음악을 듣다", "es": "Escuchar música" },
      { "ko": "여행하고 싶다", "es": "Querer viajar" },
      { "ko": "같이 가요", "es": "Vamos juntos" }
    ]
  }  
]

function parseStartDate() {
  const [y, m, day] = START_DATE.split('-').map(Number)
  return new Date(y, m - 1, day)
}

/** Número de semana desde START_DATE (semana 1 = semana que empieza ese lunes). */
export function getCalendarWeekNumber(date = new Date()) {
  const start = parseStartDate()
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diffDays = Math.floor((d - start) / 86400000)
  return Math.max(1, Math.floor(diffDays / 7) + 1)
}

export function getWeekData(weekNum) {
  return weeks.find((w) => w.week === weekNum) ?? null
}
