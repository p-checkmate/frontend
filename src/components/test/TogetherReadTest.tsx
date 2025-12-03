// src/components/test/TogetherReadProgressListTest.tsx
import React from 'react';

type UserProgress = {
  id: number;
  nickname: string;
  page: number;
  percent: number;
};

type ProgressListProps = {
  title: string;
  daysLeft: number;
  participants: number;
  totalPages: number;
  myPage: number;
  users: UserProgress[];
};

const TogetherReadProgressListTest: React.FC = () => {
  const MOCK_DATA: ProgressListProps = {
    title: '고대 도의 아틀란티스',
    daysLeft: 11,
    participants: 27,
    totalPages: 368,
    myPage: 120,

    users: [
      { id: 1, nickname: '지민', page: 120, percent: 32 },
      { id: 2, nickname: '도윤', page: 250, percent: 68 },
      { id: 3, nickname: '서연', page: 98, percent: 26 },
      { id: 4, nickname: '유나', page: 180, percent: 48 },
      { id: 5, nickname: '현서', page: 330, percent: 91 },
    ].sort((a, b) => b.percent - a.percent),
  };

  return (
    <div className="bg-beige1 min-h-screen p-4">
      <ProgressList {...MOCK_DATA} />
    </div>
  );
};

export default TogetherReadProgressListTest;

/* ==============================
 * 메인 컴포넌트
 * ============================== */

const ProgressList: React.FC<ProgressListProps> = ({
  title,
  daysLeft,
  participants,
  totalPages,
  myPage,
  users,
}) => {
  const myPercent = Math.round((myPage / totalPages) * 100);

  return (
    <div className="border-gray1 bg-beige2 rounded-l border p-4">
      {/* 제목 */}
      <h2 className="text-title5 text-black">{title}</h2>
      <p className="text-body5 text-gray3 mt-1">
        남은 기간 <span className="text-green1">D-{daysLeft}</span> · 참여자{' '}
        <span className="text-green1">{participants}명</span>
      </p>

      {/* 내 진행률 */}
      <div className="mt-6 flex items-center gap-6">
        <CircleProgress percent={myPercent} />
        <div>
          <p className="text-body5 text-gray3">내 독서 진행</p>
          <p className="text-title6 text-black">
            {myPercent}% <span className="text-body5 text-gray3">({myPage}p)</span>
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="bg-gray1 my-5 h-[1px] w-full" />

      {/* 리스트 제목 */}
      <p className="text-title6 mb-2 text-black">참여자 진행도</p>

      {/* 참여자 리스트 */}
      <div className="flex flex-col gap-3">
        {users.map((u) => (
          <UserProgressRow key={u.id} user={u} />
        ))}
      </div>
    </div>
  );
};

/* ==============================
 * 개별 유저 진행도 Row
 * ============================== */

const UserProgressRow = ({ user }: { user: UserProgress }) => {
  return (
    <div className="rounded-m border-gray1 flex items-center gap-3 border bg-white px-3 py-2">
      {/* 아바타 자리 */}
      <div className="bg-green1/10 text-green1 text-body5 flex h-10 w-10 items-center justify-center rounded-full">
        {user.nickname[0]}
      </div>

      {/* 닉네임 + 진행바 */}
      <div className="flex-1">
        <p className="text-body5 text-black">{user.nickname}</p>

        <div className="bg-gray4 relative mt-1 h-3 w-full rounded-full">
          <div
            className="bg-green1 absolute top-0 left-0 h-3 rounded-full"
            style={{ width: `${user.percent}%` }}
          ></div>
        </div>

        <p className="text-body5 text-gray3 mt-1">
          {user.percent}% ({user.page}p)
        </p>
      </div>
    </div>
  );
};

/* ==============================
 * 원형 진행도
 * ============================== */

const CircleProgress = ({ percent }: { percent: number }) => {
  const clamped = Math.max(0, Math.min(100, percent));

  const backgroundImage = `conic-gradient(var(--color-green1) 0% ${clamped}%, var(--color-gray1) ${clamped}% 100%)`;

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full"
        style={{ backgroundImage }}
      >
        <div className="bg-beige2 flex h-14 w-14 items-center justify-center rounded-full">
          <span className="text-body5 text-green1">{clamped}%</span>
        </div>
      </div>
    </div>
  );
};
