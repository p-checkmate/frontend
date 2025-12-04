import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Header, Button, Input} from '@/components'; 

import { LoginCharacter } from "@/assets";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  // 1. 유효성 검사 (빈칸 체크)
  const isFilled = email.trim().length > 0
    && password.trim().length > 0
    && passwordCheck.trim().length > 0;

  // 2. 비밀번호 일치 여부 (실시간으로 UI에 보여주기 위해 변수로)
  const isPasswordMatch = password === passwordCheck;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("회원가입 요청 성공:", { email, password });

    // 3. 페이지 이동 (온보딩 페이지로)
    navigate("/onboarding/nickname"); 
  };

  return (
    <div className="bg-beige1 min-h-screen flex flex-col items-center">
      {/* ===== 헤더 ===== */}
      <Header
        variant="back"
        onBackClick={() => navigate(-1)}
        className="w-full"
      />

      {/* ===== 컨텐츠 영역 ===== */}
      <div className="w-full max-w-[375px] px-6 flex flex-col flex-1">
        {/* 타이틀 + 캐릭터 */}
        <div className="relative">
          <h1 className="text-title1 text-black whitespace-pre-line pt-4 pl-1">
            새로운 메이트가{"\n"}되어보세요!
          </h1>
          
          {/* 캐릭터*/}
          <LoginCharacter className="absolute right-0 top-[100px] w-[107px] h-[107px]" />
        </div>

        {/* ===== 인풋 영역 ===== */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 mt-[100px] flex-1"
        >
          {/* 이메일 */}
          <div className="flex flex-col gap-3">
            <label className="text-caption2 text-black">이메일</label>
            <Input
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-3">
            <label className="text-caption2 text-black">비밀번호</label>
            <Input
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-caption5 text-gray3">
              영문/숫자 조합 8자 이상이어야 합니다.
            </p>
          </div>

          {/* 비밀번호 재확인 */}
          <div className="flex flex-col gap-3">
            <label className="text-caption2 text-black">비밀번호 재확인</label>
            <Input
              type="password"
              fullWidth
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            {/* 비밀번호가 다르고, 확인칸에 무언가 입력했을 때 에러 메시지 띄우기 */}
            {!isPasswordMatch && passwordCheck.length > 0 && (
               <p className="text-caption5 text-red-500">
                 비밀번호가 일치하지 않습니다.
               </p>
            )}
          </div>

          {/* ===== 다음 버튼 ===== */}
          <div className="mt-auto pb-10">
            <Button
              type="submit"
              variant="solid"
              color="yellow"
              size="lg"
              fullWidth
              // 빈칸이 있거나 비밀번호가 다르면 버튼 비활성화
              disabled={!isFilled || !isPasswordMatch} 
            >
              다음
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;