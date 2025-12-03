import * as React from 'react';
import { cn } from '@/utils/cn';

type TextareaVariant = 'default' | 'primary';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  fullWidth?: boolean;
  isError?: boolean;
}

const TEXTAREA_VARIANT: Record<TextareaVariant, string> = {
  default: 'border-gray1 bg-beige2 placeholder:text-gray2',
  primary: 'border-green1 bg-beige2 placeholder:text-gray2',
};

const Textarea: React.FC<TextareaProps> = ({
  variant = 'default',
  fullWidth,
  isError,
  disabled,
  className,
  ...props
}) => {
  return (
    <textarea
      disabled={disabled}
      className={cn(
        'text-body4',
        'rounded-[4px] border px-3 py-2 outline-none',
        'resize-none transition-colors duration-150',

        TEXTAREA_VARIANT[variant],

        fullWidth && 'w-full',

        'focus:ring-1',
        !isError && 'ring-green1',
        isError && 'animate-shake border-red-500 focus:ring-red-500',

        disabled && 'bg-gray1 text-gray3 cursor-not-allowed',

        className,
      )}
      {...props}
    />
  );
};

export default Textarea;
