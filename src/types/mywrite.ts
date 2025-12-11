// 내가 작성한 인용구 UI용 타입
export type UIQuote = {
  id: number;            // quote_id
  bookTitle: string;
  content: string;
  tags: string[];
  nickname: string;
  dateLabel: string;
  likeCount: number;
  isLiked: boolean;
};

// 내가 작성한 토론 UI용 타입
export type UIDiscussion = {
  id: number;            // discussion_id
  bookTitle: string;
  title: string;
  content: string;
  nickname: string;
  dateLabel: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
};
