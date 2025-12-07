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
  onUpdate 
}) => {
  // --- State (순수 입력창 제어용) ---
  const [readPageStr, setReadPageStr] = useState<string>('');
  const [memo, setMemo] = useState<string>(initialMemo || ''); 
  const [toast, setToast] = useState({ visible: false, message: '' });

  // [핵심 로직] 표시할 페이지 수 계산
  const currentDisplayPage = readPageStr !== '' ? Number(readPageStr) : initialReadPage;

  // 퍼센트 계산
  const percent = totalPage > 0 && currentDisplayPage > 0
    ? Math.floor((currentDisplayPage / totalPage) * 100) 
    : 0;

  // --- Handlers ---
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
    // 입력값이 없을 때 방지
    if (readPageStr === '' && memo === '') {
      setToast({ visible: true, message: '업데이트할 내용을 입력해주세요!' });
      return;
    }

    const newPage = readPageStr !== '' ? Number(readPageStr) : initialReadPage;
    
    // 1. 백엔드로 데이터 전송
    if (onUpdate) {
      onUpdate(newPage, memo);
    }
    
    // 2. 입력창 초기화
    setReadPageStr('');
    setMemo('');

    // 3. 토스트 메시지
    setToast({ visible: true, message: '독서 기록이 업데이트 되었어요!' });
  };

  // 토스트 타이머
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  return (
    <div className="relative flex w-[312px] h-[291px] flex-col justify-between rounded-m bg-beige2 p-6 shadow-sm box-border">
      
      {/* --- 상단 정보 (진행률) --- */}
      <div className="flex flex-col gap-1 mb-2">
        <span className="text-caption4 text-gray3">
          내 진행
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-title6 text-black">
            {currentDisplayPage > 0 ? `${percent}%` : '-%'}
          </span>
          <span className="text-caption5 text-gray3">
            {currentDisplayPage > 0 ? `(${currentDisplayPage}p)` : '(-p)'}
          </span>
        </div>
      </div>

      {/* --- 입력 폼 영역 --- */}
      <div className="flex flex-col gap-4 items-center w-full mt-2">
        
        {/* 1. 읽은 페이지 입력 */}
        <div className={cn(
          "relative w-[277px] h-[68px] rounded-m border bg-transparent transition-colors",
          "border-[#B4B4B4] focus-within:border-[#276D6A]"
        )}>
          <label className="absolute top-[12px] left-[14px] text-caption4 text-gray3">
            내가 읽은 페이지
          </label>
          
          <input
            type="text"
            inputMode="numeric"
            value={readPageStr}
            onChange={handlePageChange}
            className="absolute bottom-[10px] left-[14px] w-[180px] bg-transparent text-caption4 text-black outline-none placeholder:text-gray2"
            placeholder="0"
          />
          
          <span className="absolute bottom-[12px] right-[14px] text-caption4 text-gray3">
            p/{totalPage}p
          </span>
        </div>

        {/* 2. 한줄 감상 입력 */}
        <div className={cn(
          "relative w-[277px] h-[68px] rounded-m border bg-transparent transition-colors",
          "border-[#B4B4B4] focus-within:border-[#276D6A]"
        )}>
          <label className="absolute top-[12px] left-[14px] text-caption4 text-gray3">
            한줄 감상/메모
          </label>
          
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="absolute bottom-[10px] left-[14px] w-[240px] bg-transparent text-caption4 text-black outline-none placeholder:text-gray2"
            placeholder="내용을 입력해주세요"
          />
        </div>

        {/* 3. 업데이트 버튼 */}
        <button
          onClick={handleUpdateClick}
          className="flex h-[34px] w-[197px] items-center justify-center rounded-full bg-green1 transition-all hover:bg-green2 active:scale-95" 
        >
          <span className="text-caption4 font-medium text-white">
            업데이트
          </span>
        </button>
      </div>

      <Toast 
        variant='alert'
        message={toast.message}
        visible={toast.visible}
      />
    </div>
  );
};

export default MyReadCard;