import type { ChangeEvent, KeyboardEvent } from 'react';
import { cn } from '@/utils/cn';
import { Search as SearchIcon } from '@/assets';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** 돋보기 아이콘 클릭 또는 Enter 입력 시 호출 */
  onSubmit?: () => void;
  className?: string;
}

const Search = ({
  value,
  onChange,
  placeholder = '찾고 싶은 책이 있나요?',
  onSubmit,
  className,
}: SearchProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit();
    }
  };

  const handleClick = () => {
    if (onSubmit) onSubmit();
  };

  return (
    <div className={cn('w-full max-w-[335px]', className)}>
      <div className="flex h-11 items-center rounded-m border-2 border-green1 bg-beige2 px-3">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'flex-1 bg-transparent outline-none',
            // Body1 + 검정색, placeholder는 회색
            'text-body1 text-black placeholder:text-gray2'
          )}
        />

        <button
          type="button"
          onClick={handleClick}
          aria-label="검색"
          className="ml-2 flex items-center justify-center"
        >
          <SearchIcon className="w-5 h-5 text-green1" />
        </button>
      </div>
    </div>
  );
};

export default Search;
