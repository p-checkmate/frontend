import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Button, Input, Toast } from "@/components";
import { LoginCharacter } from "@/assets";
import { postLogin } from "@/api/auth/login.api";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const isFilled = email.trim().length > 0 && password.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFilled || loading) return;

    try {
      setLoading(true);

      const data = await postLogin({ email, password });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err: any) {
      console.error(err);

      const message =
        err?.message || "로그인에 실패했습니다. 이메일/비밀번호를 확인해주세요.";

      setToastMessage(message);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    } finally {
      setLoading(false);
    }
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
              text-title1 text-black
              whitespace-pre-line
              pt-4 pl-1
            "
          >
            채크메이트에{"\n"}로그인하세요
          </h1>

          <LoginCharacter
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
              disabled={!isFilled || loading}
            >
              {loading ? "로그인 중..." : "로그인"}
            </Button>
          </div>
        </form>
      </div>

      <Toast
        variant="alert"
        visible={toastVisible}
        message={toastMessage}
      />
    </div>
  );
};

export default LoginPage;
