import React from "react";
import { cn } from "@/utils/cn";
import { CloseIcon } from "@/assets";
import { Image, Badge } from "@/components";

interface BookCardProps {
  thumbnailUrl?: string;
  title: string;
  subtitle: string; // 책 정보 (저자 등)
  tags?: string[];
  className?: string;
  onClickCard?: () => void;

  // 마이페이지에서만...
  showRemoveButton?: boolean;
  onClickRemove?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({
  thumbnailUrl,
  title,
  subtitle,
  tags,
  className,
  onClickCard,
  showRemoveButton,
  onClickRemove,
}) => {
  return (
    <div
      onClick={onClickCard}
      className={cn(
        "relative flex items-center gap-4 rounded-l bg-white px-5 py-[15px] w-full border border-transparent shadow-sm",
        "transition-all duration-150",
        "cursor-pointer hover:shadow-md hover:ring-1 hover:ring-[var(--color-green1)]",
        className,
      )}
    >
      {showRemoveButton && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // 상세 페이지 이동 막기
            onClickRemove?.();
          }}
          className="cursor-pointer absolute top-4 right-4"
        >
          <CloseIcon className="w-4" />
        </button>
      )}
      {/* 썸네일 */}
      <div className="h-[80px] w-[60px] bg-gray1 overflow-hidden flex-shrink-0">
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={title}
            className="h-full w-full object-cover"
            rounded="rounded-none"
          />
        )}
      </div>

      {/* 내용 */}
      <div className="flex-1">
        {/* 태그 (최대 2개) */}
        {tags && tags.length > 0 && (
          <div className="mb-2 flex gap-2">
            {tags.slice(0, 2).map((t, idx) => (
              <Badge key={`${t}-${idx}`} variant="tag" label={`#${t}`} />
            ))}
          </div>
        )}

        <p className="text-title6 text-black">{title}</p>
        <p className="mt-1 text-body4 text-gray3">{subtitle}</p>
      </div>
    </div>
  );
};

export default BookCard;
