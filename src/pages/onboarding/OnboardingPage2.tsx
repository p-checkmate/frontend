import React from "react";
import { useNavigate } from "react-router-dom";

import {Header, Button, Image, Badge} from '@/components';

import { useOnboardingStore } from "@/store/useOnboardingStore";

// 타입 및 더미 데이터
type Book = {
  id: number;
  title: string;
  imageUrl: string;
};

const dummyBooks: Book[] = Array.from({ length: 100 }).map((_, idx) => ({
  id: idx + 1,
  title: `Book ${idx + 1}`,
  imageUrl: `https://picsum.photos/seed/onboarding-${idx}/200/300`,
}));

const OnboardingPage2: React.FC = () => {
  const navigate = useNavigate();

  // useState 대신 store
  // 이 데이터는 페이지를 떠나도 사라지지 않게 한다.
  const { selectedBookIds, toggleBookSelect } = useOnboardingStore();

  const hasSelection = selectedBookIds.length > 0;

  const handleNext = () => {
    if (!hasSelection) return;
    console.log("선택된 책 ID들:", selectedBookIds);
    navigate("/onboardingPage3");
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
      <main className="flex-1 w-full max-w-[375px] px-[18px] overflow-y-auto">
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

        <section className="grid grid-cols-3 gap-x-4 gap-y-6 pb-4">
          {dummyBooks.map((book) => {
            // store에서 가져온 selectedBookIds로 확인
            const isSelected = selectedBookIds.includes(book.id);
            return (
              <div
                key={book.id}
                className="relative aspect-[2/3] w-full cursor-pointer"
                // store에 있는 함수 실행
                onClick={() => toggleBookSelect(book.id)}
              >
                <div className="w-full h-full rounded-m overflow-hidden relative">
                  <div className="absolute inset-0 bg-gray2" /> 
                  <Image
                    src={book.imageUrl}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                  {isSelected && <div className="absolute inset-0 bg-green1/20" />}
                </div>

                <Badge
                  variant="check"
                  visible={isSelected}
                  className="absolute top-0 right-0"
                />
              </div>
            );
          })}
        </section>
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
          disabled={!hasSelection}
          onClick={handleNext}
        >
          다음
        </Button>
      </div>

    </div>
  );
};

export default OnboardingPage2;