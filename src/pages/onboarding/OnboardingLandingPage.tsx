import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/button/Button";

import logoCheckmate from "@/assets/logo-checkmate.svg";
import characterReading from "@/assets/character-reading.svg";

const OnboardingLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // 나중에 실제 로그인 페이지 path에 맞춰서 수정
    navigate("/login");
  };

  const handleSignupClick = () => {
    // 회원가입 첫 단계 경로에 맞춰서 수정 (예: /signup/step1)
    navigate("/signup");
  };

  return (
    <div className="bg-beige1 min-h-screen flex flex-col items-center px-6 py-10">
      {/* 로고 + 캐릭터 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* 체크메이트 로고 텍스트 */}
        <img
          src={logoCheckmate}
          alt="체크메이트 로고"
          className="w-[283px] max-w-full"
        />

        {/* 캐릭터 이미지 */}
        <img
          src={characterReading}
          alt="책 읽는 캐릭터"
          className="w-[254px] max-w-full"
        />
      </div>

      {/* 하단 버튼 영역 */}
      <div className="w-full space-y-3 mt-8">
        <Button
          variant="solid"
          color="green"
          size="lg"
          fullWidth
          onClick={handleLoginClick}
        >
          로그인
        </Button>

        <Button
          variant="solid"
          color="yellow"
          size="lg"
          fullWidth
          onClick={handleSignupClick}
        >
          회원 가입
        </Button>
      </div>
    </div>
  );
};

export default OnboardingLandingPage;
