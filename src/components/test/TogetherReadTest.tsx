// src/components/test/TogetherReadSectionTest.tsx
import React, { useEffect, useState } from 'react';

type TogetherReadSession = {
  id: string;
  title: string;
  totalPages: number;
  myPage: number;
  participants: number;
  daysLeft: number;
};

type TogetherReadSectionProps = {
  isJoined: boolean;
  session: TogetherReadSession;
  onJoin?: () => void;
  onUpdateProgress?: () => void;
  onOpenDetail?: () => void;
};

/* =============================
 *  테스트 페이지
 * ============================= */
const TogetherReadSectionTest: React.FC = () => {
  const [isJoined, setIsJoined] = useState(false);

  const MOCK_SESSION: TogetherReadSession = {
    id: '1',
    title: '고대 도의 아틀란티스',
    totalPages: 368,
    myPage: 120,
    participants: 27,
    daysLeft: 11,
  };

  return (
    <div className="bg-beige1 min-h-screen px-4 pb-10 pt-6">
      <header className="mb-4">
        <p className="text-body5 text-gray3">테스트 페이지</p>
        <h1 className="text-title4 mt-1 text-black">함께 읽기 섹션 테스트</h1>

        <button
          type="button"
          onClick={() => setIsJoined((prev) => !prev)}
          className="border-gray2 bg-beige2 text-body5 text-gray3 mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1"
        >
          <span className="bg-green1 h-2 w-2 rounded-full" />
          <span>
            현재 상태 : <b>{isJoined ? '참여 상태 (Joined)' : '참여 전 상태 (Not Joined)'}</b>
          </span>
        </button>
      </header>

      <TogetherReadSection
        isJoined={isJoined}
        session={MOCK_SESSION}
        onJoin={() => alert('참여하기 클릭')}
        onUpdateProgress={() => alert('진행도 업데이트 클릭')}
        onOpenDetail={() => alert('상세 화면으로 이동 (남들 진행도 리스트)')}
      />
    </div>
  );
};

export default TogetherReadSectionTest;

/* =============================
 *  섹션 본체
 * ============================= */

const TogetherReadSection: React.FC<TogetherReadSectionProps> = ({
  isJoined,
  session,
  onJoin,
  onUpdateProgress,
  onOpenDetail,
}) => {
  return (
    <section className="mt-2">
      <h2 className="text-title5 mb-2 text-black">이번 주 함께 읽기</h2>

      {isJoined ? (
        <JoinedCard
          session={session}
          onUpdateProgress={onUpdateProgress}
          onOpenDetail={onOpenDetail}
        />
      ) : (
        <NotJoinedCard session={session} onJoin={onJoin} />
      )}
    </section>
  );
};

/* =============================
 *  참여 전 카드
 * ============================= */

type NotJoinedCardProps = {
  session: TogetherReadSession;
  onJoin?: () => void;
};

const NotJoinedCard: React.FC<NotJoinedCardProps> = ({ session, onJoin }) => {
  const { title, participants, daysLeft } = session;

  return (
    <div className="border-gray1 bg-beige2 rounded-l border px-4 py-3">
      <p className="text-body5 text-gray3">3주 동안 함께 읽는 책</p>

      <p className="text-title6 mt-1 line-clamp-2 text-black">{title}</p>

      <p className="text-body5 text-gray3 mt-2">
        참여자 <span className="text-green1">{participants}명</span> · 남은 기간{' '}
        <span className="text-green1">D-{daysLeft}</span>
      </p>
      <div className="mt-3">
        <div className="bg-gray4 relative h-3 w-full overflow-hidden rounded-full">
          <div className="bg-green1/60 absolute left-0 top-0 h-full w-1/4 rounded-full" />
        </div>
        <p className="text-body5 text-gray3 mt-1">
          아직 참여하지 않았어요. 함께 읽기에 참여하고 내 독서 진행을 기록해보세요.
        </p>
      </div>

      <button
        type="button"
        onClick={onJoin}
        className="bg-green1 text-body5 mt-3 h-9 w-full rounded-full text-white"
      >
        함께 읽기 참여하기
      </button>
    </div>
  );
};

/* =============================
 *  참여 상태 카드
 * ============================= */

type JoinedCardProps = {
  session: TogetherReadSession;
  onUpdateProgress?: () => void;
  onOpenDetail?: () => void;
};

const JoinedCard: React.FC<JoinedCardProps> = ({ session, onUpdateProgress, onOpenDetail }) => {
  const { title, totalPages, myPage, participants, daysLeft } = session;
  const rawPercent = (myPage / totalPages) * 100;

  return (
    <button
      type="button"
      onClick={onOpenDetail}
      className="border-gray1 bg-beige2 w-full rounded-l border px-4 py-3 text-left"
    >
      <div className="flex items-center justify-between gap-3">
        {/* 왼쪽 텍스트 영역 */}
        <div className="flex-1">
          <p className="text-body5 text-gray3">이번 주 함께 읽는 책</p>
          <p className="text-title6 mt-1 line-clamp-2 text-black">{title}</p>

          <p className="text-body5 text-gray3 mt-2">
              남은 기간 <span className="text-green1">D-{daysLeft}</span> · 참여자{' '}
            <span className="text-green1">{participants}명</span>
          </p>
        </div>

        {/* 오른쪽 원형 진행도 */}
        <CircleProgress percent={rawPercent} />
      </div>

      {/* 버튼은 카드 안에 있지만, 상세 진입과 분리되도록 클릭 막기 */}
      <div className="mt-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onUpdateProgress?.();
          }}
          className="bg-green1 text-body5 h-9 w-full rounded-full text-white"
        >
        진행도 업데이트
        </button>
      </div>
    </button>
  );
};

/* =============================
 *  원형 진행도 컴포넌트
 *  - conic-gradient + JS 애니메이션
 * ============================= */

type CircleProgressProps = {
  percent: number; // 0~100
};

const CircleProgress: React.FC<CircleProgressProps> = ({ percent }) => {
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    const target = Math.max(0, Math.min(100, Math.round(percent)));
    let frame: number;
    const start = performance.now();
    const duration = 600; // ms

    const animate = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out

      setDisplayPercent(Math.round(target * eased));

      if (t < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [percent]);

  const clamped = Math.max(0, Math.min(100, displayPercent));
  const backgroundImage = `conic-gradient(var(--color-green1) 0% ${clamped}%, var(--color-gray1) ${clamped}% 100%)`;

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundImage }}
      >
        <div className="bg-beige2 flex h-12 w-12 items-center justify-center rounded-full">
          <span className="text-body5 text-green1">{clamped}%</span>
        </div>
      </div>
      <p className="text-body5 text-gray3 mt-1">내 진행률</p>
    </div>
  );
};
