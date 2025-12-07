import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Button, Input, Toast } from "@/components";
import { LoginCharacter } from "@/assets";

import { signup } from "@/api/auth/auth.api";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      showToast("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await signup({ email, password });

      const { accessToken, refreshToken } = res;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/onboarding/nickname");
    } catch (error: any) {
      showToast(error.message ?? "회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="bg-beige1 min-h-screen flex flex-col items-center">

      <Toast
        variant="alert"
        visible={toastVisible}
        message={toastMessage}
      />

      <Header
        variant="back"
        onBackClick={() => navigate(-1)}
        className="w-full"
      />

      <div className="w-full max-w-[375px] px-6 flex flex-col flex-1">
        <div className="relative">
          <h1 className="text-title1 text-black whitespace-pre-line pt-4 pl-1">
            새로운 메이트가{"\n"}되어보세요!
          </h1>

          <LoginCharacter className="absolute right-0 top-[100px] w-[107px] h-[107px]" />
        </div>

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
          </div>

          {/* 다음 버튼 */}
          <div className="mt-auto pb-10">
            <Button
              type="submit"
              variant="solid"
              color="yellow"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "가입 중..." : "다음"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
