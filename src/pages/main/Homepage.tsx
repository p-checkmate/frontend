// src/pages/Homepage.tsx
import React from "react";
import {
  Header,
  DiscussionCard,
  Image,
  Search,
  TogetherReadCard,
  HorizontalBookScrollSection,
  CardCarousel,
} from "@/components";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";
import useScrollHide from "@/hooks/useScrollDirection";

import BookCard from "@/components/common/cards/BookSelectCard";
import {
  MOCK_MAIN_BOOKS,
  MOCK_TOGETHER_READ,
  MOCK_HOT_DISCUSSIONS,
  MOCK_RECOMMENDED_QUOTES,
} from "@/_mocks/mainPageMock";

import { useInfiniteBookSearch } from "@/hooks/useInfiniteBookSearch";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const isHidden = useScrollHide(40);
  const togetherRead = MOCK_TOGETHER_READ;

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

  return (
    <div className="min-h-screen bg-beige1">
      {/* 상단 헤더 + 검색 */}
      <div className="fixed left-0 right-0 top-0 z-50">
        <Header
          variant="logoMy"
          onMyPageClick={() => navigate("/mypage")}
        />

        <div
          className={cn(
            "flex justify-center pt-1 pb-3 transition-all duration-300",
            "origin-top",
            isHidden
              ? "-translate-y-full opacity-0"
              : "translate-y-0 opacity-100",
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
            onClickBook={(itemId) =>
              navigate(`/book/${itemId}`)
            }
          />
        ) : (
          <DefaultMainSections
            togetherRead={togetherRead}
            onClickBook={(id) => navigate(`/book/${id}`)}
            onClickTogetherRead={() =>
              navigate("/togetherRead")
            }
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
  loadMoreRef: React.RefObject<HTMLDivElement|null>;
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
  togetherRead: (typeof MOCK_TOGETHER_READ) | null;
  onClickBook: (id: number) => void;
  onClickTogetherRead: () => void;
  onClickDebate: (id: number) => void;
};

const DefaultMainSections: React.FC<
  DefaultMainSectionsProps
> = ({
  togetherRead,
  onClickBook,
  onClickTogetherRead,
  onClickDebate,
}) => {
  return (
    <>
      {/* 배너 */}
      <div className="mt-3.5">
        <Image className="h-41 w-full" />
      </div>

      {/* 함께 읽기 */}
      {togetherRead && (
        <section className="mt-6 px-5">
          <h2 className="mb-4 text-title5 text-black">
            현재 진행되고 있는 함께 읽기
          </h2>

          <TogetherReadCard
            title={togetherRead.title}
            participants={togetherRead.participants}
            remainDays={togetherRead.remainDays}
            isJoined={togetherRead.isJoined}
            progress={togetherRead.progress}
            rank={togetherRead.rank}
            thumbnailUrl={togetherRead.thumbnailUrl}
            onClick={onClickTogetherRead}
          />
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
