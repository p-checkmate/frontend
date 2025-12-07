export type MarathonUserLevel = 1 | 2 | 3 | 4 | 5;

export interface MarathonUser {
  userId: string;
  userName: string;
  totalPage: number;
  readPage: number;
  memo: string;
  level: MarathonUserLevel;
  isCurrentUser: boolean;
}

export interface TogetherReadMock {
  bookId: number;
  title: string;
  totalPage: number;
  participantsCount: number;
  dday: number; // 남은 기간 (D-11 이면 11)
  myReading: {
    readPage: number;
    memo: string;
  };
  marathonUsers: MarathonUser[];
}

// UI 테스트용 더미 데이터
export const togetherReadMock: TogetherReadMock = {
    // 상단 타이틀
  bookId: 1,
  title: "고대 도의 아틀란티스",
  totalPage: 368,
  participantsCount: 27,
  dday: 11,

  // 내 진행
  myReading: {
    readPage: 125,
    memo: '',
  },
  
  // 함께 달리는 독서 마라톤
  marathonUsers: [
    {
      userId: 'user-002',
      userName: '닉네임어쩌고저쩌고',
      totalPage: 368,
      readPage: 250,
      memo: '여기부터 진짜 재밌어짐!',
      level: 3,
      isCurrentUser: false,
    },
    {
      userId: 'user-003',
      userName: '닉네임어쩌고저쩌고',
      totalPage: 368,
      readPage: 189,
      memo: '오오오!!',
      level: 1,
      isCurrentUser: false,
    },
    {
      userId: 'user-004',
      userName: '닉네임어쩌고저쩌고',
      totalPage: 368,
      readPage: 120,
      memo: '조금씩 속도가 붙는 중!',
      level: 4,
      isCurrentUser: false,
    },
    {
      userId: 'user-me',
      userName: '닉네임어쩌고저쩌고',
      totalPage: 368,
      readPage: 125,
      memo: '언제 다 읽지? ㅠㅠ',
      level: 2,
      isCurrentUser: true,
    },
    {
      userId: 'user-005',
      userName: '닉네임어쩌고저쩌고',
      totalPage: 368,
      readPage: 20,
      memo: '',
      level: 5,
      isCurrentUser: false,
    },
  ],
};
