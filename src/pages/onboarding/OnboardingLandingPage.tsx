import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/button/Button";
import { LogoCheckmate, CharacterReading } from "@/assets";

const OnboardingLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // 로그인으로
    navigate("/login");
  };

  const handleSignupClick = () => {
    // 회원가입으로
    navigate("/signup");
  };

  return (
    <div className="bg-beige1 min-h-screen flex flex-col items-center px-6 py-10">
      {/* 로고 + 캐릭터 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">

        {/* 채크메이트 로고 텍스트*/}
        <LogoCheckmate className="w-[283px] max-w-full"/>

        {/* 캐릭터 이미지*/}
        <CharacterReading className="w-[254px] max-w-full"/>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="w-full space-y-10 mt-8"> {/*버튼 간격 조정: 40px*/}
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
