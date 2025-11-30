import * as React from "react";
import { cn } from "@/utils/cn";

type InputVariant = "default" | "primary";

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  variant?: InputVariant;
  fullWidth?: boolean;
  isError?: boolean;
}

const INPUT_VARIANT: Record<InputVariant, string> = {
  default: "border-gray1 bg-beige2 placeholder:text-gray2",
  primary: "border-green1 bg-beige2 placeholder:text-gray2",
};

const Input: React.FC<InputProps> = ({
  variant = "default",
  fullWidth,
  isError,
  disabled,
  className,
  ...props
}) => {
  return (
    <input
      disabled={disabled}
      className={cn(
        "text-body4 placeholder:text-body1",
        "rounded-[5px] h-9 border px-3 outline-none",
        "transition-colors duration-150",

        INPUT_VARIANT[variant],

        fullWidth && "w-full",

        "focus:ring-1",
        variant === "default" && "ring-black",
        variant === "primary" && "ring-green1",
        isError && "border-red-500 focus:ring-red-500 animate-shake",

        disabled && "bg-gray1 text-gray3 text-body1 cursor-not-allowed",

        className,
      )}
      {...props}
    />
  );
};

export default Input;
