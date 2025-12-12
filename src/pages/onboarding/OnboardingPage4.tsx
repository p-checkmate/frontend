import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header, Button, Toast } from "@/components";
import { useOnboardingStore } from "@/store/useOnboardingStore";

// 하위 장르 데이터 : constants에서 데이터 불러오기
import { SUB_GENRE_DATA, GENRE_ID_MAP } from "@/constants/genre";
import { postFavoriteGenres } from "@/api/user/genre.api";

const OnboardingPage4: React.FC = () => {
  const navigate = useNavigate();

  // Toast 상태 관리
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    "선호하는 장르를 먼저 선택해주세요!",
  );

  // 로딩 상태
  const [loading, setLoading] = useState(false);

  // Store에서 필요한 상태 가져오기
  const {
    selectedTopGenre,
    selectedSubGenres,
    toggleSubGenre,
  } = useOnboardingStore();

  // [방어 코드] 만약 상위 장르 선택 안 하고 url로 바로 들어왔으면 쫓아냄 - Toast 사용
  useEffect(() => {
    if (!selectedTopGenre) {
      setToastMessage("선호하는 장르를 먼저 선택해주세요!");
      setToastVisible(true);

      const timer = setTimeout(() => {
        navigate("/onboarding/genre", { replace: true });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [selectedTopGenre, navigate]);

  // 현재 보여줄 하위 장르 리스트 (상위 장르가 없으면 빈 배열)
  const currentSubGenres = selectedTopGenre
    ? SUB_GENRE_DATA[selectedTopGenre]
    : [];

  // 유효성 검사: 1개 이상 3개 이하 (Store에서 3개 제한을 걸지만 UI용으로 확인)
  const hasSelection = selectedSubGenres.length > 0;

  // =========================
  // 다음 버튼 클릭 → API 호출
  // =========================
  const handleNext = async () => {
    if (!hasSelection || !selectedTopGenre || loading) return;

    try {
      setLoading(true);

      // 선택된 하위 장르 문자열들을 genreId로 변환
      const genreIds = selectedSubGenres
        .map((name) => GENRE_ID_MAP[name])
        .filter((id): id is number => typeof id === "number");

      if (!genreIds.length) {
        setToastMessage("선택한 장르에 해당하는 ID를 찾을 수 없습니다.");
        setToastVisible(true);
        return;
      }

      // API 호출
      await postFavoriteGenres(genreIds);

      // 축하 페이지로 이동 (가입 프로세스 완료)
      navigate("/signupCelebrate");
    } catch (error: any) {
      console.error(error);
      const msg =
        error?.message ||
        error?.error?.message ||
        "선호 장르 저장 중 오류가 발생했습니다.";
      setToastMessage(msg);
      setToastVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-beige1 h-screen w-full flex flex-col overflow-hidden items-center">
      {/* Toast 컴포넌트 배치 : variant="alert"를 사용하여 이미지 없이 텍스트만 */}
      <Toast variant="alert" visible={toastVisible} message={toastMessage} />

      {/* 1. 헤더 */}
      <Header
        variant="back"
        onBackClick={() => navigate(-1)}
        className="w-full flex-shrink-0"
      />

      {/* 2. 진행 바 */}
      <div className="w-full h-[6px] bg-gray1 flex-shrink-0">
        <div className="h-full bg-green1 w-full transition-all duration-300" />
      </div>

      {/* 3. 메인 컨텐츠 */}
      <main className="flex-1 w-full max-w-[375px] mx-auto px-[18px] overflow-y-auto">
        {/* 타이틀 영역 */}
        <section className="mt-5 mb-10">
          <h1 className="text-title3 text-black whitespace-pre-line">
            {selectedTopGenre
              ? `${selectedTopGenre} 중에서도\n어떤 분야를 좋아하시나요?`
              : "어떤 분야를 좋아하시나요?"}
          </h1>
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
              selected={selectedSubGenres.includes(subGenre)}
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
          disabled={!hasSelection || loading}
          onClick={handleNext}
          className="active:scale-100"
        >
          {loading ? "저장 중..." : "다음"}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage4;
