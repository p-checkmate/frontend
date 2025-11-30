import * as React from "react";
import { cn } from "@/utils/cn";

interface BaseModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode; // 본문
  footer?: React.ReactNode; // 아래 버튼 영역
  className?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  className,
}) => {
  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/30"
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          "w-[90%] max-w-[360px] rounded-l bg-white px-6 py-5 shadow-md",
          "space-y-4",
          className,
        )}
      >
        {title && <h2 className="text-caption2 text-center">{title}</h2>}

        <div>{children}</div>

        {footer && <div className="mt-4 w-full">{footer}</div>}
      </div>
    </div>
  );
};

export default BaseModal;
