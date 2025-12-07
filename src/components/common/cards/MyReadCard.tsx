import React, { useState, useEffect } from 'react';
import Toast from '@/components/common/toast/Toast';
import { cn } from '@/utils/cn';

interface MyReadCardProps {
  totalPage: number;          // 전체 페이지 수
  initialReadPage?: number;   // 백엔드에 저장된 페이지 (DB 데이터)
  initialMemo?: string;       // 백엔드에 저장된 메모 (DB 데이터)
  onUpdate?: (readPage: number, memo: string) => void;
}

const MyReadCard: React.FC<MyReadCardProps> = ({
  totalPage,
  initialReadPage = 0,
  initialMemo = '',
  onUpdate,
}) => {
  const [readPageStr, setReadPageStr] = useState<string>('');
  const [memo, setMemo] = useState<string>(initialMemo || '');
  const [toast, setToast] = useState({ visible: false, message: '' });

  const currentDisplayPage =
    readPageStr !== '' ? Number(readPageStr) : initialReadPage;

  const percent =
    totalPage > 0 && currentDisplayPage > 0
      ? Math.floor((currentDisplayPage / totalPage) * 100)
      : 0;

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setReadPageStr('');
      return;
    }

    if (!/^\d+$/.test(value)) {
      setToast({ visible: true, message: '숫자만 입력할 수 있어요!' });
      return;
    }

    if (Number(value) > totalPage) {
      setToast({ visible: true, message: '전체 페이지를 초과할 수 없어요!' });
      return;
    }

    setReadPageStr(value);
  };

  const handleUpdateClick = () => {
    if (readPageStr === '' && memo === '') {
      setToast({ visible: true, message: '업데이트할 내용을 입력해주세요!' });
      return;
    }

    const newPage = readPageStr !== '' ? Number(readPageStr) : initialReadPage;

    if (onUpdate) {
      onUpdate(newPage, memo);
    }

    setReadPageStr('');
    setMemo('');
    setToast({ visible: true, message: '독서 기록이 업데이트 되었어요!' });
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  return (
    <div className="relative flex w-full max-w-[440px] h-[291px] flex-col justify-between rounded-m bg-beige2 p-6 shadow-sm box-border">
      {/* --- 상단 정보 (진행률) --- */}
      <div className="mb-2 flex flex-col gap-1">
        <span className="text-caption4 text-gray3 ml-1">내 진행</span>
        <div className="flex items-baseline gap-1">
          <span className="text-title6 text-black ml-1">
            {currentDisplayPage > 0 ? `${percent}%` : '-%'}
          </span>
          <span className="text-caption5 text-gray3">
            {currentDisplayPage > 0 ? `(${currentDisplayPage}p)` : '(-p)'}
          </span>
        </div>
      </div>

      {/* --- 입력 폼 영역 --- */}
      <div className="mt-2 flex w-full flex-col items-center gap-4">
        {/* 1. 읽은 페이지 입력 */}
        <div
          className={cn(
            'relative h-[68px] w-full rounded-m border bg-transparent transition-colors',
            'border-[#B4B4B4] focus-within:border-[#276D6A]',
          )}
        >
          <label className="absolute left-[14px] top-[12px] text-caption4 text-gray3">
            내가 읽은 페이지
          </label>

          {/* 입력 */}
          <input
            type="text"
            inputMode="numeric"
            value={readPageStr}
            onChange={handlePageChange}
            className="absolute bottom-[10px] left-[14px] right-[70px] bg-transparent text-caption4 text-black outline-none placeholder:text-gray2"
            placeholder="0"
          />

          <span className="absolute bottom-[12px] right-[14px] text-caption4 text-gray3">
            p/{totalPage}p
          </span>
        </div>

        {/* 2. 한줄 감상 입력 */}
        <div
          className={cn(
            'relative h-[68px] w-full rounded-m border bg-transparent transition-colors',
            'border-[#B4B4B4] focus-within:border-[#276D6A]',
          )}
        >
          <label className="absolute left-[14px] top-[12px] text-caption4 text-gray3">
            한줄 감상/메모
          </label>

          {/* 입력 */}
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="absolute bottom-[10px] left-[14px] right-[14px] bg-transparent text-caption4 text-black outline-none placeholder:text-gray2"
            placeholder="내용을 입력해주세요"
          />
        </div>

        {/* 3. 업데이트 버튼 */}
        <button
          onClick={handleUpdateClick}
          className="flex h-[34px] w-[197px] items-center justify-center rounded-full bg-green1 transition-all hover:bg-green2 active:scale-95 cursor-pointer"
        >
          <span className="text-caption4 font-medium text-white">업데이트</span>
        </button>
      </div>

      {/* 토스트 */}
      <Toast
        variant="alert"
        message={toast.message}
        visible={toast.visible}
      />
    </div>
  );
};

export default MyReadCard;
