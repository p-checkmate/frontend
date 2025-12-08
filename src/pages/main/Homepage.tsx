import React, { useState, useRef } from "react";
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
import { searchBooks, type BookSearchItem } from "@/api/main/search.api";

import {
  MOCK_MAIN_BOOKS,
  MOCK_TOGETHER_READ,
  MOCK_HOT_DISCUSSIONS,
  MOCK_RECOMMENDED_QUOTES,
} from "@/_mocks/mainPageMock";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const togetherRead = MOCK_TOGETHER_READ;

  const [keyword, setKeyword] = useState("");
  const isHidden = useScrollHide(40);

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<BookSearchItem[]>([]);
  const [loading, setLoading] = useState(false);

  const debounceRef = useRef<number | null>(null);

  const runSearch = async (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      setIsSearching(false);
      setSearchResults([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await searchBooks(trimmed, 1, 30);
      setSearchResults(res.items);
      setIsSearching(true);
    } catch (err) {
      console.error("검색 실패:", err);
      setSearchResults([]);
      setIsSearching(true); 
    } finally {
      setLoading(false);
    }
  };

  const handleKeywordChange = (value: string) => {
    setKeyword(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    const timeoutId = window.setTimeout(() => {
      runSearch(value);
    }, 700);

    debounceRef.current = timeoutId;
  };

  const handleSubmit = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    runSearch(keyword);
  };

  return (
    <div className="min-h-screen bg-beige1">
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
              : "translate-y-0 opacity-100"
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
          <section className="px-5">
            <p className="mb-3 text-caption4 text-gray3">
              검색 결과{keyword.trim() && `: "${keyword.trim()}"`}
            </p>

            {loading && (
              <p className="py-8 text-center text-caption3 text-gray3">
                검색 중입니다...
              </p>
            )}

            {!loading && searchResults.length === 0 && (
              <p className="py-10 text-center text-caption3 text-gray3">
                검색 결과가 없습니다.
              </p>
            )}

            <div className="space-y-3">
              {searchResults.map((book) => (
                <BookCard
                  key={book.itemId}
                  title={book.title}
                  subtitle={`${book.author} · ${book.publisher}`}
                  thumbnailUrl={book.cover}
                  tags={book.categoryNames}
                  onClickCard={() => {
                    navigate(`/book/${book.itemId}`);
                  }}
                />
              ))}
            </div>
          </section>
        ) : (
          <>
            {/* ===== 배너 ===== */}
            <div className="mt-3.5">
              <Image className="w-full h-41" />
            </div>

            {/* ===== 함께 읽기 ===== */}
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
                  onClick={() => navigate(`/togetherRead`)}
                />
              </section>
            )}

            {/* ===== AI 추천 도서 ===== */}
            <HorizontalBookScrollSection
              title="님을 위한 AI 추천 도서"
              className="pt-8"
            >
              {MOCK_MAIN_BOOKS.map((b) => (
                <div key={b.id} className="h-23 w-17 flex-shrink-0">
                  <Image
                    src={b.coverUrl}
                    alt={b.title}
                    className="h-full w-full cursor-pointer"
                    onClick={() => navigate(`/book/${b.id}`)}
                  />
                </div>
              ))}
            </HorizontalBookScrollSection>

            {/* ===== 인기 도서 ===== */}
            <HorizontalBookScrollSection
              title="체크메이트의 인기 도서"
              className="pt-5"
            >
              {MOCK_MAIN_BOOKS.map((b) => (
                <div key={b.id} className="h-23 w-17 flex-shrink-0">
                  <Image
                    src={b.coverUrl}
                    alt={b.title}
                    className="h-full w-full"
                    onClick={() => navigate(`/book/${b.id}`)}
                  />
                </div>
              ))}
            </HorizontalBookScrollSection>

            {/* ===== 뜨거운 토론 ===== */}
            <section className="mt-10">
              <h2 className="px-5 text-title5">지금 뜨거운 토론장</h2>
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
                    onClickCard={() => navigate(`/debate/${d.id}`)}
                  />
                ))}
              </CardCarousel>
            </section>

            {/* ===== 인용구 ===== */}
            <section className="mt-10">
              <h2 className="px-5 text-title5">나를 위한 인용구</h2>
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
        )}
      </div>
    </div>
  );
};

export default MainPage;
