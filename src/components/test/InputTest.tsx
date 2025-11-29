import { useState } from "react";
import { Button, Input } from "@/components";

const InputPlayground = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  // 6. 인터랙션 테스트용 상태
  const [submitValue, setSubmitValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const handleSubmit = () => {
    // 값이 비어있으면 에러 처리
    if (!submitValue.trim()) {
      setIsError(true);
      setShakeKey((prev) => prev + 1); // key를 변경해 애니메이션 강제 재실행
      return;
    }

    // 성공 시 처리
    setIsError(false);
    alert(`제출 성공: ${submitValue}`);
  };

  return (
    <div className="bg-bg-1 min-h-screen p-6">
      <div className="mx-auto max-w-xl space-y-10">
        <h1 className="text-heading3 font-bold">Input Playground</h1>

        {/* 기본 인풋 */}
        <div className="space-y-2">
          <p className="text-body1">1. Default Input</p>
          <Input
            placeholder="기본 인풋"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            fullWidth
          />
          <p className="text-caption5 text-gray5">
            value: {value1 || "(empty)"}
          </p>
        </div>

        {/* 초록색 variant */}
        <div className="space-y-2">
          <p className="text-body1 font-semibold">2. Primary Input</p>
          <Input
            variant="primary"
            placeholder="초록 variant 인풋"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            fullWidth
          />
          <p className="text-caption5 text-gray5">
            value: {value2 || "(empty)"}
          </p>
        </div>

        {/* disabled */}
        <div className="space-y-2">
          <p className="text-body1 font-semibold">3. Disabled</p>
          <Input disabled placeholder="비활성화 인풋" fullWidth />
        </div>

        {/*인터랙션 테스트*/}
        <div className="space-y-3 rounded-lg border border-gray2 p-4">
          <p className="text-body1 font-semibold">
            4. 인터랙션 테스트 (빈 값 제출 시 에러)
          </p>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                key={shakeKey}
                value={submitValue}
                onChange={(e) => {
                  setSubmitValue(e.target.value);
                  if (isError) setIsError(false);
                }}
                isError={isError}
                placeholder="내용을 입력하세요"
                fullWidth
              />
              {isError && (
                <p className="mt-1 text-caption5 text-red-500">
                  필수 입력 항목입니다!
                </p>
              )}
            </div>
            <Button onClick={handleSubmit} variant="solid" color="green">
              제출
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPlayground;
