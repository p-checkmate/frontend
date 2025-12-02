import { cn } from '@/utils/cn';
import { ToastHeart, ToastBookmark } from '@/assets';

export type ToastVariant = 'like' | 'bookmark';

interface ToastProps {
  variant: ToastVariant;
  /** true일 때만 보이도록 */
  visible: boolean;
  /** 필요하면 메시지 커스텀, 안 넘기면 기본 문구 */
  message?: string;
  className?: string;
}

const Toast = ({ variant, visible, message, className }: ToastProps) => {
  const isLike = variant === 'like';

  const defaultMessage = isLike
    ? '해당 컨텐츠에 좋아요를 남겼어요.'
    : '나의 책장에 해당 책이 저장되었어요.';

  const Icon = isLike ? ToastHeart : ToastBookmark;

  return (
    <div
      className={cn(
        // 위치
        'fixed left-1/2 top-16 z-50 -translate-x-1/2',
        // 애니메이션 공통
        'transition-all duration-300 ease-out',
        // visible 상태에 따라 fade + 살짝 위/아래 이동
        visible
          ? 'opacity-100 translate-y-0'
          : 'pointer-events-none opacity-0 translate-y-2',
        className,
      )}
    >
      <div className="flex h-[32px] w-[359px] items-center rounded-full bg-green1 px-4">
        <Icon className="mr-2 h-4 w-4 text-white" />
        <span className="text-body4 text-white">
          {message ?? defaultMessage}
        </span>
      </div>
    </div>
  );
};

export default Toast;
