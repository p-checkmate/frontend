import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/common/header/Header";
import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";

import loginCharacter from "@/assets/login-character.svg";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ===== 간단한 형식 체크 =====
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const isValid = emailRegex.test(email) && pwRegex.test(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    console.log("로그인 요청:", { email, password });
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
          <h1
            className="
              text-title1 text-black leading-[48px]
              whitespace-pre-line
              pt-4 pl-1
            "
          >
            채크메이트에{"\n"}로그인하세요
          </h1>

          <img
            src={loginCharacter}
            alt="login character"
            className="
              absolute
              right-0
              top-25
              w-[107px] h-[107px]
            "
          />
        </div>

        {/* ===== 인풋 영역 ===== */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 mt-25 flex-1"
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

          {/* ===== 로그인 버튼 ===== */}
          <div className="mt-auto pb-10">
            <Button
              type="submit"
              variant="solid"
              color="yellow"
              size="lg"
              fullWidth
              disabled={!isValid}
            >
              로그인
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
