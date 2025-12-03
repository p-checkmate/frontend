// src/components/test/TogetherReadDetailTest.tsx
import React, { useMemo, useState } from 'react';

type UserProgress = {
  id: number;
  nickname: string;
  page: number;
  memo?: string;
  isMe?: boolean;
};

const TOTAL_PAGES = 368;

const mockUsers: UserProgress[] = [
  {
    id: 1,
    nickname: '나',
    page: 120,
    memo: '여기부터 진짜 재밌어짐',
    isMe: true,
  },
  {
    id: 2,
    nickname: '도윤',
    page: 250,
    memo: '중후반부 전개 깔끔함',
  },
  {
    id: 3,
    nickname: '서연',
    page: 98,
    memo: '초반 세계관 설명 치밀함',
  },
  {
    id: 4,
    nickname: '유나',
    page: 180,
    memo: '캐릭터 대사 너무 현실적임',
  },
  {
    id: 5,
    nickname: '현서',
    page: 330,
    memo: '결말이 다가오는 느낌…!',
  },
];

const TogetherReadDetailTest: React.FC = () => {
  const [users, setUsers] = useState<UserProgress[]>(mockUsers);
  const me = users.find((u) => u.isMe)!;

  const [inputPage, setInputPage] = useState<string>(String(me.page));
  const [inputMemo, setInputMemo] = useState<string>(me.memo ?? '');

  const daysLeft = 11;
  const participants = users.length;

  const myPercent = useMemo(
    () => Math.round(Math.min(100, (me.page / TOTAL_PAGES) * 100)),
    [me.page],
  );

  const handleUpdate = () => {
    const pageValue = Number(inputPage);
    if (Number.isNaN(pageValue) || pageValue < 0) {
      alert('0 이상의 숫자를 입력해 주세요.');
      return;
    }

    const clamped = Math.min(pageValue, TOTAL_PAGES);

    setUsers((prev) => prev.map((u) => (u.isMe ? { ...u, page: clamped, memo: inputMemo } : u)));
  };

  const sortedUsers = useMemo(() => [...users].sort((a, b) => b.page - a.page), [users]);

  return (
    <div className="bg-beige1 min-h-screen px-4 pt-6 pb-10">
      {/* 헤더 */}
      <header className="mb-4">
        <p className="text-body5 text-gray3">함께 읽기 상세 (테스트)</p>
        <h1 className="text-title4 mt-1 text-black">고대 도의 아틀란티스</h1>
        <p className="text-body5 text-gray3 mt-1">
          남은 기간 <span className="text-green1">D-{daysLeft}</span> · 참여자{' '}
          <span className="text-green1">{participants}명</span> · 총{' '}
          <span className="text-green1">{TOTAL_PAGES}p</span>
        </p>
      </header>

      {/* 내 진행 입력 카드 */}
      <section className="border-gray1 bg-beige2 mb-5 rounded-l border p-4">
        <p className="text-body5 text-gray3 mb-1">내 진행</p>
        <p className="text-title6 mb-3 text-black">
          {myPercent}% <span className="text-body5 text-gray3">({me.page}p)</span>
        </p>

        {/* 페이지 입력 */}
        <div className="rounded-m border-gray2 mb-3 border bg-white p-3">
          <label className="text-body5 text-gray3 mb-1 block">내가 읽은 페이지</label>
          <input
            type="number"
            min={0}
            max={TOTAL_PAGES}
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            className="text-body5 w-full bg-transparent text-black outline-none"
          />
        </div>

        {/* 한줄 메모 입력 */}
        <div className="rounded-m border-gray2 mb-3 border bg-white p-3">
          <label className="text-body5 text-gray3 mb-1 block">한줄 감상 / 메모</label>
          <input
            type="text"
            maxLength={50}
            value={inputMemo}
            onChange={(e) => setInputMemo(e.target.value)}
            placeholder="예: 여기부터 전개가 빨라짐"
            className="text-body5 w-full bg-transparent text-black outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleUpdate}
          className="bg-green1 text-body5 h-10 w-full rounded-full text-white"
        >
          업데이트
        </button>
      </section>

      {/* 트랙 리스트 */}
      <section className="border-gray1 bg-beige2 rounded-l border p-4">
        <p className="text-title6 mb-3 text-black">함께 달리는 트랙</p>

        <div className="flex flex-col gap-3">
          {sortedUsers.map((user) => (
            <RunnerTrackRow key={user.id} user={user} totalPages={TOTAL_PAGES} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TogetherReadDetailTest;

/* ===========================================
 * 달리기 트랙 Row + 한줄 감상 추가
 * =========================================== */

/* ===========================================
 * 달리기 트랙 Row + 말풍선 버전
 * =========================================== */

type RunnerTrackRowProps = {
  user: UserProgress;
  totalPages: number;
};

const RunnerTrackRow: React.FC<RunnerTrackRowProps> = ({ user, totalPages }) => {
  const percent = Math.min(100, (user.page / totalPages) * 100);
  const percentLabel = Math.round(percent);
  const isMe = user.isMe;

  // 말풍선 꼬리 방향 (캐릭터 위치 따라 자동)
  const tailPosition = percent < 50 ? 'left-6' : '-right-6 rotate-180';

  return (
    <div className="rounded-m border-gray1 flex flex-col gap-3 border bg-white px-3 py-3">
      {/* 닉네임 + 퍼센트 정보 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full ${
              isMe ? 'bg-green1 text-white' : 'bg-green1/10 text-green1'
            } text-body5`}
          >
            {isMe ? '나' : user.nickname[0]}
          </div>
          <span className="text-body5 text-black">
            {user.nickname}
            {isMe && <span className="text-body5 text-pink ml-1">(Me)</span>}
          </span>
        </div>

        <span className="text-body5 text-gray3">
          {percentLabel}% · {user.page}p
        </span>
      </div>

      {/* 트랙 */}
      <div className="relative h-10 w-full">
        {/* 중앙 선 */}
        <div className="bg-gray4 absolute top-1/2 right-0 left-0 h-[2px] -translate-y-1/2" />

        {/* 양 끝 */}
        <div className="bg-gray3 absolute top-1/2 left-0 h-2 w-2 -translate-y-1/2 rounded-full" />
        <div className="bg-gray3 absolute top-1/2 right-0 h-2 w-2 -translate-y-1/2 rounded-full" />

        {/* 캐릭터 */}
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
          style={{ left: `${percent}%` }}
        >
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-full border shadow-sm ${
              isMe ? 'border-green1 bg-yellow text-black' : 'border-gray2 bg-beige2 text-green1'
            } text-body5`}
          >
            {isMe ? '🏃' : '📚'}
          </div>
        </div>
      </div>

      {/* 한줄 감상 - 말풍선 */}
      {user.memo && (
        <div className="relative w-fit max-w-[80%]">
          <div
            className={`rounded-m border ${
              isMe ? 'border-green1 bg-yellow/40' : 'border-gray2 bg-beige2'
            } text-body5 text-gray3 px-3 py-2 leading-[18px]`}
          >
            {user.memo}
          </div>

          {/* 말풍선 꼬리 */}
          <div
            className={`absolute -bottom-2 ${tailPosition} h-4 w-4 rotate-45 border-inherit bg-inherit`}
          />
        </div>
      )}
    </div>
  );
};
