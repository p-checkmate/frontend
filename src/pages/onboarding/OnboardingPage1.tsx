import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Header, Button, Input, Toast} from '@/components'; 
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { updateNickname } from "@/api/user/nickname.api";

const OnboardingPage1: React.FC = () => {
  const navigate = useNavigate();
  const { nickname, setNickname } = useOnboardingStore();

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

    try {
      setIsLoading(true);

      // 닉네임 PATCH 요청
      const res: any = await updateNickname(nickname);

      // 성공 응답: { status: "success", data: { message: "..." } }
      if (res.status !== "success") {
        const msg =
          res.error?.message || "프로필 설정에 실패했습니다. 다시 시도해 주세요.";
        showToast(msg);
        return;
      }

      // 성공하면 다음 온보딩 페이지로 이동
      navigate("/onboarding/book");
    } catch (error: any) {
      // api.ts에서 ApiError로 던져주는 경우
      showToast(error.message ?? "프로필 설정 중 오류가 발생했습니다.");
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
          type="submit"
          variant="solid"
          color="yellow" 
          size="lg"
          fullWidth
          disabled={!isFilled}
          onClick={handleNext}
        >
          다음
        </Button>
      </div>

    </div>
  );
};

export default OnboardingPage1;