import * as React from "react";
import { cn } from "@/utils/cn";

type DebateSide = 1 | 2;

interface PositionToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: DebateSide;
  onSideChange?: (next: DebateSide) => void;
}

const SIDE_STYLES: Record<DebateSide, string> = {
  1: "bg-yellow text-black",
  2: "bg-green1 text-white",
};

const PositionToggle: React.FC<PositionToggleProps> = ({
  value,
  onSideChange,
  className,
  disabled,
  ...props
}) => {
  const handleClick = () => {
    if (disabled) return;
    const next = value === 1 ? 2 : 1;
    onSideChange?.(next);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      aria-pressed
      className={cn(
        "cursor-pointer inline-flex items-center justify-center",
        "rounded-m w-16 h-9 text-body3",
        "border border-transparent",
        "transition-colors duration-150",
        SIDE_STYLES[value],
        disabled && "opacity-60 cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {value}번
    </button>
  );
};

export default PositionToggle;
