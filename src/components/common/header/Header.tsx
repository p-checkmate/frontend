import { useState, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import {
  BackIcon,
  LogoIcon,
  SettingIcon,
  MoreIcon,
  DropdownIcon,
  BookmarkOnIcon,
  BookmarkOffIcon,
  MyPageIcon,
} from '@/assets';
import { useNavigate } from 'react-router-dom';

export type HeaderVariant =
  | 'back' // 1. 뒤로가기만
  | 'backTitle' // 2. 뒤로가기 + 중앙 텍스트
  | 'logoSetting' // 3. 로고 + 설정
  | 'backTitleDropdown' // 4. 뒤로가기 + 제목 + ... + 아래 드롭다운
  | 'logoBookmark' // 5. 로고 + 북마크 토글
  | 'logoMy'; // 6. 로고 + 마이페이지

interface HeaderProps {
  variant: HeaderVariant;
  title?: string;

  onBackClick?: () => void;
  onLogoClick?: () => void;
  onSettingClick?: () => void;
  onMoreClick?: () => void;
  onMyPageClick?: () => void;
  dropdownContent?:ReactNode;
  className?: string;
}

const Header = ({
  variant,
  title,
  onBackClick,
  onLogoClick,
  onSettingClick,
  onMoreClick,
  onMyPageClick,
  dropdownContent,
  className,
}: HeaderProps) => {
  // VS 토론 헤더에서 아래 화살표 회전용
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // 로고 + 북마크 헤더에서 북마크 토글용
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  // 배경색: 드롭다운/북마크 헤더만 FFFDF6 (bg-beige2), 나머지는 F9F5E8 (bg-beige1)
  const bgClass =
    variant === 'backTitleDropdown' || variant === 'logoBookmark' ? 'bg-beige2' : 'bg-beige1';

  // =========================
  // Left
  // =========================
  const renderLeft = () => {
    if (variant === 'back' || variant === 'backTitle' || variant === 'backTitleDropdown') {
      return (
        <button type="button" onClick={onBackClick} aria-label="뒤로가기">
          <BackIcon className="h-13 w-13 text-black" /> {/*수정 8에서 10으로*/}
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
    if (variant === 'backTitle' || variant === 'backTitleDropdown') {
      return <h1 className="text-title4">{title}</h1>;
    }
    return null;
  };

  // =========================
  // Right (윗줄 오른쪽)
  // =========================
  const renderRight = () => {
    switch (variant) {
      case 'logoSetting':
        return (
          <button type="button" onClick={onSettingClick} aria-label="설정">
            <SettingIcon className="h-6 w-6 text-black" />
          </button>
        );

      case 'logoBookmark':
        return (
          <button
            type="button"
            onClick={() => {
              setIsBookmarked((prev) => !prev);
            }}
            aria-label="북마크"
          >
            {isBookmarked ? (
              <BookmarkOnIcon className="text-green1 h-7 w-7 cursor-pointer" />
            ) : (
              <BookmarkOffIcon className="text-green1 h-7 w-7 cursor-pointer" />
            )}
          </button>
        );

      case 'logoMy':
        return (
          <button type="button" onClick={onMyPageClick} aria-label="마이페이지">
            <MyPageIcon className="text-green1 h-8 w-8" />
          </button>
        );

      case 'backTitleDropdown':
        // VS 토론 헤더의 윗줄 오른쪽: ... 아이콘만
        return (
          <button type="button" onClick={onMoreClick} aria-label="더보기">
            <MoreIcon className="h-7 w-7 text-black" />
          </button>
        );

      case 'back':
      case 'backTitle':
      default:
        return null;
    }
  };

  return (
    <header className={cn(bgClass, 'mx-auto flex w-full max-w-[430px] flex-col', className)}>
      {/* 1줄째: 기본 헤더 라인 */}
      <div className="flex h-14 items-center justify-between px-4">
        {' '}
        {/* 수정 h-14에서 24*/}
        <div className="flex flex-[0.8] items-center">{renderLeft()}</div>
        <div className="flex flex-[1.2] justify-center">{renderCenter()}</div>
        <div className="flex flex-[0.8] items-center justify-end">{renderRight()}</div>
      </div>

      {/* 2줄째: VS 토론 헤더에서만 드롭다운 아이콘 (오른쪽 아래) */}
      {variant === 'backTitleDropdown' && (
        <div className="flex justify-end pr-4 pb-2">
          <button
            type="button"
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

      {variant === "backTitleDropdown" && isDropdownOpen && dropdownContent && (
        <div className="px-4 pb-3">{dropdownContent}</div>
      )}
    </header>
  );
};

export default Header;
