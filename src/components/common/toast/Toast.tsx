import { cn } from '@/utils/cn';
import { ToastHeart, ToastBookmark } from '@/assets';

export type ToastVariant = 'like' | 'bookmark' | 'alert'; //alert 타입 추가

interface ToastProps {
  variant: ToastVariant;
  visible: boolean;
  /** 토스트에 표시할 문구 (필수) */
  message: string;
  className?: string;
}

const Toast = ({ variant, visible, message, className }: ToastProps) => {
  // 아이콘 결정 로직
  const isLike = variant === 'like';
  const isBookmark = variant === 'bookmark';
  const isAlert = variant === 'alert'; // 이미지 없는 경고용 토스트 추가

  // 아이콘 선택 (이미지 없는 alert일 때는 null)
  const Icon = isLike ? ToastHeart : (isBookmark ? ToastBookmark : null);

  return (
    <div
      className={cn(
        'fixed left-1/2 top-16 z-50 -translate-x-1/2',
        'transition-all duration-300 ease-out',
        visible
          ? 'opacity-100 translate-y-0'
          : 'pointer-events-none opacity-0 translate-y-2',
        className,
      )}
    >
      <div className={cn(
          "flex h-[32px] w-[359px] items-center rounded-full px-4",
          "bg-green1" 
        )}>
        
        {/* 아이콘이 있을 때만 렌더링 */}
        {Icon && <Icon className="mr-2 h-4 w-4 text-white" />}
        
        {/* 아이콘이 없으면(alert) 텍스트를 가운데 정렬하거나 그냥 둠 */}
        <span className={cn("text-body4 text-white", isAlert && "ml-1")}>
            {message}
        </span>
      </div>
    </div>
  );
};

export default Toast;
