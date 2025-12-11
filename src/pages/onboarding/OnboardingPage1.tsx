import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Button, Input, Toast } from "@/components";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { signup } from "@/api/auth/auth.api";

const OnboardingPage1: React.FC = () => {
  const navigate = useNavigate();

  const { email, password, nickname, setNickname } = useOnboardingStore();

  const [isLoading, setIsLoading] = useState(false);
  const isFilled = nickname.trim().length > 0;

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  const handleNext = async () => {
    if (!isFilled || isLoading) return;

    if (!email || !password) {
      showToast("다시 회원가입 정보를 입력해 주세요.");
      navigate("/signup");
      return;
    }

    try {
      setIsLoading(true);

      const res = await signup({ email, password, nickname });

      const { accessToken, refreshToken, user } = res;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      localStorage.setItem(
        "user",
        JSON.stringify({
          user_id: user.userId,
          email: user.email,
          nickname: user.nickname,
          profile_url:""
        }),
      );

      navigate("/onboarding/book");
    } catch (error: any) {
      showToast(
        error?.response?.data?.error?.message ??
          error.message ??
          "프로필 설정 중 오류가 발생했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-beige1 h-screen w-full flex flex-col overflow-hidden items-center">
      <Toast variant="alert" visible={toastVisible} message={toastMessage} />

      {/* 1. 헤더 */}
      <Header
        variant="back"
        onBackClick={() => navigate(-1)}
        className="w-full flex-shrink-0"
      />

      {/* 2. 진행 바 */}
      <div className="w-full h-[6px] bg-gray1 flex-shrink-0">
        <div className="h-full bg-green1 w-1/4 transition-all duration-300" />
      </div>

      {/* 3. 메인 컨텐츠 영역 */}
      <main className="flex-1 w-full max-w-[375px] mx-auto px-[18px] overflow-y-auto">
        {/* 타이틀 영역 */}
        <section className="mt-5 mb-12">
          <h1 className="text-title3 text-black whitespace-pre-line">
            프로필을 만들어주세요
          </h1>
        </section>

        {/* 닉네임 입력 영역 */}
        <section className="flex flex-col gap-3">
          <label className="text-caption2 text-black pl-[5px]">닉네임</label>
          <Input
            type="text"
            fullWidth
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </section>
      </main>

      {/* 4. 하단 버튼 영역 (고정) */}
      <div className="w-full max-w-[363px] mx-auto px-[18px] pb-10 bg-beige1 flex-shrink-0 pt-4 relative">
        <Button
          type="button"
          variant="solid"
          color="yellow"
          size="lg"
          fullWidth
          disabled={!isFilled || isLoading}
          onClick={handleNext}
        >
          {isLoading ? "가입 중..." : "다음"}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage1;
