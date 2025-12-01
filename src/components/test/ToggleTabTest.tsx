import { useState } from 'react';
import ToggleTab from '@/components/common/toggle';

const ToggleTabTest = () => {
  type PillTab = '인용구' | '토론';
  type UnderlineTab = '토론' | '인용구';

  const [pillSelected, setPillSelected] = useState<PillTab>('인용구');
  const [underlineSelected, setUnderlineSelected] =
    useState<UnderlineTab>('토론');

  const handlePillSelect = (option: string) =>
    setPillSelected(option as PillTab);

  const handleUnderlineSelect = (option: string) =>
    setUnderlineSelected(option as UnderlineTab);

  return (
    <div className="min-h-screen bg-beige1 px-4 py-6 space-y-10">
      {/* ex) 내가 좋아요 한 콘텐츠 상단 pill 토글 스타일 */}
      <section className="space-y-3">
        <p>1. pill 토글 (인용구 / 토론)</p>
        <ToggleTab
          options={['인용구', '토론']}
          selected={pillSelected}
          onSelect={handlePillSelect}
          variant="pill"
        />
        <p>
          현재 선택: <b>{pillSelected}</b>
        </p>
      </section>

      {/* 책 상세 페이지 – 탭 밑줄 스타일의 토글 */}
      <section className="space-y-3">
        <p>2. 밑줄 토글 (책 상세 - 토론 / 인용구)</p>
        <ToggleTab
          options={['토론', '인용구']}
          selected={underlineSelected}
          onSelect={handleUnderlineSelect}
          variant="underline"
        />
        <p>
          현재 선택: <b>{underlineSelected}</b>
        </p>
      </section>
    </div>
  );
};

export default ToggleTabTest;
