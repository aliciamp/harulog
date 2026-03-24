export function seedDemoDataIfEmpty() {
  const alreadySeeded = localStorage.getItem('harulog_seeded')
  if (alreadySeeded) return

  const demoData = {
    'journal_2026-03-10': {
      date: '2026-03-10',
      mood: 'calm',
      photo: null,
      text: '오늘은 조용한 하루였어요. 커피를 마시면서 책을 읽었어요.',
    },
    'journal_2026-03-11': {
      date: '2026-03-11',
      mood: 'happy',
      photo: null,
      text: '친구를 만났어요. 정말 즐거운 시간이었어요!',
    },
    'journal_2026-03-12': {
      date: '2026-03-12',
      mood: 'tired',
      photo: null,
      text: '오늘은 많이 피곤했어요. 일찍 잠을 잤어요.',
    },
    'journal_2026-03-13': {
      date: '2026-03-13',
      mood: 'love',
      photo: null,
      text: '오늘 날씨가 너무 좋았어요. 산책을 했어요.',
    },
    'journal_2026-03-14': {
      date: '2026-03-14',
      mood: 'anxious',
      photo: null,
      text: '내일 발표가 있어요. 조금 긴장돼요.',
    },
    'journal_2026-03-15': {
      date: '2026-03-15',
      mood: 'happy',
      photo: null,
      text: '발표가 잘 끝났어요! 너무 기뻐요.',
    },
    'journal_2026-03-16': {
      date: '2026-03-16',
      mood: 'blank',
      photo: null,
      text: '그냥 평범한 하루였어요.',
    },
    'journal_2026-03-17': {
      date: '2026-03-17',
      mood: 'angry',
      photo: null,
      text: '오늘은 좀 힘든 날이었어요. 그래도 괜찮아요.',
    },
    'journal_2026-03-18': {
      date: '2026-03-18',
      mood: 'calm',
      photo: null,
      text: '저녁에 음악을 들으면서 쉬었어요. 좋았어요.',
    },
    'journal_2026-03-19': {
      date: '2026-03-19',
      mood: 'happy',
      photo: null,
      text: '한국어 공부가 조금씩 늘고 있어요. 기분이 좋아요!',
    },
    'journal_2026-03-20': {
      date: '2026-03-20',
      mood: 'happy',
      photo: null,
      text: '오늘부터 새로운 주제를 공부해요. 취미에 관한 단어가 많아요. 재미있어요!',
    },
    'journal_2026-03-21': {
      date: '2026-03-21',
      mood: 'calm',
      photo: null,
      text: '토요일이라서 집에서 쉬었어요. 드라마를 보면서 한국어를 공부했어요.',
    },
    'journal_2026-03-22': {
      date: '2026-03-22',
      mood: 'tired',
      photo: null,
      text: '일요일인데 좀 피곤해요. 그래도 단어 카드를 몇 개 봤어요.',
    },
    'journal_2026-03-23': {
      date: '2026-03-23',
      mood: 'love',
      photo: null,
      text: '오늘 좋아하는 한국 노래를 들었어요. 가사를 조금 이해할 수 있어요!',
    },
    'journal_2026-03-24': {
      date: '2026-03-24',
      mood: 'happy',
      photo: null,
      text: '매일 조금씩 하면 실력이 늘어요. 오늘도 화이팅!',
    },
    weekly_W1:
      '저는 스페인에서 왔어요. 이름은 알리시아예요. 한국어를 공부하고 있어요. 만나서 반가워요!',
    weekly_W2: '우리 가족은 네 명이에요. 부모님과 남동생이 있어요. 가족이 정말 소중해요.',
    weekly_W3: '저는 매일 아침 일찍 일어나요. 커피를 마시고 공부를 시작해요. 저녁에는 산책을 해요.',
    weekly_W4: '요즘 감기에 걸렸어요. 약을 먹고 많이 쉬었어요. 건강이 제일 중요해요.',
    weekly_W6:
      '요즘 감정 표현을 더 잘하고 싶어요. 기쁠 때도 슬플 때도 한국어로 말할 수 있으면 좋겠어요.',
  }

  Object.entries(demoData).forEach(([k, v]) => {
    localStorage.setItem(k, JSON.stringify(v))
  })
  localStorage.setItem('harulog_seeded', 'true')
}
