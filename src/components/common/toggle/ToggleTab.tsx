import type { ToggleTabProps } from './ToggleTab.types';
import { cn } from '@/utils/cn';

const ToggleTab = ({ options, selected, onSelect, variant }: ToggleTabProps) => {
  const selectedIndex = options.findIndex((option) => option === selected);

  // ========================
  // 1. pill 토글
  // ========================
  if (variant === 'pill') {
    // 전체 컨테이너 너비와 슬라이더 너비 정의
    const CONTAINER_WIDTH = 335; 
    const SLIDER_WIDTH = 152;    
    const SIDE_PADDING = 8;

    const sliderLeft = selectedIndex === 0 
          ? SIDE_PADDING 
          : CONTAINER_WIDTH - SLIDER_WIDTH - SIDE_PADDING; 
    return (
      <div className="flex justify-center">
        <div
          className={cn('relative h-[49px]', 'rounded-m bg-green1', 'overflow-hidden')}
          style={{ width: `${CONTAINER_WIDTH}px` }}
        >
          {/* 흰색 슬라이더 */}
          <div
            className={cn(
              'absolute top-1.5 h-[37px]',
              'rounded-m bg-beige2',
              'transition-all duration-200',
              'flex items-center justify-center',
            )}
            style={{
              width: `${SLIDER_WIDTH}px`,
              left: `${sliderLeft}px`,
            }}
          />

          {/* 버튼들 */}
          <div className="relative z-10 flex h-full">
            {options.map((option) => {
              const isActive = option === selected;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onSelect(option)}
                  className={cn(
                    'text-caption3 flex-1 cursor-pointer', //cursor-pointer 추가
                    'transition-colors duration-200',
                    isActive ? 'text-black' : 'text-white',
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ========================
  // 2. underline 토글
  // ========================
  if (variant === 'underline') {
    const index = options.findIndex((o) => o === selected);

    return (
      <div className="bg-beige2 w-full">
        <div className="bg-gray4 h-[3px] w-full" />

        {/* 탭 영역 */}
        <div className="border-gray2 relative flex border-b">
          {/* 움직이는 검정 밑줄 */}
          <div
            className="absolute bottom-0 h-[2px] bg-black transition-all duration-200"
            style={{
              width: '50%',
              left: `${index * 50}%`,
            }}
          />
          {options.map((option) => {
            const isActive = option === selected;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(option)}
                className={cn(
                  'text-caption3 flex-1 cursor-pointer py-3 text-center', //cursor-pointer 추가
                  isActive ? 'text-black' : 'text-black/50',
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

export default ToggleTab;
