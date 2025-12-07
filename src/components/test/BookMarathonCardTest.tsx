//import React from 'react';
import BookMarathonCard from '@/components/common/cards/BookMarathonCard';

// 더미 데이터 정의
const userMarathonData = [
  {
    userId: 'user-001',
    userName: '나의 닉네임', // 이건 나임 (밑에 isCurrentUser가 true여서)
    totalPage: 368,
    readPage: 368, // 100% 완료
    memo: '',  // 메모 없음
    level: 5 as const,
    isCurrentUser: true, // 현재 유저는 (Green1 스타일 적용)
  },
  {
    userId: 'user-002',
    userName: '독서왕_제인',
    totalPage: 368,
    readPage: 250, // 약 68%
    memo: '여기부터 진짜 재밌어짐! 멈출 수가 없네요.',
    level: 3 as const,
    isCurrentUser: false,
  },
  {
    userId: 'user-003',
    userName: '느림의미학',
    totalPage: 368,
    readPage: 12, // 약 3%
    memo: '아직은 도입부, 캐릭터 설정이 흥미롭습니다.',
    level: 1 as const,
    isCurrentUser: false,
  },
  {
    userId: 'user-004',
    userName: '레벨업지존',
    totalPage: 368,
    readPage: 0, // 0%
    memo: '드디어 완독! 명작은 시간이 흘러도 빛나네요.',
    level: 2 as const,
    isCurrentUser: false,
  },
];

const BookMarathonCardTest = () => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-6 bg-beige1 p-8">
      <h1 className="text-title3 font-bold text-black mb-4">독서 마라톤 참여자 목록</h1>
      <p className="text-body4 text-gray3">레벨에 따라 캐릭터 이미지와 진행률이 표시됩니다.</p>
      
      <div className="flex flex-col gap-6">
        {userMarathonData.map((data) => (
          <BookMarathonCard
            key={data.userId}
            userName={data.userName}
            totalPage={data.totalPage}
            readPage={data.readPage}
            memo={data.memo}
            level={data.level}
            isCurrentUser={data.isCurrentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default BookMarathonCardTest;