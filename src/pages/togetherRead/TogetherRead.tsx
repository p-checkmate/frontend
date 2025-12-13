// src/pages/togetherRead/TogetherRead.tsx
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header, MyReadCard, BookMarathonCard } from '@/components';

import {
  fetchReadingGroupOverview,
  fetchReadingGroupMembers,
  patchMyProgress,
  type ReadingGroupOverview,
  type ReadingGroupMember,
} from '@/api/togetherRead/togetherRead.api';

const TogetherRead = () => {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const gid = Number(groupId);

  const [overview, setOverview] = useState<ReadingGroupOverview | null>(null);
  const [members, setMembers] = useState<ReadingGroupMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ===== load =====
  useEffect(() => {
    if (!Number.isFinite(gid)) {
      setError('잘못된 그룹 ID입니다.');
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const [ov, mem] = await Promise.all([
          fetchReadingGroupOverview(gid),
          fetchReadingGroupMembers(gid, { page: 1, limit: 50 }),
        ]);

        setOverview(ov);
        setMembers(mem.members ?? []);
      } catch (e: any) {
        console.error(e);
        setError(e?.message ?? '함께 읽기 정보를 불러오지 못했어요.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [gid]);

  // 참여자 리스트: 내 카드가 항상 맨 위 + 그 다음 많이 읽은 순
  const sortedUsers = useMemo(() => {
    const copy = [...members];
    copy.sort((a, b) => {
      if (a.is_current_user === b.is_current_user) {
        return (b.current_page ?? 0) - (a.current_page ?? 0);
      }
      return a.is_current_user ? -1 : 1;
    });
    return copy;
  }, [members]);

  const handleBack = () => navigate(-1);

  const handleShare = () => {
    alert('도서 함께 읽기 링크 공유 기능은\n추후에 추가될 예정입니다 :)');
  };

  // 내 진행 업데이트 (PATCH)
  const handleUpdateMyReading = async (newReadPage: number, newMemo: string) => {
    if (!overview) return;

    try {
      // 1) 서버 업데이트
      await patchMyProgress(overview.reading_group_id, {
        current_page: newReadPage,
        memo: newMemo,
      });

      // 2) overview
      setOverview((prev) =>
        prev
          ? {
              ...prev,
              my_progress: {
                current_page: newReadPage,
                memo: newMemo,
              },
            }
          : prev,
      );

      // 3) members 리스트에서 내 항목 갱신
      setMembers((prev) =>
        prev.map((m) =>
          m.is_current_user
            ? { ...m, current_page: newReadPage, memo: newMemo }
            : m,
        ),
      );

    } catch (e: any) {
      console.error(e);
      alert(e?.message ?? '업데이트에 실패했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center bg-beige1">
        <div className="flex w-full max-w-[430px] flex-col">
          <Header variant="backTitleIcon" title="함께 읽기" onBackClick={handleBack} onShareClick={handleShare} />
          <main className="flex-1 px-4 pb-8 pt-6">
            <p className="text-center text-caption3 text-gray3">불러오는 중...</p>
          </main>
        </div>
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="flex min-h-screen justify-center bg-beige1">
        <div className="flex w-full max-w-[430px] flex-col">
          <Header variant="backTitleIcon" title="함께 읽기" onBackClick={handleBack} onShareClick={handleShare} />
          <main className="flex-1 px-4 pb-8 pt-6">
            <p className="text-center text-caption3 text-gray3">{error ?? '데이터가 없어요.'}</p>
          </main>
        </div>
      </div>
    );
  }

  const title = overview.title;
  const totalPage = overview.total_pages;
  const participantsCount = overview.member_count;
  const dday = overview.days_left;

  const myReading = {
    readPage: overview.my_progress?.current_page ?? 0,
    memo: overview.my_progress?.memo ?? '',
  };

  return (
    <div className="flex min-h-screen justify-center bg-beige1">
      <div className="flex w-full max-w-[430px] flex-col">
        <Header
          variant="backTitleIcon"
          title="함께 읽기"
          onBackClick={handleBack}
          onShareClick={handleShare}
          className="sticky top-0 z-50 bg-beige1"
        />

        <main className="flex-1 px-4 pb-8 pt-4">
          {/* 책 정보 헤더 */}
          <section className="mb-4">
            <h2 className="ml-4 text-caption1 font-semibold text-black">{title}</h2>
            <p className="ml-3 mt-1 text-caption4 text-gray3">
              참여자 <span className="text-green1">{participantsCount}명</span>
              {' · '}
              남은 기간 <span className="text-green1">D-{dday}</span>
              {' · '}
              총 <span className="text-green1">{totalPage}p</span>
            </p>
          </section>

          {/* 내 읽기 카드 */}
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
              <h3 className="mb-3 text-title6 text-black">함께 달리는 독서 마라톤</h3>

              <div className="flex flex-col items-center gap-4">
                {sortedUsers.map((user) => (
                  <BookMarathonCard
                    key={user.user_id}
                    userName={user.nickname}
                    totalPage={overview.total_pages}
                    readPage={user.current_page ?? 0}
                    memo={user.memo ?? ''}
                    level={user.level}
                    isCurrentUser={user.is_current_user}
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
