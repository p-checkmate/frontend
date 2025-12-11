// src/pages/mypage/MyBook.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header, Toast } from '@/components';
import BookCard from '@/components/common/cards/BookSelectCard';
import { cn } from '@/utils/cn';

import {
  fetchMyBookBookmarks,
  deleteBookmark,
  type MyBookResponse,
} from '@/api/mypage/mybook.api';

// UI에서 쓸 책 타입
type UI_MyBook = {
  bookmarkId: number;
  bookId: number;
  itemId: number;
  title: string;
  author: string;
  coverImageUrl: string;
  tags: string[];
};

const MyBook: React.FC = () => {
  const navigate = useNavigate();

  // 1. 책 목록 상태
  const [books, setBooks] = useState<UI_MyBook[]>([]);

  // 2. 로딩/에러 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3. 토스트 표시 상태
  const [toastVisible, setToastVisible] = useState(false);
  const [toastKey, setToastKey] = useState(0); // 토스트 리셋용 키

  // 삭제 애니메이션 중인 bookmarkId 저장
  const [leavingId, setLeavingId] = useState<number | null>(null);

  // ===== 나의 책장 API 호출 =====
  useEffect(() => {
    const loadMyBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const data: MyBookResponse = await fetchMyBookBookmarks();

        const mapped: UI_MyBook[] = data.bookmarks.map((b) => ({
          bookmarkId: b.bookmark_id,
          bookId: b.book_id,
          itemId: b.item_id,
          title: b.title,
          author: b.author,
          coverImageUrl: b.thumbnail_url,
          tags: b.genres,
        }));

        setBooks(mapped);
      } catch (e) {
        console.error('나의 책장 로딩 실패:', e);
        setError('나의 책장을 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadMyBooks();
  }, []);

  // ===== 토스트 자동 숨김 =====
  useEffect(() => {
    if (!toastVisible) return;

    const timer = setTimeout(() => {
      setToastVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [toastVisible]);

  // ===== 삭제 핸들러 (bookmarkId = UI, itemId = 상세/삭제 API용) =====
  const handleRemove = async (bookmarkId: number, itemId: number) => {
    try {
      // (1) API 요청 – itemId 기준으로 삭제
      await deleteBookmark(itemId);

      // (2) 애니메이션 시작
      setLeavingId(bookmarkId);

      // (3) 0.3초 뒤에 실제로 목록에서 제거 + 토스트 표시
      setTimeout(() => {
        setBooks((prev) =>
          prev.filter((book) => book.bookmarkId !== bookmarkId),
        );
        setLeavingId(null);

        // 토스트 새로 띄우기 (key 갱신해서 완전 리셋)
        setToastKey((prev) => prev + 1);
        setToastVisible(true);
      }, 300);
    } catch (error) {
      console.error('북마크 삭제 실패:', error);
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 상세 페이지 이동 (itemId 사용)
  const handleCardClick = (itemId: number) => {
    navigate(`/book/${itemId}`);
  };

  // ===== 로딩 / 에러 처리 =====
  if (loading) {
    return (
      <div className="bg-beige1 min-h-screen flex items-center justify-center">
        <p className="text-body1 text-gray3">불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-beige1 min-h-screen flex items-center justify-center">
        <p className="text-body1 text-red-like">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-beige1 min-h-screen w-full relative">
      {/* 1. 헤더 */}
      <Header
        variant="backTitle"
        title="나의 책장"
        onBackClick={() => navigate(-1)}
        className="sticky top-0 z-50 bg-beige1"
      />

      {/* 2. 책 리스트 영역 */}
      <main className="px-5 py-4 pb-20">
        {books.length === 0 ? (
          <div className="flex h-[50vh] items-center justify-center text-body1 text-gray3">
            저장된 책이 없습니다.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {books.map((book) => (
              <BookCard
                key={book.bookmarkId}
                title={book.title}
                subtitle={`${book.author}`}
                thumbnailUrl={book.coverImageUrl}
                tags={book.tags}
                onClickCard={() => handleCardClick(book.itemId)}
                showRemoveButton
                onClickRemove={() =>
                  handleRemove(book.bookmarkId, book.itemId)
                }
                className={cn(
                  'transition-all duration-300 ease-out',
                  leavingId === book.bookmarkId
                    ? 'translate-x-full opacity-0'
                    : 'translate-x-0 opacity-100',
                )}
              />
            ))}
          </div>
        )}
      </main>

      {/* 3. 토스트 메시지 */}
      <Toast
        key={toastKey}
        variant="alert"
        visible={toastVisible}
        message="책장에서 삭제되었습니다"
      />
    </div>
  );
};

export default MyBook;
