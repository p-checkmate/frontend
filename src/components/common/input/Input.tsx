import * as React from 'react';
import { cn } from '@/utils/cn';

type InputVariant = 'default' | 'primary';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  fullWidth?: boolean;
  isError?: boolean;
}

const INPUT_VARIANT: Record<InputVariant, string> = {
  default: 'border-gray1 bg-beige2 text-black placeholder:text-gray2',
  primary: 'border-green1 bg-beige2 text-black placeholder:text-gray2',
};

const Input: React.FC<InputProps> = ({
  variant = 'default',
  fullWidth,
  isError,
  className,
  ...props
}) => {
  return (
    <input
      className={cn(
        'rounded-m h-10 border px-3 outline-none',
        'transition-colors duration-150',

        INPUT_VARIANT[variant],

        fullWidth && 'w-full',

        'focus:ring-1',
        !isError && 'focus:ring-green3',
        isError && 'animate-shake border-red-500 focus:ring-red-500',

        'disabled:bg-gray1 disabled:text-gray4 disabled:cursor-not-allowed',

        className,
      )}
      {...props}
    />
  );
};

export default Input;
