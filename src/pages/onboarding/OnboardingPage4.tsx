import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Header, Button } from "@/components";
import { useOnboardingStore } from "@/store/useOnboardingStore";

// 하위 장르 데이터
const SUB_GENRE_DATA: Record<string, string[]> = {
  "소설/문학": ["현대 문학/순수 문학", "추리/스릴러", "판타지/SF", "역사 소설", "로맨스/멜로"],
  "자기계발": ["습관/루틴", "인간관계/소통", "동기부여/마인드셋", "시간/생산성 관리"],
  "경제/경영": ["재테크/투자", "비즈니스 전략", "리더십/조직 관리", "트렌드/미래 예측"],
  "인문학/철학": ["심리학", "철학", "고전", "언어/예술"],
  "과학/기술": ["대중 과학", "IT/코딩", "환경/생명 과학", "우주/천문학"],
  "역사/사회": ["근현대사", "세계사/동양사", "사회학", "지정학"],
  "취미/실용": ["요리/음료", "여행/지도", "미술/사진", "건강/운동"],
};

const OnboardingPage4: React.FC = () => {
  const navigate = useNavigate();

  // Store에서 필요한 상태 가져오기
  const { 
    selectedTopGenre, 
    selectedSubGenres, 
    toggleSubGenre 
  } = useOnboardingStore();

  // [방어 코드] 만약 상위 장르 선택 안 하고 url로 바로 들어왔으면 쫓아냄
  useEffect(() => {
    if (!selectedTopGenre) {
      alert("선호하는 장르를 먼저 선택해주세요!");
      navigate("/onboardingPage3"); // 이전 페이지로 이동
    }
  }, [selectedTopGenre, navigate]);

  // 현재 보여줄 하위 장르 리스트 (상위 장르가 없으면 빈 배열)
  const currentSubGenres = selectedTopGenre ? SUB_GENRE_DATA[selectedTopGenre] : [];

  // 유효성 검사: 1개 이상 3개 이하 (Store에서 3개 제한을 걸지만 UI용으로 확인)
  const hasSelection = selectedSubGenres.length > 0;
  
  // (참고) Store에서 이미 막지만, 화면에 보여주기 위해 3개 꽉 찼는지 확인
  // const isMaxSelected = selectedSubGenres.length >= 3; 

  const handleNext = () => {
    if (!hasSelection) return;
    
    console.log("최종 선택 완료!");
    console.log("상위:", selectedTopGenre);
    console.log("하위:", selectedSubGenres);

    // 축하 페이지로 이동 (가입 프로세스 완료)
    navigate("/signupCelebrate"); 
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
        {/* 마지막 단계니까 100% 꽉 채움 */}
        <div className="h-full bg-green1 w-full transition-all duration-300" />
      </div>

      {/* 3. 메인 컨텐츠 */}
      <main className="flex-1 w-full max-w-[375px] mx-auto px-[18px] overflow-y-auto">
        
        {/* 타이틀 영역 */}
        <section className="mt-5 mb-10">
          <h1 className="text-title3 text-black whitespace-pre-line">
            {/* 상위 장르 이름에 따라 타이틀이 바뀜  */}
            {selectedTopGenre ? `${selectedTopGenre} 중에서도\n어떤 분야를 좋아하시나요?` : "어떤 분야를 좋아하시나요?"}
          </h1>
          {/* 부연 설명 */}
          <p className="text-body1 text-green2 mt-3">
            최대 3개까지 선택할 수 있어요
          </p>
        </section>

        {/* 하위 장르 태그 버튼 영역 */}
        <section className="flex flex-wrap gap-x-3 gap-y-4 pb-10">
          {currentSubGenres.map((subGenre) => (
            <Button
              key={subGenre}
              variant="tag"
              size="sm"
              
              // 선택 여부 확인
              selected={selectedSubGenres.includes(subGenre)}
              
              // 클릭 시 Store의 함수 실행 (3개 제한 로직 포함됨)
              onClick={() => toggleSubGenre(subGenre)}
            >
              #{subGenre}
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

export default OnboardingPage4;