import React, { useState } from "react";
import { cn } from "@/utils/cn";
import Badge from "@/components/common/badge/Badge";
import { HeartIcon, HeartFilled, MoreIcon } from "@/assets";

type CardType = "discussion" | "quote";

interface DiscussionCardProps {
  type: CardType;
  bookTitle: string;
  title?: string;
  content: string;
  tags?: string[];
  nickname: string;
  dateLabel: string;
  likeCount: number;
  commentCount?: number;
  className?: string;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({
  type,
  bookTitle,
  title,
  content,
  tags,
  nickname,
  dateLabel,
  likeCount,
  commentCount,
  className,
}) => {
  const isQuote = type === "quote";

  // 좋아요 상태
  const [liked, setLiked] = useState(false);
  const displayLikeCount = likeCount + (liked ? 1 : 0);

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  return (
    <div
      className={cn("rounded-l bg-white px-5 py-5 shadow-sm w-full", className)}
    >
      {/* 제목 영역 */}
      <div className="flex justify-between">
        <div className="space-y-1">
          <p className="pt-1 text-title5 text-black">{bookTitle}</p>
        </div>

        <button className="cursor-pointer">
          <MoreIcon className="w-5" />
        </button>
      </div>

      {!isQuote && <p className="pt-1 text-title6 text-black">{title}</p>}

      {/* 내용 */}
      <p className="mt-2 pr-7 text-body5 text-gray4 line-clamp-2">{content}</p>

      {/* 태그 (최대 2개) */}
      {isQuote && tags && tags.length > 0 && (
        <div className="mt-3.5 flex gap-2">
          {tags.slice(0, 2).map((t) => (
            <Badge key={t} variant="tag" label={`#${t}`} />
          ))}
        </div>
      )}

      {/* 하단 */}
      <div className="mt-4 flex justify-between items-center">
        {/* 닉네임 + 날짜 */}
        <div className="flex items-center gap-2 text-body4 text-gray3">
          <span>{nickname}</span>
          <span>|</span>
          <span>{dateLabel}</span>
        </div>

        {/* 좋아요 / 댓글 */}
        <div className="flex items-center gap-2">
          {/* 좋아요 버튼 */}
          <button
            onClick={toggleLike}
            className="cursor-pointer flex items-center gap-1 text-body4 h-6 px-3 rounded-m border border-gray2"
          >
            <span
              className={cn(
                "flex items-center justify-center w-4 h-4 flex-shrink-0",
                liked && "animate-like-bump",
              )}
            >
              {liked ? (
                <HeartFilled className="w-4 h-4" />
              ) : (
                <HeartIcon className="w-4 h-4" />
              )}
            </span>
            <span>{displayLikeCount}</span>
          </button>

          {/* 댓글 뱃지 (토론 타입만) */}
          {!isQuote && typeof commentCount === "number" && (
            <Badge variant="comment" comment={commentCount} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;
