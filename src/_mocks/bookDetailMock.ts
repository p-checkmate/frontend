export type DiscussionSummary = {
  id: number;
  bookTitle: string;
  title: string;
  content: string;
  nickname: string;
  dateLabel: string;
  likeCount: number;
  commentCount: number;
};
export type QuoteSummary = {
  id: number;
  bookTitle: string;
  content: string;
  nickname: string;
  dateLabel: string;
  likeCount: number;
};
export type BookDetail = {
  id: number;
  title: string;
  author: string;
  publisher: string;
  description: string;
  coverImageUrl: string;
  tags: string[];
  discussions: DiscussionSummary[];
  quotes: QuoteSummary[];
};

export const bookDetailMocks: BookDetail[] = [
  {
    id: 1,
    title: '책 제목',
    author: '저자 이름',
    publisher: '출판사 이름',
    description:
      '도서 정보\n간단한 줄거리 어쩌고저쩌고 대단한 책이다. 이 책은 ~~한 내용을 다루고 있고, 토론하기 좋은 포인트가 많다.',
    coverImageUrl: '',
    tags: ['태그', '태그2'],

    discussions: [
      {
        id: 1,
        bookTitle: '책 제목',
        title: '토론 제목',
        content: '토론 상세 내용 어쩌고 저쩌고 이렇게 길게 만들까?? 근데 얼마나 길게해야 되는지',
        nickname: '닉네임',
        dateLabel: '25.11.03',
        likeCount: 24,
        commentCount: 24,
      },
      {
        id: 2,
        bookTitle: '책 제목',
        title: '또 다른 토론 제목',
        content: '두 번째 토론 내용 어쩌고 저쩌고 이렇게 길게 만들까?? 근데 얼마나 길게해야 되는지',
        nickname: '다른닉',
        dateLabel: '25.11.05',
        likeCount: 12,
        commentCount: 7,
      },
    ],

    quotes: [
      {
        id: 1,
        bookTitle: '책 제목',
        content: '어쩌고저쩌고 이만큼 길게 적으면 줄여지는지 안 줄여지는지 테스트ㅐㅐㅓ어오란오런ㅇㄹㄴㅇㄹㅇ아아ㅏ아아아ㅏㄴㅇㄹㄴㅇㄹ',
        nickname: '닉네임',
        dateLabel: '25.11.03',
        likeCount: 10,
      },
      {
        id: 2,
        bookTitle: '책 제목',
        content: '“여기서 작가가 말하고 싶은 건 무엇이었을까요?”',
        nickname: '다른닉',
        dateLabel: '25.11.04',
        likeCount: 5,
      },
    ],
  },

  {
    id: 2,
    title: '두 번째 책',
    author: '작가2',
    publisher: '출판사2',
    description: '이 책은 두 번째 책 요약 내용…',
    coverImageUrl: '',
    tags: ['감성', '철학'],

    discussions: [],
    quotes: [],
  },
];
export const getBookDetailById = (id: number): BookDetail | undefined => {
  return bookDetailMocks.find((book) => book.id === id);
};
