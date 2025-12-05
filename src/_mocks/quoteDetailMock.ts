export type QuoteTag = {
  id: number;
  label: string;
};

export type QuoteDetailData = {
  id: number;
  bookTitle: string;
  author: string;
  publisher: string;
  coverUrl?: string;
  content: string;
  writer: string;
  date: string;
  tags: QuoteTag[];
};

const QUOTE_DETAILS: QuoteDetailData[] = [
  {
    id: 1,
    bookTitle: "책 제목 1",
    author: "저자 1",
    publisher: "출판사 1",
    coverUrl: "https://via.placeholder.com/150",
    content: "여기에 인용구 내용이 들어갑니다.\n줄바꿈도 테스트해보세요.",
    writer: "닉네임1",
    date: "2025.12.05",
    tags: [
      { id: 1, label: "#인상깊은문장" },
      { id: 2, label: "#공감" },
    ],
  },
];

export const getQuoteDetailById = (id: number): QuoteDetailData | undefined =>
  QUOTE_DETAILS.find((q) => q.id === id);
