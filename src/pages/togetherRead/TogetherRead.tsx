import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, MyReadCard, BookMarathonCard } from '@/components';
import { togetherReadMock } from '@/_mocks/togetherReadMock';

const TogetherRead = () => {
  const navigate = useNavigate();

  // 나중에 여기 부분만 백엔드 API 연동으로 교체하면 됨
  const [bookState, setBookState] = useState(togetherReadMock);

  // 내 userId (현재 로그인 유저) – 지금은 mock 기준
  const currentUserId = 'user-me';

  // 참여자 리스트: 내 카드가 항상 맨 위에 오도록 정렬
  const sortedUsers = useMemo(() => {
    const copy = [...bookState.marathonUsers];
    copy.sort((a, b) => {
      if (a.isCurrentUser === b.isCurrentUser) {
        // 둘 다 내가 아니면 읽은 페이지 많은 순으로 정렬
        return b.readPage - a.readPage;
      }
      return a.isCurrentUser ? -1 : 1;
    });
    return copy;
  }, [bookState.marathonUsers]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    alert('도서 함께 읽기 링크 공유 기능은\n추후에 추가될 예정입니다 :)');
  };

  // MyReadCard 업데이트 → 내 진행 + 마라톤 카드 모두 반영
  const handleUpdateMyReading = (newReadPage: number, newMemo: string) => {
    setBookState((prev) => ({
      ...prev,
      myReading: {
        readPage: newReadPage,
        memo: newMemo,
      },
      marathonUsers: prev.marathonUsers.map((u) =>
        u.userId === currentUserId
          ? { ...u, readPage: newReadPage, memo: newMemo }
          : u
      ),
    }));

    // TODO: 여기서 실제 API 호출 (PATCH /together-read/:bookId/my-progress) 예정
  };

  const { title, totalPage, participantsCount, dday, myReading } = bookState;

  return (
    <div className="flex min-h-screen justify-center bg-beige1">
      {/* 375 ~ 430px 프레임 */}
      <div className="flex w-full max-w-[430px] flex-col">
        {/* 상단 헤더 */}
        <Header
          variant="backTitleIcon"
          title="함께 읽기"
          onBackClick={handleBack}
          onShareClick={handleShare}
        />

        {/* 컨텐츠 영역 */}
        <main className="flex-1 px-4 pb-8 pt-4">
          {/* 책 정보 헤더 */}
          <section className="mb-4">
            <h2 className="text-caption1 font-semibold text-black ml-4">
              {title}
            </h2>
            <p className="mt-1 text-caption4 text-gray3 ml-3">
                참여자 <span className="text-green1">{participantsCount}명</span>
                {" · "}
                남은 기간 <span className="text-green1">D-{dday}</span>
                {" · "}
                총 <span className="text-green1">{totalPage}p</span>
            </p>
          </section>

          {/* 내 읽기 카드 (MyReadCard) */}
          <section className="flex justify-center">
            <MyReadCard
              totalPage={totalPage}
              initialReadPage={myReading.readPage}
              initialMemo={myReading.memo}
              onUpdate={handleUpdateMyReading}
            />
          </section>

          {/* 함께 달리는 독서 마라톤 */}
          <section className="mt-6">
            <div className="rounded-m bg-beige2 px-4 py-4 shadow-sm">
              <h3 className="mb-3 text-title6 text-black">
                함께 달리는 독서 마라톤
              </h3>

              {/* 참가자 카드 리스트 */}
              <div className="flex flex-col items-center gap-4">
                {sortedUsers.map((user) => (
                  <BookMarathonCard
                    key={user.userId}
                    userName={user.userName}
                    totalPage={user.totalPage}
                    readPage={user.readPage}
                    memo={user.memo}
                    level={user.level}
                    isCurrentUser={user.isCurrentUser}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TogetherRead;
