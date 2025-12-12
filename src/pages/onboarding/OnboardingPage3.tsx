import React from "react";
import { useNavigate } from "react-router-dom";

import { Header, Button } from "@/components";
import { useOnboardingStore } from "@/store/useOnboardingStore";

import { GENRES, type TopGenre } from "@/constants/genre";

const OnboardingPage3: React.FC = () => {
  const navigate = useNavigate();

  const { selectedTopGenre, setTopGenre } = useOnboardingStore();

  const hasSelection = selectedTopGenre !== null;

  const handleGenreClick = (genre: TopGenre) => {
    if (selectedTopGenre === genre) {
      setTopGenre(null);
    } else {
      setTopGenre(genre);
    }
  };

  const handleNext = () => {
    if (!hasSelection) return;
    console.log("선택된 상위 장르:", selectedTopGenre);
    navigate("/onboarding/subgenre");
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
        <div className="h-full bg-green1 w-3/4 transition-all duration-300" />
      </div>

      {/* 3. 메인 컨텐츠 */}
      <main className="flex-1 w-full max-w-[375px] mx-auto px-[18px] overflow-y-auto">
        {/* 타이틀 영역 */}
        <section className="mt-5 mb-10">
          <h1 className="text-title3 text-black whitespace-pre-line">
            좋아하는 장르를{"\n"}
            알려주세요
          </h1>
        </section>

        {/* 장르 태그 버튼 영역 */}
        <section className="flex flex-wrap gap-x-3 gap-y-4 pb-10">
          {GENRES.map((genre) => (
            <Button
              key={genre}
              variant="tag"
              size="sm"
              selected={selectedTopGenre === genre}
              onClick={() => handleGenreClick(genre)}
            >
              #{genre}
            </Button>
          ))}
        </section>
      </main>

      {/* 4. 하단 버튼 영역 */}
      <div className="w-full max-w-[363px] mx-auto px-[18px] pb-10 bg-beige1 flex-shrink-0 pt-4 relative">
        <Button
          variant="solid"
          color={hasSelection ? "yellow" : "gray"}
          size="lg"
          fullWidth
          disabled={!hasSelection}
          onClick={handleNext}
          className="active:scale-100"
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage3;
