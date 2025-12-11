import React from 'react';
import { cn } from '@/utils/cn';
import Badge from '@/components/common/badge/Badge';
import { HeartIcon, HeartFilled, MoreIcon } from '@/assets';

type CardType = 'discussion' | 'quote';

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
  onClickCard?: () => void;

  /** 표시용 좋아요 여부(boolean) */
  isLiked?: boolean;
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
  onClickCard,
  isLiked = false,
}) => {
  const isQuote = type === 'quote';

  return (
    <div
      onClick={onClickCard}
      className={cn(
        'w-full rounded-l bg-white px-5 py-5 shadow-sm',
        onClickCard &&
          'cursor-pointer transition-transform duration-100 hover:shadow-md hover:ring-1 hover:ring-[var(--color-green1)]',
        className,
      )}
    >
      {/* 제목 영역 */}
      <div className="flex justify-between">
        <div className="space-y-1">
          <p className="text-title5 pt-1 text-black">{bookTitle}</p>
        </div>

        <button className="cursor-pointer">
          <MoreIcon className="w-5" />
        </button>
      </div>

      {!isQuote && <p className="text-title6 pt-1 text-black">{title}</p>}

      {/* 내용 */}
      <p className="text-body5 text-gray3 mt-2 line-clamp-2 pr-7">{content}</p>

      {/* 태그 (인용구만) */}
      {isQuote && tags && tags.length > 0 && (
        <div className="mt-3.5 flex gap-2">
          {tags.slice(0, 2).map((t) => (
            <Badge key={t} variant="tag" label={`#${t}`} />
          ))}
        </div>
      )}

      {/* 하단 */}
      <div className="mt-4 flex items-center justify-between">
        {/* 닉네임 + 날짜 */}
        <div className="text-body4 text-gray3 flex items-center gap-2">
          <span>{nickname}</span>
          <span>|</span>
          <span>{dateLabel}</span>
        </div>

        {/* 좋아요 / 댓글 */}
        <div className="flex items-center gap-2">
          <div className="text-body4 rounded-m border-gray2 flex h-6 items-center gap-1 border px-3 select-none">
            <span className="flex h-4 w-4 items-center justify-center">
              {isLiked ? (
                <HeartFilled className="h-4 w-4" />
              ) : (
                <HeartIcon className="h-4 w-4" />
              )}
            </span>
            <span>{likeCount}</span>
          </div>

          {!isQuote && typeof commentCount === 'number' && (
            <Badge variant="comment" comment={commentCount} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;
