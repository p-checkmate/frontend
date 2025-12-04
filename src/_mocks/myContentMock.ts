export type MyDiscussion = {
  id: number;
  bookTitle: string;
  title: string;
  content: string;
  nickname: string;
  dateLabel: string;
  likeCount: number;
  commentCount: number;
};

export type MyQuote = {
  id: number;
  bookTitle: string;
  content: string;
  tags: string[];
  nickname: string;
  dateLabel: string;
  likeCount: number;
};

// 내가 작성한 토론 Mock Data
export const myDiscussionsMock: MyDiscussion[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  bookTitle: `책 제목 ${i + 1}`,
  title: `내가 쓴 토론 제목 ${i + 1}`,
  content: `이 책의 결말에 대해 어떻게 생각하시나요? 저는 개인적으로... (더미 텍스트) ${i + 1}`,
  nickname: '가나디', // 내 닉네임
  dateLabel: '25.11.03',
  likeCount: 10 + i,
  commentCount: 5 + i,
}));

// 내가 작성한 인용구 Mock Data
export const myQuotesMock: MyQuote[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  bookTitle: `책 제목 ${i + 1}`,
  content: `“인상 깊은 구절입니다. 삶은 계란이다.” ${i + 1}`,
  tags: ['인생', '철학'],
  nickname: '체크메이트',
  dateLabel: '25.11.04',
  likeCount: 20 + i,
}));