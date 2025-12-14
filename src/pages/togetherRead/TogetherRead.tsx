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
import { getCurrentUser } from '@/utils/auth';

const TogetherRead = () => {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const gid = Number(groupId);

  const [overview, setOverview] = useState<ReadingGroupOverview | null>(null);
  const [members, setMembers] = useState<ReadingGroupMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = getCurrentUser();
  const nickname = user?.nickname ?? '';

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
    if (!overview) return;

    const kakao = window.Kakao;
    if (!kakao) {
      alert('Kakao SDK가 로드되지 않았어요.');
      return;
    }

    const shareUrl = `${window.location.origin}/togetherRead/${overview.reading_group_id}`;

    const imageUrl =
      'https://github.com/p-checkmate/frontend/blob/develop/src/assets/together.png?raw=true';

    if (!imageUrl) {
      alert('thumbnail_url이 없어서 공유 이미지를 넣을 수 없어요.');
      return;
    }

    try {
      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `함께 읽기: ${overview.title}`,
          description: `참여자 ${overview.member_count}명 · D-${overview.days_left} · 총 ${overview.total_pages}p \n${nickname}님이 같이 읽기에 초대했어요! 함께 책 읽고 감상 나눠요!`,
          imageUrl,
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '함께 읽기 보러가기',
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    } catch (e) {
      console.error('Kakao share failed:', e);
      alert('카카오 공유에 실패했어요. 콘솔 로그를 확인해주세요.');
    }
  };

  const handleUpdateMyReading = async (newReadPage: number, newMemo: string) => {
    if (!overview) return;

    try {
      await patchMyProgress(overview.reading_group_id, {
        current_page: newReadPage,
        memo: newMemo,
      });

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

      setMembers((prev) =>
        prev.map((m) =>
          m.is_current_user ? { ...m, current_page: newReadPage, memo: newMemo } : m,
        ),
      );
    } catch (e: any) {
      console.error(e);
      alert(e?.message ?? '업데이트에 실패했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  if (loading) {
    return (
      <div className="bg-beige1 flex min-h-screen justify-center">
        <div className="flex w-full max-w-[430px] flex-col">
          <Header
            variant="backTitleIcon"
            title="함께 읽기"
            onBackClick={() => navigate(`/`)}
            onShareClick={handleShare}
          />
          <main className="flex-1 px-4 pt-6 pb-8">
            <p className="text-caption3 text-gray3 text-center">불러오는 중...</p>
          </main>
        </div>
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="bg-beige1 flex min-h-screen justify-center">
        <div className="flex w-full max-w-[430px] flex-col">
          <Header
            variant="backTitleIcon"
            title="함께 읽기"
            onBackClick={handleBack}
            onShareClick={handleShare}
          />
          <main className="flex-1 px-4 pt-6 pb-8">
            <p className="text-caption3 text-gray3 text-center">{error ?? '데이터가 없어요.'}</p>
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
    <div className="bg-beige1 flex min-h-screen justify-center">
      <div className="flex w-full max-w-[430px] flex-col">
        <Header
          variant="backTitleIcon"
          title="함께 읽기"
          onBackClick={() => navigate('/')}
          onShareClick={handleShare}
          className="bg-beige1 sticky top-0 z-50"
        />

        <main className="flex-1 px-4 pt-4 pb-8">
          {/* 책 정보 헤더 */}
          <section className="mb-4">
            <h2 className="text-caption1 ml-4 font-semibold text-black">{title}</h2>
            <p className="text-caption4 text-gray3 mt-1 ml-3">
              참여자 <span className="text-green1">{participantsCount}명</span>
              {' · '}
              남은 기간 <span className="text-green1">D-{dday}</span>
              {' · '}총 <span className="text-green1">{totalPage}p</span>
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
              <h3 className="text-title6 mb-3 text-black">함께 달리는 독서 마라톤</h3>

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
