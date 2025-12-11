import { useState, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import {
  BackIcon,
  LogoIcon,
  SettingIcon,
  DropdownIcon,
  BookmarkOnIcon,
  BookmarkOffIcon,
  MyPageIcon,
  ShareIcon,
  HeartIcon,
  HeartFilled,
} from '@/assets';

import { useNavigate } from 'react-router-dom';

export type HeaderVariant =
  | 'back' // 1. 뒤로가기만 (옵션: 좋아요 하트)
  | 'backTitle' // 2. 뒤로가기 + 중앙 텍스트
  | 'logoSetting' // 3. 로고 + 설정
  | 'backTitleDropdown' // 4. 뒤로가기 + 제목 + 아래 드롭다운 (VS 토론)
  | 'logoBookmark' // 5. 로고 + 북마크 토글
  | 'logoMy' // 6. 로고 + 마이페이지
  | 'backTitleIcon'; // 7. 뒤로가기 + 중앙 텍스트 + 공유 아이콘

interface HeaderProps {
  variant: HeaderVariant;
  title?: string;

  onBackClick?: () => void;
  onLogoClick?: () => void;
  onSettingClick?: () => void;
  onMoreClick?: () => void;
  onMyPageClick?: () => void;
  onShareClick?: () => void;
  dropdownContent?: ReactNode;
  className?: string;

  isBookmarked?: boolean;
  onToggleBookmark?: () => void;

  isLiked?: boolean;
  likeCount?: number;
  onToggleLike?: () => void;
}

const Header = ({
  variant,
  title,
  onBackClick,
  onLogoClick,
  onSettingClick,
  onMyPageClick,
  onShareClick,
  dropdownContent,
  className,
  isBookmarked,
  onToggleBookmark,
  isLiked,
  likeCount,
  onToggleLike,
}: HeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [internalBookmarked, setInternalBookmarked] = useState(false);
  const navigate = useNavigate();

  const isControlledBookmark = typeof isBookmarked === 'boolean';
  const currentBookmarked = isControlledBookmark
    ? (isBookmarked as boolean)
    : internalBookmarked;

  const bgClass =
    variant === 'backTitleDropdown' || variant === 'logoBookmark'
      ? 'bg-beige2'
      : 'bg-beige1';

  // =========================
  // Left
  // =========================
  const renderLeft = () => {
    if (
      variant === 'back' ||
      variant === 'backTitle' ||
      variant === 'backTitleDropdown' ||
      variant === 'backTitleIcon'
    ) {
      return (
        <button type="button" onClick={onBackClick} aria-label="뒤로가기">
          <BackIcon className="h-10 w-10 cursor-pointer text-black" />
        </button>
      );
    }

    // 로고가 들어가는 헤더들
    return (
      <button
        type="button"
        onClick={() => {
          if (onLogoClick) onLogoClick();
          else navigate('/');
        }}
        aria-label="홈으로 이동"
      >
        <LogoIcon className="h-11 cursor-pointer" />
      </button>
    );
  };

  // =========================
  // Center
  // =========================
  const renderCenter = () => {
    if (
      variant === 'backTitle' ||
      variant === 'backTitleDropdown' ||
      variant === 'backTitleIcon'
    ) {
      return (
        <h1 className="text-title4 overflow-hidden text-ellipsis whitespace-nowrap px-2">
          {title}
        </h1>
      );
    }
    return null;
  };

  const renderLikeButton = () => {
    if (!onToggleLike && typeof likeCount !== 'number' && typeof isLiked === 'undefined') {
      return null;
    }

    return (
      <button
        type="button"
        onClick={onToggleLike}
        aria-label="좋아요"
        className="flex items-center gap-1"
      >
        <span
          className={cn(
            'flex h-7 w-7 items-center justify-center',
            isLiked && 'animate-like-bump',
          )}
        >
          {isLiked ? (
            <HeartFilled className="h-6 w-6 text-red-like" />
          ) : (
            <HeartIcon className="h-6 w-6 text-red-like" />
          )}
        </span>
        {typeof likeCount === 'number' && (
          <span className="text-caption2 text-black">{likeCount}</span>
        )}
      </button>
    );
  };

  // =========================
  // Right (윗줄 오른쪽)
  // =========================
  const renderRight = () => {
    switch (variant) {
      case 'logoSetting':
        return (
          <button type="button" onClick={onSettingClick} aria-label="설정">
            <SettingIcon className="h-6 w-6 cursor-pointer text-black" />
          </button>
        );

      case 'logoBookmark':
        return (
          <button
            type="button"
            onClick={() => {
              if (onToggleBookmark) {
                onToggleBookmark();
              } else {
                setInternalBookmarked((prev) => !prev);
              }
            }}
            aria-label="북마크"
          >
            {currentBookmarked ? (
              <BookmarkOnIcon className="h-7 w-7 cursor-pointer text-green1" />
            ) : (
              <BookmarkOffIcon className="h-7 w-7 cursor-pointer text-green1" />
            )}
          </button>
        );

      case 'logoMy':
        return (
          <button
            type="button"
            className="cursor-pointer"
            onClick={onMyPageClick}
            aria-label="마이페이지"
          >
            <MyPageIcon className="h-8 w-8 text-green1" />
          </button>
        );

      case 'backTitleDropdown':
        return renderLikeButton();

      case 'back':
        return renderLikeButton();

      case 'backTitleIcon':
        return (
          <button type="button" onClick={onShareClick}>
            <ShareIcon className="h-7 w-7 cursor-pointer text-black" />
          </button>
        );

      case 'backTitle':
      default:
        return null;
    }
  };

  return (
    <header
      className={cn(
        bgClass,
        'mx-auto flex w-full max-w-[430px] flex-col',
        className,
      )}
    >
      {/* 1줄째: 기본 헤더 라인 */}
      <div className="flex h-14 items-center justify-between px-4">
        {/* 왼쪽: 아이콘 영역 */}
        <div className="flex w-10 min-w-10 items-center justify-start">
          {renderLeft()}
        </div>

        {/* 중앙: 제목 */}
        <div className="flex flex-1 items-center justify-center overflow-hidden">
          {renderCenter()}
        </div>

        {/* 오른쪽: 설정 / 북마크 / 마이 / 좋아요 / 공유 */}
        <div className="flex w-10 min-w-10 items-center justify-end">
          {renderRight()}
        </div>
      </div>

      {/* 2줄째: VS 토론 헤더에서만 드롭다운 아이콘 (오른쪽 아래) */}
      {variant === 'backTitleDropdown' && (
        <div className="flex justify-end pb-2 pr-4">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-label="드롭다운 토글"
          >
            <DropdownIcon
              className={cn(
                'h-7 w-7 text-black transition-transform duration-150',
                isDropdownOpen && 'rotate-180',
              )}
            />
          </button>
        </div>
      )}

      {/* 3줄째: 드롭다운 영역 */}
      {variant === 'backTitleDropdown' && (
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out',
            isDropdownOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className="px-4 pb-3 pt-1">{dropdownContent}</div>
        </div>
      )}
    </header>
  );
};

export default Header;
