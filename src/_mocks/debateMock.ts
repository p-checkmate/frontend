export type DebateType = "FREE" | "VS";
export type AuthorType = "me" | "other";
export type DebateSide = 1 | 2;

export interface DebateRoom {
  id: number; // debateRoomId
  bookId: number;
  type: DebateType;
  title: string;
  description: string;
}

export interface DebateMessage {
  id: number;
  debateRoomId: number;
  author: AuthorType;
  nickname: string;
  content: string;
  /** VS 토론에서만 사용 (1번 진영 / 2번 진영) */
  side?: DebateSide;
}

export const DEBATE_ROOMS_MOCK: DebateRoom[] = [
  {
    id: 101, // debateRoomId
    bookId: 1,
    type: "FREE",
    title: "토론 제목",
    description:
      "토론 상세 내용 어쩌고 저쩌고 이렇게 길게 적으면 어쩐다가 꼬불꼬불 어쩌고가 할 수 있게 이렇게 하면됩니다",
  },
  {
    id: 102,
    bookId: 1,
    type: "VS",
    title: "토론 제목",
    description:
      "VS 토론 상세 내용 어쩌고 저쩌고 이렇게 길게 적으면 어쩐다가 꼬불꼬불 어쩌고가 할 수 있게 이렇게 하면됩니다",
  },
  {
    id: 201,
    bookId: 2,
    type: "FREE",
    title: "다른 책의 자유 토론방",
    description: "다른 책에 대한 자유 토론입니다.",
  },
];

export const DEBATE_MESSAGES_BY_ROOM_MOCK: Record<number, DebateMessage[]> = {
  101: [
    {
      id: 1,
      debateRoomId: 101,
      author: "other",
      nickname: "닉네임",
      content: "저는 그렇게 생각안하는데요",
    },
    {
      id: 2,
      debateRoomId: 101,
      author: "me",
      nickname: "나",
      content: "그럼 어떻게 생각하시는뎅여",
    },
  ],

  102: [
    {
      id: 1,
      debateRoomId: 102,
      author: "other",
      nickname: "닉네임",
      content: "저는 그렇게생각안하는데요",
      side: 1,
    },
    {
      id: 2,
      debateRoomId: 102,
      author: "me",
      nickname: "나",
      content: "그럼 어떻게 생각하시는뎅여",
      side: 2,
    },
  ],

  201: [
    {
      id: 1,
      debateRoomId: 201,
      author: "other",
      nickname: "다른닉네임",
      content: "이 책은 저는 이렇게 생각하는데요",
    },
    {
      id: 2,
      debateRoomId: 201,
      author: "me",
      nickname: "나",
      content: "오 저도 비슷하게 생각했어요",
    },
  ],
};

/** 책 ID 기준 목록 */
export const getDebateRoomsByBookId = (bookId: number) =>
  DEBATE_ROOMS_MOCK.filter((room) => room.bookId === bookId);

/** 토론방 단일 조회 */
export const getDebateRoomById = (id: number): DebateRoom | undefined =>
  DEBATE_ROOMS_MOCK.find((room) => room.id === id);

/** 메시지 조회 */
export const getMessagesByDebateRoomId = (debateRoomId: number) =>
  DEBATE_MESSAGES_BY_ROOM_MOCK[debateRoomId] ?? [];
