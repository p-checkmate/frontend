import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header, Button, Image, Badge } from "@/components";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import {
  fetchBestsellers,
  type BookItem,
  postFavoriteBooks,
} from "@/api/user/bestseller.api";

type UI_Book = {
  id: number;
  title: string;
  imageUrl: string;
};

const OnboardingPage2: React.FC = () => {
  const navigate = useNavigate();

  const { selectedBookIds, toggleBookSelect } = useOnboardingStore();

  const [books, setBooks] = useState<UI_Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchBestsellers();

        const mappedBooks: UI_Book[] = data.items.map((item: BookItem) => ({
          id: item.itemId,
          title: item.title,
          imageUrl: item.cover,
        }));

        setBooks(mappedBooks);
      } catch (err) {
        console.error("베스트셀러 로딩 실패:", err);
        setError("베스트 셀러 목록을 불러오지 못했어요");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const hasSelection = selectedBookIds.length > 0;

  const handleNext = async () => {
    if (!hasSelection || submitting) return;

    try {
      setSubmitting(true);
      console.log("선택된 책 ID들:", selectedBookIds);
      const bookmarkIds = await postFavoriteBooks(selectedBookIds);
      console.log("서버에 저장된 bookmarkIds:", bookmarkIds);

      navigate("/onboarding/genre");
    } catch (error) {
      console.error("관심 책 저장 실패:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-beige1 h-screen w-full flex flex-col overflow-hidden items-center">
      {/* 1. 헤더 */}
      <Header
        variant="back"
        onBackClick={() => navigate(-1)}
        className="w-full flex-shrink-0"
      />

      {/* 2. 진행 바 */}
      <div className="w-full h-[6px] bg-gray1 flex-shrink-0">
        <div className="h-full bg-green1 w-1/2 transition-all duration-300" />
      </div>

      {/* 3. 스크롤 영역 */}
      <main className="scrollbar-hidden flex-1 w-full max-w-[375px] px-[18px] overflow-y-auto">
        {/* 타이틀 */}
        <section className="mt-5 mb-6">
          <h1 className="text-title3 text-black whitespace-pre-line">
            베스트 셀러 목록에서{"\n"}
            좋아하는 책을 선택해보세요
          </h1>
          <p className="text-body1 text-green2 mt-3">
            최대 5권까지 선택할 수 있어요!
          </p>
        </section>

        {/* 로딩 / 에러 */}
        {loading && (
          <p className="text-body2 text-gray3 pb-4">
            베스트셀러 불러오는 중...
          </p>
        )}

        {error && !loading && (
          <p className="text-body2 text-red-like pb-4">{error}</p>
        )}

        {/* 책 그리드 */}
        {!loading && !error && (
          <section className="grid grid-cols-3 gap-x-4 gap-y-6 pb-4">
            {books.map((book) => {
              const isSelected = selectedBookIds.includes(book.id);
              return (
                <div
                  key={book.id}
                  className="relative aspect-[2/3] w-full cursor-pointer"
                  onClick={() => toggleBookSelect(book.id)}
                >
                  <div className="w-full h-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gray2" />
                    <Image
                      src={book.imageUrl}
                      alt={book.title}
                      className="h-full w-full object-cover"
                      rounded="rounded-none"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-green1/20" />
                    )}
                  </div>

                  <Badge
                    variant="check"
                    visible={isSelected}
                    className="absolute -top-4 -right-4"
                  />
                </div>
              );
            })}
          </section>
        )}
      </main>

      {/* 4. 하단 버튼 영역 */}
      <div className="w-full max-w-[363px] px-[18px] pb-10 bg-beige1 flex-shrink-0 pt-4 relative">
        <div
          className="absolute left-0 right-0 bottom-full h-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, #F9F5E8, transparent)" }}
        />

        <Button
          variant="solid"
          color={hasSelection ? "yellow" : "gray"}
          size="lg"
          fullWidth
          disabled={!hasSelection || submitting}
          onClick={handleNext}
        >
          {submitting ? "저장 중..." : "다음"}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage2;
