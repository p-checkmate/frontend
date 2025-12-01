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
        'fixed top-16 left-1/2 z-50 -translate-x-1/2 transition-opacity duration-300',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0',
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
