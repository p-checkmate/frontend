import React, { useEffect, useRef, useState } from 'react';
import {
  Header,
  DiscussionCard,
  Image,
  Search,
  TogetherReadCard,
  HorizontalBookScrollSection,
  CardCarousel,
  ChatFloater,
} from '@/components';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import useScrollHide from '@/hooks/useScrollDirection';

import BookCard from '@/components/common/cards/BookSelectCard';

import { useInfiniteBookSearch } from '@/hooks/useInfiniteBookSearch';
import {
  fetchReadingGroupsOverviews,
  fetchReadingGroupMembers,
  joinReadingGroup,
  type ReadingGroupOverview,
} from '@/api/main/readingGroup.api';
import { Banner } from '@/assets';

import { fetchPopularBooks, fetchRecommendedBooks, type MainBookThumb } from '@/api/main/book.api';

import {
  fetchDiscussions,
  fetchQuotes,
  type DiscussionItem,
  type QuoteItem,
} from '@/api/main/community.api';
import { getCurrentUser } from '@/utils/auth';

// 운영에서 “메인에 노출할 그룹 5개”를 room_id로 고정
const READING_GROUP_IDS = [1, 3, 5, 7, 9];

// rank 포함 타입(Homepage에서만 사용)
type ReadingGroupWithRank = ReadingGroupOverview & {
  my_rank?: number;
};

function calcMyRankFromMembers(
  members: Array<{ current_page: number; is_current_user: boolean }>,
  totalPageCount: number,
) {
  if (!totalPageCount || totalPageCount <= 0) return undefined;

  const toPercent = (p: number) => Math.min(100, Math.floor((p / totalPageCount) * 100));

  const me = members.find((m) => m.is_current_user);
  if (!me) return undefined;

  const myPercent = toPercent(me.current_page);

  // 공동등수: 내 퍼센트보다 "엄격히 큰" 사람 수 + 1
  const higherCount = members.filter((m) => toPercent(m.current_page) > myPercent).length;

  return higherCount + 1;
}

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const isHidden = useScrollHide(40);

  // ====== 함께 읽기 상태 (5개) ======
  const [readingGroups, setReadingGroups] = useState<ReadingGroupWithRank[]>([]);
  const [rgLoading, setRgLoading] = useState(true);
  const [rgError, setRgError] = useState<string | null>(null);

  // ====== AI 추천 / 인기 도서 상태 ======
  const [recommendedBooks, setRecommendedBooks] = useState<MainBookThumb[]>([]);
  const [popularBooks, setPopularBooks] = useState<MainBookThumb[]>([]);
  const [bookLoading, setBookLoading] = useState(true);
  const [bookError, setBookError] = useState<string | null>(null);

  // ====== 토론/인용구 상태 ======
  const [hotDiscussions, setHotDiscussions] = useState<DiscussionItem[]>([]);
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [communityLoading, setCommunityLoading] = useState(true);
  const [communityError, setCommunityError] = useState<string | null>(null);

  // ====== 검색 훅 ======
  const {
    keyword,
    isSearching,
    results,
    loading,
    isLoadingMore,
    pagination,
    handleKeywordChange,
    handleSubmit,
    loadMoreRef,
    resetSearch,
  } = useInfiniteBookSearch();

  // ====== 함께 읽기 5개 overview + rank 계산 ======
  useEffect(() => {
    const load = async () => {
      try {
        setRgLoading(true);
        setRgError(null);

        const list = await fetchReadingGroupsOverviews(READING_GROUP_IDS);

        // overview map
        const overviewMap = new Map(list.map((g) => [g.reading_group_id, g]));

        // members도 병렬로 불러와 rank 계산 (실패해도 카드 뜨게)
        const membersResults = await Promise.all(
          READING_GROUP_IDS.map(async (groupId) => {
            try {
              const data = await fetchReadingGroupMembers(groupId);
              return { groupId, data };
            } catch (e) {
              console.warn('members 로딩 실패:', groupId, e);
              return { groupId, data: null as any };
            }
          }),
        );

        const membersMap = new Map(membersResults.map((x) => [x.groupId, x.data]));

        // READING_GROUP_IDS 순서대로 정렬 + rank 합치기
        const ordered = READING_GROUP_IDS.map((id) => {
          const ov = overviewMap.get(id);
          if (!ov) return null;

          const m = membersMap.get(id);

          const my_rank =
            m?.members && m?.total_page_count
              ? calcMyRankFromMembers(m.members, m.total_page_count)
              : undefined;

          return {
            ...ov,
            my_rank,
          } as ReadingGroupWithRank;
        }).filter(Boolean) as ReadingGroupWithRank[];

        setReadingGroups(ordered);
      } catch (e) {
        console.error('함께 읽기 정보 로딩 실패:', e);
        setRgError('함께 읽기 정보를 불러올 수 없습니다.');
      } finally {
        setRgLoading(false);
      }
    };

    load();
  }, []);

  // ====== AI 추천 / 인기 도서 API 연결 ======
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setBookLoading(true);
        setBookError(null);

        const [rec, pop] = await Promise.all([fetchRecommendedBooks(), fetchPopularBooks()]);

        setRecommendedBooks(rec ?? []);
        setPopularBooks(pop ?? []);
      } catch (e) {
        console.error('도서 섹션 로딩 실패:', e);
        setBookError('도서 정보를 불러올 수 없습니다.');
      } finally {
        setBookLoading(false);
      }
    };

    loadBooks();
  }, []);

  // ====== 토론 / 인용구 API 연결 ======
  useEffect(() => {
    const loadCommunity = async () => {
      try {
        setCommunityLoading(true);
        setCommunityError(null);

        const [d, q] = await Promise.all([fetchDiscussions(), fetchQuotes()]);
        setHotDiscussions(d ?? []);
        setQuotes(q ?? []);
      } catch (e) {
        console.error('토론/인용구 섹션 로딩 실패:', e);
        setCommunityError('토론/인용구 정보를 불러올 수 없습니다.');
      } finally {
        setCommunityLoading(false);
      }
    };

    loadCommunity();
  }, []);

  // ====== join + 이동 ======
  const handleTogetherReadClick = async (groupId: number) => {
    const target = readingGroups.find((g) => g.reading_group_id === groupId);
    if (!target) return;

    const alreadyJoined = !!target.my_progress;

    if (!alreadyJoined) {
      try {
        await joinReadingGroup(groupId);

        setReadingGroups((prev) =>
          prev.map((g) =>
            g.reading_group_id === groupId
              ? {
                  ...g,
                  member_count: g.member_count + 1,
                  my_progress: g.my_progress ?? {
                    current_page: 0,
                    memo: null,
                  },
                }
              : g,
          ),
        );
      } catch (e) {
        console.error('함께 읽기 참여 실패:', e);
        alert('함께 읽기에 참여하지 못했어요. 잠시 후 다시 시도해주세요.');
        return;
      }
    }

    navigate(`/togetherRead/${groupId}`);
  };

  // === AI 챗 핸들러 ===
  const handleChatClick = () => {
    navigate(`/ai`);
  };

  return (
    <div className="bg-beige1 min-h-screen">
      {/* 상단 헤더 + 검색 */}
      <div className="fixed top-0 right-0 left-0 z-50">
        <Header
          variant="logoMy"
          onLogoClick={() => {
            if (isSearching) resetSearch();
          }}
          onMyPageClick={() => navigate('/mypage')}
        />

        <div
          className={cn(
            'flex justify-center pt-1 pb-3 transition-all duration-300',
            isHidden
              ? 'pointer-events-none -translate-y-full opacity-0'
              : 'pointer-events-auto translate-y-0 opacity-100',
          )}
        >
          <Search
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="찾고 싶은 책이 있나요?"
            onSubmit={handleSubmit}
            className="px-7"
          />
        </div>
      </div>

      <div className="mx-auto pt-27 pb-20">
        {isSearching ? (
          <SearchResultSection
            keyword={keyword}
            results={results}
            loading={loading}
            isLoadingMore={isLoadingMore}
            hasMore={pagination.hasMore}
            loadMoreRef={loadMoreRef}
            onClickBook={(itemId) => navigate(`/book/${itemId}`)}
          />
        ) : (
          <DefaultMainSections
            readingGroups={readingGroups}
            readingGroupLoading={rgLoading}
            readingGroupError={rgError}
            recommendedBooks={recommendedBooks}
            popularBooks={popularBooks}
            bookLoading={bookLoading}
            bookError={bookError}
            onClickBook={(id) => navigate(`/book/${id}`)}
            onClickTogetherRead={handleTogetherReadClick}
            onClickDebate={(id) => navigate(`/debate/${id}`)}
            hotDiscussions={hotDiscussions}
            quotes={quotes}
            communityLoading={communityLoading}
            communityError={communityError}
            onClickQuote={(quoteId) => navigate(`/quote/${quoteId}`)}
          />
        )}
      </div>
      {!isSearching && <ChatFloater onClick={handleChatClick} />}
    </div>
  );
};

export default MainPage;

/* ===========================
 * 검색 결과 섹션
 * =========================== */
type SearchResultSectionProps = {
  keyword: string;
  results: Array<{
    itemId: number;
    title: string;
    author: string;
    publisher: string;
    cover: string;
    categoryNames: string[];
  }>;
  loading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  onClickBook: (itemId: number) => void;
};

const SearchResultSection: React.FC<SearchResultSectionProps> = ({
  keyword,
  results,
  loading,
  isLoadingMore,
  hasMore,
  loadMoreRef,
  onClickBook,
}) => {
  const hasResults = results.length > 0;

  return (
    <section className="px-5">
      <p className="text-caption4 text-gray3 mb-3">
        검색 결과
        {keyword.trim() && `: "${keyword.trim()}"`}
      </p>

      {loading && !hasResults && (
        <p className="text-caption3 text-gray3 py-8 text-center">검색 중입니다...</p>
      )}

      {!loading && !hasResults && (
        <p className="text-caption3 text-gray3 py-10 text-center">검색 결과가 없습니다.</p>
      )}

      <div className="space-y-3">
        {results.map((book) => (
          <BookCard
            key={book.itemId}
            title={book.title}
            subtitle={`${book.author} · ${book.publisher}`}
            thumbnailUrl={book.cover}
            tags={book.categoryNames}
            onClickCard={() => onClickBook(book.itemId)}
          />
        ))}
      </div>

      {hasResults && (
        <>
          <div ref={loadMoreRef} className="h-10 w-full" />
          {isLoadingMore && (
            <p className="text-caption3 text-gray3 py-4 text-center">더 불러오는 중이에요...</p>
          )}
          {!hasMore && (
            <p className="text-caption3 text-gray3 py-4 text-center">
              검색 결과를 모두 불러왔어요.
            </p>
          )}
        </>
      )}
    </section>
  );
};

/* ===========================
 * 기본 메인 섹션
 * =========================== */
type DefaultMainSectionsProps = {
  readingGroups: ReadingGroupWithRank[];
  readingGroupLoading: boolean;
  readingGroupError: string | null;

  recommendedBooks: MainBookThumb[];
  popularBooks: MainBookThumb[];
  bookLoading: boolean;
  bookError: string | null;

  onClickBook: (id: number) => void;
  onClickTogetherRead: (groupId: number) => void;
  onClickDebate: (id: number) => void;

  hotDiscussions: DiscussionItem[];
  quotes: QuoteItem[];
  communityLoading: boolean;
  communityError: string | null;
  onClickQuote: (quoteId: number) => void;
};

const DefaultMainSections: React.FC<DefaultMainSectionsProps> = ({
  readingGroups,
  readingGroupLoading,
  readingGroupError,
  recommendedBooks,
  popularBooks,
  bookLoading,
  bookError,
  onClickBook,
  onClickTogetherRead,
  onClickDebate,
  hotDiscussions,
  quotes,
  communityLoading,
  communityError,
  onClickQuote,
}) => {
  const user = getCurrentUser();
  const nickname = user?.nickname ?? '';
  return (
    <>
      {/* 배너 */}
      <div className="mt-3.5">
        <Image src={Banner} className="w-full" />
      </div>

      {/* 함께 읽기 (5개 캐러셀) */}
      {!readingGroupLoading && !readingGroupError && readingGroups.length > 0 && (
        <section className="mt-8">
          <h2 className="text-title5 mb-4 px-5 text-black">현재 진행되고 있는 함께 읽기</h2>

          <TogetherReadCarousel items={readingGroups} onClickTogetherRead={onClickTogetherRead} />
        </section>
      )}

      {/* AI 추천 도서 */}
      <HorizontalBookScrollSection title={`${nickname}님을 위한 AI 추천 도서`} className="pt-10">
        {bookLoading ? (
          <div className="text-caption4 text-gray3 px-5 py-2">불러오는 중...</div>
        ) : bookError ? (
          <div className="text-caption4 text-gray3 px-5 py-2">{bookError}</div>
        ) : (
          recommendedBooks.map((b) => (
            <div key={b.itemId} className="h-26 w-18 flex-shrink-0">
              <Image
                src={b.thumbnailUrl}
                alt=""
                className="h-full w-full cursor-pointer"
                onClick={() => onClickBook(b.itemId)}
              />
            </div>
          ))
        )}
      </HorizontalBookScrollSection>

      {/* 인기 도서 */}
      <HorizontalBookScrollSection title="체크메이트의 인기 도서" className="pt-6">
        {bookLoading ? (
          <div className="text-caption4 text-gray3 px-5 py-2">불러오는 중...</div>
        ) : bookError ? (
          <div className="text-caption4 text-gray3 px-5 py-2">{bookError}</div>
        ) : (
          popularBooks.map((b) => (
            <div key={b.itemId} className="h-26 w-18 flex-shrink-0">
              <Image
                src={b.thumbnailUrl}
                alt=""
                className="h-full w-full cursor-pointer"
                onClick={() => onClickBook(b.itemId)}
              />
            </div>
          ))
        )}
      </HorizontalBookScrollSection>

      {/* 뜨거운 토론 */}
      <section className="mt-10">
        <h2 className="text-title5 px-5">지금 뜨거운 토론장</h2>

        {communityLoading ? (
          <div className="text-caption4 text-gray3 px-5 py-4">불러오는 중...</div>
        ) : communityError ? (
          <div className="text-caption4 text-gray3 px-5 py-4">{communityError}</div>
        ) : (
          <CardCarousel className="mt-3">
            {hotDiscussions.map((d) => (
              <DiscussionCard
                key={d.discussion_id}
                type="discussion"
                bookTitle={d.book.title}
                title={d.title}
                content={d.content}
                nickname={d.user.nickname}
                dateLabel={formatDateLabel(d.created_at)}
                likeCount={d.like_count}
                commentCount={d.comment_count}
                onClickCard={() => onClickDebate(d.discussion_id)}
              />
            ))}
          </CardCarousel>
        )}
      </section>

      {/* 인용구 */}
      <section className="mt-10">
        <h2 className="text-title5 px-5">인기 있는 인용구</h2>

        {communityLoading ? (
          <div className="text-caption4 text-gray3 px-5 py-4">불러오는 중...</div>
        ) : communityError ? (
          <div className="text-caption4 text-gray3 px-5 py-4">{communityError}</div>
        ) : (
          <CardCarousel className="mt-3">
            {quotes.map((q) => (
              <DiscussionCard
                key={q.quote_id}
                type="quote"
                bookTitle={q.book.title}
                content={q.content}
                tags={(q.book.genres ?? []).slice(0, 2)}
                nickname={q.user.nickname}
                dateLabel={formatDateLabel(q.created_at)}
                likeCount={q.like_count}
                onClickCard={() => onClickQuote(q.quote_id)}
              />
            ))}
          </CardCarousel>
        )}
      </section>
    </>
  );
};

/* ===========================
 * 함께 읽기 캐러셀
 * =========================== */
function TogetherReadCarousel({
  items,
  onClickTogetherRead,
}: {
  items: ReadingGroupWithRank[];
  onClickTogetherRead: (groupId: number) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const slideCount = items.length;

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const { scrollLeft, clientWidth } = el;
    const idx = Math.round(scrollLeft / clientWidth);
    setActive(Math.max(0, Math.min(slideCount - 1, idx)));
  };

  const goTo = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;

    const x = idx * el.clientWidth;
    el.scrollTo({ left: x, behavior: 'smooth' });
  };

  return (
    <div className="mt-1">
      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className={cn('flex w-full snap-x snap-mandatory overflow-x-auto', 'scrollbar-hide')}
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {items.map((g) => {
          const isJoined = !!g.my_progress;
          const progressPercent =
            g.my_progress && g.total_pages > 0
              ? Math.floor((g.my_progress.current_page / g.total_pages) * 100)
              : 0;
          const totalDays = g.total_days;

          return (
            <div
              key={g.reading_group_id}
              className={cn('w-full flex-shrink-0 snap-center', 'px-5 py-[2px]')}
            >
              <TogetherReadCard
                title={g.title}
                participants={g.member_count}
                remainDays={g.days_left}
                isJoined={isJoined}
                progress={progressPercent}
                rank={g.my_rank}
                totalDays={totalDays}
                thumbnailUrl={g.thumbnail_url ?? undefined}
                onClick={() => onClickTogetherRead(g.reading_group_id)}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex justify-center gap-1">
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={cn('h-[7px] w-[7px] rounded-full', i === active ? 'bg-gray3' : 'bg-gray2')}
            aria-label={`slide-${i}`}
          />
        ))}
      </div>
    </div>
  );
}

function formatDateLabel(isoString: string) {
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return isoString;

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}
