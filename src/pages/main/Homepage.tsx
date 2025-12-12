// src/pages/Homepage.tsx
import React, { useEffect, useState } from 'react';
import {
  Header,
  DiscussionCard,
  Image,
  Search,
  TogetherReadCard,
  HorizontalBookScrollSection,
  CardCarousel,
} from '@/components';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import useScrollHide from '@/hooks/useScrollDirection';

import BookCard from '@/components/common/cards/BookSelectCard';
import {
  MOCK_MAIN_BOOKS,
  MOCK_HOT_DISCUSSIONS,
  MOCK_RECOMMENDED_QUOTES,
} from '@/_mocks/mainPageMock';

import { useInfiniteBookSearch } from '@/hooks/useInfiniteBookSearch';
import {
  fetchReadingGroupOverview,
  joinReadingGroup,
  type ReadingGroupOverview,
} from '@/api/main/readingGroup.api';

// 👉 실제 운영에서 사용할 함께 읽기 그룹 ID (백엔드에서 생성 후 알려준 값으로 교체)
const READING_GROUP_ID = 1; // TODO: 백엔드에서 실제 reading_group_id로 변경

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const isHidden = useScrollHide(40);

  // ====== 함께 읽기 상태 ======
  const [readingGroup, setReadingGroup] =
    useState<ReadingGroupOverview | null>(null);
  const [rgLoading, setRgLoading] = useState(true);
  const [rgError, setRgError] = useState<string | null>(null);

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
  } = useInfiniteBookSearch();

  // ====== 함께 읽기 overview 호출 ======
  useEffect(() => {
    const loadReadingGroup = async () => {
      try {
        setRgLoading(true);
        setRgError(null);

        const data = await fetchReadingGroupOverview(READING_GROUP_ID);
        setReadingGroup(data);
      } catch (e) {
        console.error('함께 읽기 정보 로딩 실패:', e);
        setRgError('함께 읽기 정보를 불러올 수 없습니다.');
      } finally {
        setRgLoading(false);
      }
    };

    loadReadingGroup();
  }, []);

  // ====== 함께 읽기 버튼 클릭 핸들러 ======
  const handleTogetherReadClick = async () => {
    if (!readingGroup) return;

    const alreadyJoined = !!readingGroup.my_progress;

    // 아직 참여 안 했으면 join 호출
    if (!alreadyJoined) {
      try {
        await joinReadingGroup(readingGroup.reading_group_id);

        // 낙관적 업데이트 (멤버 수 +1, my_progress 생성)
        setReadingGroup((prev) =>
          prev
            ? {
                ...prev,
                member_count: prev.member_count + 1,
                my_progress:
                  prev.my_progress ??
                  {
                    current_page: 0,
                    memo: null,
                  },
              }
            : prev,
        );
      } catch (e) {
        console.error('함께 읽기 참여 실패:', e);
        alert('함께 읽기에 참여하지 못했어요. 잠시 후 다시 시도해주세요.');
        return;
      }
    }

    // 참여 여부와 관계 없이 방 페이지로 이동
    navigate('/togetherRead');
  };

  return (
    <div className="min-h-screen bg-beige1">
      {/* 상단 헤더 + 검색 */}
      <div className="fixed left-0 right-0 top-0 z-50">
        <Header
          variant="logoMy"
          onMyPageClick={() => navigate('/mypage')}
        />

        <div
          className={cn(
            'flex justify-center pt-1 pb-3 transition-all duration-300',
            'origin-top',
            isHidden
              ? '-translate-y-full opacity-0'
              : 'translate-y-0 opacity-100',
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

      <div className="mx-auto pb-20 pt-27">
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
            readingGroup={readingGroup}
            readingGroupLoading={rgLoading}
            readingGroupError={rgError}
            onClickBook={(id) => navigate(`/book/${id}`)}
            onClickTogetherRead={handleTogetherReadClick}
            onClickDebate={(id) => navigate(`/debate/${id}`)}
          />
        )}
      </div>
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
      <p className="mb-3 text-caption4 text-gray3">
        검색 결과
        {keyword.trim() && `: "${keyword.trim()}"`}
      </p>

      {loading && !hasResults && (
        <p className="py-8 text-center text-caption3 text-gray3">
          검색 중입니다...
        </p>
      )}

      {!loading && !hasResults && (
        <p className="py-10 text-center text-caption3 text-gray3">
          검색 결과가 없습니다.
        </p>
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
            <p className="py-4 text-center text-caption3 text-gray3">
              더 불러오는 중이에요...
            </p>
          )}
          {!hasMore && (
            <p className="py-4 text-center text-caption3 text-gray3">
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
  readingGroup: ReadingGroupOverview | null;
  readingGroupLoading: boolean;
  readingGroupError: string | null;
  onClickBook: (id: number) => void;
  onClickTogetherRead: () => void;
  onClickDebate: (id: number) => void;
};

const DefaultMainSections: React.FC<DefaultMainSectionsProps> = ({
  readingGroup,
  readingGroupLoading,
  readingGroupError,
  onClickBook,
  onClickTogetherRead,
  onClickDebate,
}) => {
  // progress 계산
  //const isJoined = !!readingGroup?.my_progress;
  /*const progressPercent =
    readingGroup && readingGroup.my_progress && readingGroup.total_pages > 0
      ? Math.round(
          (readingGroup.my_progress.current_page /
            readingGroup.total_pages) *
            100,
        )
      : 0;*/

  return (
    <>
      {/* 배너 */}
      <div className="mt-3.5">
        <Image className="h-41 w-full" />
      </div>

{/* 함께 읽기 */}
{!readingGroupLoading && readingGroup && !readingGroupError && (
  <section className="mt-6 px-5">
    <h2 className="mb-4 text-title5 text-black">
      현재 진행되고 있는 함께 읽기
    </h2>

    <CardCarousel className="mt-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const isJoined = !!readingGroup.my_progress;
        const progressPercent =
          readingGroup &&
          readingGroup.my_progress &&
          readingGroup.total_pages > 0
            ? Math.round(
                (readingGroup.my_progress.current_page /
                  readingGroup.total_pages) *
                  100,
              )
            : 0;

        return (
          <TogetherReadCard
            key={index}
            title={readingGroup.title}
            participants={readingGroup.member_count}
            remainDays={readingGroup.days_left}
            isJoined={isJoined}
            progress={progressPercent}
            rank={undefined}
            periodWeeks={3}
            onClick={onClickTogetherRead}
          />
        );
      })}
    </CardCarousel>
  </section>
)}



      {/* AI 추천 도서 */}
      <HorizontalBookScrollSection
        title="님을 위한 AI 추천 도서"
        className="pt-8"
      >
        {MOCK_MAIN_BOOKS.map((b) => (
          <div
            key={b.id}
            className="h-23 w-17 flex-shrink-0"
          >
            <Image
              src={b.coverUrl}
              alt={b.title}
              className="h-full w-full cursor-pointer"
              onClick={() => onClickBook(b.id)}
            />
          </div>
        ))}
      </HorizontalBookScrollSection>

      {/* 인기 도서 */}
      <HorizontalBookScrollSection
        title="체크메이트의 인기 도서"
        className="pt-5"
      >
        {MOCK_MAIN_BOOKS.map((b) => (
          <div
            key={b.id}
            className="h-23 w-17 flex-shrink-0"
          >
            <Image
              src={b.coverUrl}
              alt={b.title}
              className="h-full w-full"
              onClick={() => onClickBook(b.id)}
            />
          </div>
        ))}
      </HorizontalBookScrollSection>

      {/* 뜨거운 토론 */}
      <section className="mt-10">
        <h2 className="px-5 text-title5">
          지금 뜨거운 토론장
        </h2>
        <CardCarousel className="mt-3">
          {MOCK_HOT_DISCUSSIONS.map((d) => (
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
              onClickCard={() => onClickDebate(d.id)}
            />
          ))}
        </CardCarousel>
      </section>

      {/* 인용구 */}
      <section className="mt-10">
        <h2 className="px-5 text-title5">
          나를 위한 인용구
        </h2>
        <CardCarousel className="mt-3">
          {MOCK_RECOMMENDED_QUOTES.map((q) => (
            <DiscussionCard
              key={q.id}
              type="quote"
              bookTitle={q.bookTitle}
              content={q.content}
              tags={q.tags}
              nickname={q.nickname}
              dateLabel={q.dateLabel}
              likeCount={q.likeCount}
            />
          ))}
        </CardCarousel>
      </section>
    </>
  );
};
