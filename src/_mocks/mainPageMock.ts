// ===== 함께 읽기 세션 =====
export type TogetherReadSession = {
  id: number;
  title: string;
  participants: number;
  remainDays: number;
  isJoined: boolean;
  progress?: number;
  rank?: number;
  thumbnailUrl?: string;
};

// ===== 책 카드 =====
export type MainPageBook = {
  id: number;
  title: string;
  coverUrl: string;
};

// ===== AI 추천 / 인기 도서 목업 =====
export const MOCK_MAIN_BOOKS: MainPageBook[] = [
  {
    id: 1,
    title: "책 제목 1",
    coverUrl: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "책 제목 2",
    coverUrl: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "책 제목 3",
    coverUrl: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "책 제목 4",
    coverUrl: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "책 제목 5",
    coverUrl: "",
  },
  {
    id: 6,
    title: "책 제목 6",
    coverUrl: "",
  },
];

// ===== 함께 읽기 =====
export const MOCK_TOGETHER_READ: TogetherReadSession | null = {
  id: 1,
  title: "고대 도의 아틀란티스",
  participants: 27,
  remainDays: 11,
  isJoined: true,
  progress: 33,
  rank: 3,
  thumbnailUrl:
    "https://images.unsplash.com/photo-1544937950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
};

// ===== 뜨거운 토론장 카드 =====
export type HotDiscussion = {
  id: number;
  bookTitle: string;
  title: string;
  content: string;
  nickname: string;
  dateLabel: string;
  likeCount: number;
  commentCount: number;
};

export const MOCK_HOT_DISCUSSIONS: HotDiscussion[] = [
  {
    id: 101,
    bookTitle: "책 제목 1",
    title: "토론 제목 1",
    content:
      "토론 상세 내용 어쩌고 저쩌고 이렇게 길게 만들까?? 근데 얼마나 길게해야 되는지...",
    nickname: "닉네임1",
    dateLabel: "25.11.03",
    likeCount: 24,
    commentCount: 24,
  },
  {
    id: 102,
    bookTitle: "책 제목 2",
    title: "토론 제목 2",
    content: "두 번째 토론 내용입니다. 어디까지 깊게 파야 할까요?",
    nickname: "닉네임2",
    dateLabel: "25.11.04",
    likeCount: 12,
    commentCount: 7,
  },
  {
    id: 3,
    bookTitle: "책 제목 3",
    title: "토론 제목 3",
    content: "결말에 대한 해석이 너무 달라서 재밌었던 토론이에요.",
    nickname: "닉네임3",
    dateLabel: "25.11.05",
    likeCount: 30,
    commentCount: 15,
  },
];

// ===== 나를 위한 인용구 카드 =====
export type RecommendedQuote = {
  id: number;
  bookTitle: string;
  content: string;
  tags: string[];
  nickname: string;
  dateLabel: string;
  likeCount: number;
};

export const MOCK_RECOMMENDED_QUOTES: RecommendedQuote[] = [
  {
    id: 1,
    bookTitle: "책 제목 1",
    content:
      "인용구 이렇게 어쩌고 저쩌고 길어지면 두 줄까지 허용해야 되는건가??? ...",
    tags: ["태그1", "태그2"],
    nickname: "닉네임1",
    dateLabel: "25.11.03",
    likeCount: 24,
  },
  {
    id: 2,
    bookTitle: "책 제목 2",
    content: "오늘 하루를 버티게 해주는 문장이었다고 느꼈던 구절이에요.",
    tags: ["위로", "힐링"],
    nickname: "닉네임2",
    dateLabel: "25.11.04",
    likeCount: 18,
  },
  {
    id: 3,
    bookTitle: "책 제목 3",
    content: "다음 페이지를 넘기기 전에 꼭 한 번 더 읽게 되는 문장.",
    tags: ["명대사"],
    nickname: "닉네임3",
    dateLabel: "25.11.05",
    likeCount: 32,
  },
];
