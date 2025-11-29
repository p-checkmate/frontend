import React from 'react';
import { cn } from '@/utils/cn';

type ButtonVariant = 'solid' | 'outline' | 'tag';
type ButtonColor = 'green' | 'yellow' | 'gray';
type ButtonSize = 'lg' | 'md' | 'sm';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  selected?: boolean;
}

const SIZE_STYLES: Record<ButtonSize, string> = {
  lg: 'h-12 px-6 text-caption1',
  md: 'h-9.5 px-5.5 text-caption5',
  sm: 'h-8 px-5 text-body1',
};

const BASE_STYLE =
  'cursor-pointer inline-flex items-center justify-center rounded-m transition-colors duration-150 active:scale-95 disabled:cursor-not-allowed';

const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  color = 'green',
  size = 'md',
  fullWidth,
  selected,
  disabled,
  className,
  children,
  ...props
}) => {
  let style = '';

  // ==== SOLID 버튼 ====
  if (variant === 'solid') {
    if (disabled) {
      style = 'bg-gray1 btn-text-gray3';
    } else {
      style = cn(
        color === 'green' && 'bg-green1 btn-text-white hover:bg-green2',
        color === 'yellow' && 'bg-yellow btn-text-black hover:brightness-95',
        color === 'gray' && 'bg-gray2 btn-text-white hover:bg-gray3'
      );
    }
  }

  // ==== OUTLINE 버튼 ====
  if (variant === 'outline') {
    style = cn(
      'bg-transparent',
      color === 'green' &&
        'btn-text-green1 border border-green1 hover:bg-beige2',
      color === 'gray' &&
        'btn-text-gray3 border border-gray3 hover:bg-gray1'
    );
  }

  // ==== TAG 버튼 ====
  if (variant === 'tag') {
    style = cn(
      selected ? 'bg-yellow btn-text-black' : 'bg-green1 btn-text-white'
    );
  }

  return (
    <button
      {...props}
      disabled={disabled}
      className={cn(
        BASE_STYLE,
        SIZE_STYLES[size],
        fullWidth && 'w-full',
        style,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
