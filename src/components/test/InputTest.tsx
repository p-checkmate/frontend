import { useState } from 'react';
import { Input } from '@/components';

const InputPlayground = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  return (
    <div className="bg-bg-1 min-h-screen p-6">
      <div className="mx-auto max-w-xl space-y-10">
        <h1 className="text-heading3 font-bold">Input Playground</h1>

        {/* 기본 인풋 */}
        <div className="space-y-2">
          <p className="text-body1 font-semibold">1. Default Input</p>
          <Input
            placeholder="기본 인풋"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            fullWidth
          />
          <p className="text-caption5 text-gray5">value: {value1 || '(empty)'}</p>
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
          <p className="text-caption5 text-gray5">value: {value2 || '(empty)'}</p>
        </div>

        {/* className으로 크기 조절 */}
        <div className="space-y-3">
          <p className="text-body1 font-semibold">3. Custom Size</p>

          <Input className="text-caption5 h-8 px-2" placeholder="작은 인풋" />
          <Input className="text-body1 h-12 px-4" placeholder="큰 인풋" />
        </div>

        {/* disabled */}
        <div className="space-y-2">
          <p className="text-body1 font-semibold">4. Disabled</p>
          <Input disabled placeholder="비활성화 인풋" fullWidth />
        </div>

        {/* error */}
        <div className="space-y-2">
          <p className="text-body1 font-semibold">5. Error 상태</p>
          <Input variant="primary" isError placeholder="에러 인풋" fullWidth />
            </div>
      </div>

      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="animate-shake h-24 w-24 bg-red-400" />
        </div>
          </div>
  );
};

export default InputPlayground;
