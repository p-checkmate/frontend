import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header, ToggleTab, DiscussionCard } from '@/components';
import {
  fetchMyQuotes,
  fetchMyDiscussions,
  fetchLikedQuotes,
  fetchLikedDiscussions,
  type MyQuotesResponse,
  type MyDiscussionsResponse,
  type LikedQuotesResponse,
  type LikedDiscussionsResponse,
} from '@/api/mypage/mywrite.api';

// UI 타입 src/types 에서 import
import type { UIQuote, UIDiscussion } from '@/types/mywrite';

// 탭 타입
type Tab = '인용구' | '토론';

// 날짜 문자열을 간단히 포맷하는 함수 (created_at → YYYY-MM-DD 정도)
function formatDateLabel(createdAt: string): string {
  if (!createdAt) return '';
  if (createdAt.length >= 10) {
    return createdAt.slice(0, 10);
  }
  return createdAt;
}

const MyWrite: React.FC = () => {
  const navigate = useNavigate();

  // 1. 탭 상태 관리 (기본값: 인용구)
  const [activeTab, setActiveTab] = useState<Tab>('인용구');

  // 2. 데이터 상태
  const [quotes, setQuotes] = useState<UIQuote[]>([]);
  const [discussions, setDiscussions] = useState<UIDiscussion[]>([]);

  // 3. 로딩 / 에러 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ==========================
  // 4. API 호출
  // ==========================
  useEffect(() => {
    const loadMyContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const [
          myQuotes,
          myDiscussions,
          likedQuotes,
          likedDiscussions,
        ] = await Promise.all([
          fetchMyQuotes(),
          fetchMyDiscussions(),
          fetchLikedQuotes(),
          fetchLikedDiscussions(),
        ]);

        // 좋아요 된 quote/discussion id 집합
        const likedQuoteIds = new Set(
          (likedQuotes as LikedQuotesResponse).quotes.map((q) => q.quote_id),
        );
        const likedDiscussionIds = new Set(
          (likedDiscussions as LikedDiscussionsResponse).discussions.map(
            (d) => d.discussion_id,
          ),
        );

        // 인용구 매핑
        const mappedQuotes: UIQuote[] = (myQuotes as MyQuotesResponse).quotes.map(
          (q) => ({
            id: q.quote_id,
            bookTitle: q.book.title,
            content: q.content,
            tags: q.book.genres ?? [],
            nickname: q.user.nickname,
            dateLabel: formatDateLabel(q.created_at),
            likeCount: q.like_count,
            isLiked: likedQuoteIds.has(q.quote_id),
          }),
        );

        // 토론 매핑
        const mappedDiscussions: UIDiscussion[] = (
          myDiscussions as MyDiscussionsResponse
        ).discussions.map((d) => ({
          id: d.discussion_id,
          bookTitle: d.book.title,
          title: d.title,
          content: d.content,
          nickname: d.user.nickname,
          dateLabel: formatDateLabel(d.created_at),
          likeCount: d.like_count,
          commentCount: d.comment_count,
          isLiked: likedDiscussionIds.has(d.discussion_id),
        }));

        setQuotes(mappedQuotes);
        setDiscussions(mappedDiscussions);
      } catch (e) {
        console.error('내가 작성한 콘텐츠 로딩 실패:', e);
        setError('내가 작성한 인용구/토론을 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadMyContent();
  }, []);

  // ==========================
  // 5. 로딩 / 에러 처리
  // ==========================

  if (loading) {
    return (
      <div className="bg-beige1 min-h-screen flex items-center justify-center">
        <p className="text-body1 text-gray3">불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-beige1 min-h-screen flex items-center justify-center">
        <p className="text-body1 text-red-like">{error}</p>
      </div>
    );
  }

  // ==========================
  // 6. 정상 렌더링
  // ==========================
  return (
    <div className="bg-beige1 min-h-screen w-full relative">
      {/* 1. 헤더 */}
      <Header
        variant="backTitle"
        title="내가 작성한 콘텐츠"
        onBackClick={() => navigate(-1)}
        className="sticky top-0 z-50 bg-beige1"
      />

      <main className="w-full pb-20">
        {/* 2. 토글 탭 영역 */}
        <section className="px-5 py-4">
          <ToggleTab
            variant="pill"
            options={['인용구', '토론']}
            selected={activeTab}
            onSelect={(option) => setActiveTab(option as Tab)}
          />
        </section>

        {/* 3. 콘텐츠 리스트 영역 */}
        <section className="px-5 space-y-3">
          {/* (A) 인용구 리스트 */}
          {activeTab === '인용구' && (
            <>
              {quotes.length === 0 ? (
                <div className="text-body3 text-gray3 mt-10 text-center">
                  작성한 인용구가 없습니다.
                </div>
              ) : (
                quotes.map((q) => (
                  <DiscussionCard
                    key={q.id}
                    type="quote"
                    bookTitle={q.bookTitle}
                    content={q.content}
                    tags={q.tags}
                    nickname={q.nickname}
                    dateLabel={q.dateLabel}
                    likeCount={q.likeCount}
                    isLiked={q.isLiked}
                    onClickCard={() => navigate(`/quote/${q.id}`)}
                  />
                ))
              )}
            </>
          )}

          {/* (B) 토론 리스트 */}
          {activeTab === '토론' && (
            <>
              {discussions.length === 0 ? (
                <div className="text-body3 text-gray3 mt-10 text-center">
                  작성한 토론이 없습니다.
                </div>
              ) : (
                discussions.map((d) => (
                  <DiscussionCard
                    key={d.id}
                    type="discussion"
                    bookTitle={d.bookTitle}
                    title={d.title}
                    content={d.content}
                    nickname={d.nickname}
                    dateLabel={d.dateLabel}
                    likeCount={d.likeCount}
                    commentCount={d.commentCount}
                    isLiked={d.isLiked}
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

export default MyWrite;
