import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header, ToggleTab } from '@/components';
import DiscussionCard from '@/components/common/cards/ListCard';

import {
  fetchLikedQuotes,
  fetchLikedDiscussions,
  type LikedQuotesResponse,
  type LikedDiscussionsResponse,
} from '@/api/mypage/myLiked.api';

import type { UILikedQuote, UILikedDiscussion } from '@/types/myLiked';

// 탭 타입
type Tab = '인용구' | '토론';

// 날짜 포맷
function formatDateLabel(createdAt: string): string {
  return createdAt?.slice(0, 10) ?? '';
}

const MyLiked: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<Tab>('인용구');

  // 데이터 상태
  const [quotes, setQuotes] = useState<UILikedQuote[]>([]);
  const [discussions, setDiscussions] = useState<UILikedDiscussion[]>([]);

  // 로딩/오류 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ==========================
  // API 호출
  // ==========================
  useEffect(() => {
    const loadLikedContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const [likedQuotes, likedDiscussions] = await Promise.all([
            fetchLikedQuotes(),
            fetchLikedDiscussions(),
        ]) as [LikedQuotesResponse, LikedDiscussionsResponse];

        // 인용구 매핑
        const mappedQuotes: UILikedQuote[] = likedQuotes.quotes.map((q) => ({
          id: q.quote_id,
          bookTitle: q.book.title,
          content: q.content,
          tags: q.book.genres ?? [],
          nickname: q.user.nickname,
          dateLabel: formatDateLabel(q.created_at),
          likeCount: q.like_count,
        }));

        // 토론 매핑
        const mappedDiscussions: UILikedDiscussion[] =
          likedDiscussions.discussions.map((d) => ({
            id: d.discussion_id,
            bookTitle: d.book.title,
            title: d.title,
            content: d.content,
            nickname: d.user.nickname,
            dateLabel: formatDateLabel(d.created_at),
            likeCount: d.like_count,
            commentCount: d.comment_count,
          }));

        setQuotes(mappedQuotes);
        setDiscussions(mappedDiscussions);
      } catch (e) {
        console.error('좋아요 한 콘텐츠 로딩 실패:', e);
        setError('좋아요 한 콘텐츠를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadLikedContent();
  }, []);

  // ==========================
  // 로딩 / 오류 처리
  // ==========================
  if (loading) {
    return (
      <div className="bg-beige1 min-h-screen flex items-center justify-center">
        <p className="text-gray3">불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-beige1 min-h-screen flex items-center justify-center">
        <p className="text-red-like">{error}</p>
      </div>
    );
  }

  // ==========================
  // 렌더링
  // ==========================
  return (
    <div className="bg-beige1 min-h-screen w-full relative">
      <Header
        variant="backTitle"
        title="내가 좋아요 한 콘텐츠"
        onBackClick={() => navigate(-1)}
        className="sticky top-0 z-50 bg-beige1"
      />

      <main className="pb-20">
        <section className="px-5 py-4">
          <ToggleTab
            variant="pill"
            options={['인용구', '토론']}
            selected={activeTab}
            onSelect={(tab) => setActiveTab(tab as Tab)}
          />
        </section>

        <section className="px-5 space-y-3">
          {/* 인용구 탭 */}
          {activeTab === '인용구' && (
            <>
              {quotes.length === 0 ? (
                <div className="h-[50vh] flex items-center justify-center text-gray3">
                  좋아요 한 인용구가 없습니다.
                </div>
              ) : (
                quotes.map((q) => (
                  <DiscussionCard
                    key={q.id}
                    type="quote"
                    isLiked={true} // 항상 FilledHeart
                    bookTitle={q.bookTitle}
                    content={q.content}
                    tags={q.tags}
                    nickname={q.nickname}
                    dateLabel={q.dateLabel}
                    likeCount={q.likeCount}
                    onClickCard={() => navigate(`/quote/${q.id}`)}
                  />
                ))
              )}
            </>
          )}

          {/* 토론 탭 */}
          {activeTab === '토론' && (
            <>
              {discussions.length === 0 ? (
                <div className="h-[50vh] flex items-center justify-center text-gray3">
                  좋아요 한 토론이 없습니다.
                </div>
              ) : (
                discussions.map((d) => (
                  <DiscussionCard
                    key={d.id}
                    type="discussion"
                    isLiked={true} // 항상 FilledHeart
                    bookTitle={d.bookTitle}
                    title={d.title}
                    content={d.content}
                    nickname={d.nickname}
                    dateLabel={d.dateLabel}
                    likeCount={d.likeCount}
                    commentCount={d.commentCount}
                    onClickCard={() => navigate(`/debate/${d.id}`)}
                  />
                ))
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyLiked;
