import React from "react";
import { useNavigate } from "react-router-dom";

import { Header, Button } from "@/components";
import { useOnboardingStore } from "@/store/useOnboardingStore";

// 선택할 장르 목록
const GENRES = [
  "소설/문학",
  "자기계발",
  "경제/경영",
  "과학/기술",
  "인문학/철학",
  "역사/사회",
  "취미/실용",
];

const OnboardingPage3: React.FC = () => {
  const navigate = useNavigate();

  // Store에서 상태와 변경 함수 가져오기
  const { selectedTopGenre, setTopGenre } = useOnboardingStore();

  // 하나라도 선택되었는지 확인 (버튼 활성화용)
  const hasSelection = selectedTopGenre !== null;

  // 장르 클릭 핸들러 (단일 선택 로직)
  const handleGenreClick = (genre: string) => {
    if (selectedTopGenre === genre) {
      // 이미 선택된 걸 누르면 선택 해제 (Toggle Off)
      setTopGenre(null);
    } else {
      // 새로운 걸 누르면 기존 것 대체 (Switch)
      setTopGenre(genre);
    }
  };

  const handleNext = () => {
    if (!hasSelection) return;
    
    console.log("선택된 상위 장르:", selectedTopGenre);
    navigate("/onboardingPage4");
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
        {/* 진행률 약 75% */}
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
              
              // 선택 상태: Store의 값과 현재 버튼의 장르가 같으면 true
              selected={selectedTopGenre === genre}
              
              // 클릭 이벤트 연결
              onClick={() => handleGenreClick(genre)}
            >
              #{genre}
            </Button>
          ))}
        </section>
      </main>

      {/* 4. 하단 버튼 영역 (위치 고정) */}
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