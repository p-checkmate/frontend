export type LikedDiscussion = {
  id: number;
  bookTitle: string;
  title: string;
  content: string;
  nickname: string;
  dateLabel: string;
  likeCount: number;
  commentCount: number;
};

export type LikedQuote = {
  id: number;
  bookTitle: string;
  content: string;
  tags: string[];
  nickname: string;
  dateLabel: string;
  likeCount: number;
};

// 내가 좋아요 한 토론 Mock Data
export const likedDiscussionsMock: LikedDiscussion[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  bookTitle: `좋아요 한 책 ${i + 1}`,
  title: `정말 공감가는 토론 주제입니다 ${i + 1}`,
  content: `저도 이 부분에 대해서 깊게 고민해봤는데요, 작성자님 의견에 전적으로 동의합니다. 특히... (더미 텍스트)`,
  nickname: `다른유저${i}`,
  dateLabel: '25.11.01',
  likeCount: 150 + i,
  commentCount: 30 + i,
}));

// 내가 좋아요 한 인용구 Mock Data
export const likedQuotesMock: LikedQuote[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  bookTitle: `인상 깊은 책 ${i + 1}`,
  content: `“사랑은 마주 보는 것이 아니라, 함께 같은 방향을 보는 것이다.” ${i + 1}`,
  tags: ['사랑', '명언'],
  nickname: `명언제조기${i}`,
  dateLabel: '25.10.20',
  likeCount: 300 + i,
}));