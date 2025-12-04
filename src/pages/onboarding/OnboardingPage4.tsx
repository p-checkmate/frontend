import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header, Button, Toast } from "@/components";
import { useOnboardingStore } from "@/store/useOnboardingStore";

// 하위 장르 데이터 : constants에서 데이터 불러오기
import { SUB_GENRE_DATA } from "@/constants/genre";

const OnboardingPage4: React.FC = () => {
  const navigate = useNavigate();

  // Toast 상태 관리
  const [toastVisible, setToastVisible] = useState(false);

  // Store에서 필요한 상태 가져오기
  const { 
    selectedTopGenre, 
    selectedSubGenres, 
    toggleSubGenre 
  } = useOnboardingStore();

  // [방어 코드] 만약 상위 장르 선택 안 하고 url로 바로 들어왔으면 쫓아냄 - Toast 사용
  useEffect(() => {
    if (!selectedTopGenre) {
      // 1. 토스트 띄우기
      setToastVisible(true);

      // 2. 사용자가 토스트를 볼 시간을 주고(1.5초 뒤) 페이지 이동
      const timer = setTimeout(() => {
        navigate("/onboarding/genre", { replace: true });
      }, 1500);

      return () => clearTimeout(timer);
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
      
      {/* Toast 컴포넌트 배치 : variant="alert"를 사용하여 이미지 없이 텍스트만 */}
      <Toast 
        variant="alert" 
        visible={toastVisible} 
        message="선호하는 장르를 먼저 선택해주세요!" 
      />

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