import { cn } from '@/utils/cn';
import { ToastHeart, ToastBookmark } from '@/assets';

export type ToastVariant = 'like' | 'bookmark';

interface ToastProps {
  variant: ToastVariant;
  visible: boolean;
  /** 토스트에 표시할 문구 (필수) */
  message: string;
  className?: string;
}

const Toast = ({ variant, visible, message, className }: ToastProps) => {
  const isLike = variant === 'like';
  const Icon = isLike ? ToastHeart : ToastBookmark;

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
      <div className="flex h-[32px] w-[359px] items-center rounded-full bg-green1 px-4">
        <Icon className="mr-2 h-4 w-4 text-white" />
        <span className="text-body4 text-white">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
