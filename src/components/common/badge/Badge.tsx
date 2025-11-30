import React from 'react';
import { cn } from '@/utils/cn';
import { CommentIcon, CheckIcon } from '@/assets';

type BadgeVariant = 'tag' | 'comment' | 'check';

interface BaseProps {
    className?: string;
}

// 1) 노란 태그 뱃지 (#장르)
interface TagBadgeProps extends BaseProps {
    variant: 'tag';
    label: string;
}

// 2) 댓글 개수 뱃지
interface CommentBadgeProps extends BaseProps {
    variant: 'comment';
    comment: number; 
}

// 3) 책 선택 체크 뱃지
interface CheckBadgeProps extends BaseProps {
    variant: 'check';
    visible?: boolean;
}

export type BadgeProps = TagBadgeProps | CommentBadgeProps | CheckBadgeProps;

const Badge: React.FC<BadgeProps> = (props) => {
    // ================================
    // 1. TAG Badge (#장르)
    // ================================
    if (props.variant === 'tag') {
        const { label, className } = props;

        return (
            <span
                className={cn(
                    'inline-flex items-center justify-center h-6 px-3',
                    'rounded-full bg-yellow text-body4 text-black',
                    className,
                )}
            >
                {label}
            </span>
        );
    }

    // ================================
    // 2. Comment Badge (댓글 개수)
    // ================================
    if (props.variant === 'comment') {
        const { comment, className } = props;

        return (
            <div
                className={cn(
                    'inline-flex items-center gap-1 h-6 px-3 rounded-m',
                    'border border-gray2 bg-white text-body4 text-black',
                    className,
                )}
            >
            <CommentIcon className="w-3.5 h-3.5 text-green1" />
            <span>{comment}</span>
            </div>
        );
    }

    // ================================
    // 3. CHECK Badge (책 선택 체크)
    // ================================
    const { visible = true, className } = props as CheckBadgeProps;
    if (!visible) return null;

    return <CheckIcon className={cn('w-6 h-6', className)} />;
};

export default Badge;
