export type UILikedQuote = {
  id: number;
  bookTitle: string;
  content: string;
  tags: string[];
  nickname: string;
  dateLabel: string;
  likeCount: number;
};

export type UILikedDiscussion = {
  id: number;
  bookTitle: string;
  title: string;
  content: string;
  nickname: string;
  dateLabel: string;
  likeCount: number;
  commentCount: number;
};