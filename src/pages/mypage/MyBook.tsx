import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Toast } from "@/components";
import BookCard from "@/components/common/cards/BookSelectCard";
import { initialMyBooks, type MyBookItem } from "@/_mocks/myBookMock";
import { cn } from "@/utils/cn";

const MyBook: React.FC = () => {
  const navigate = useNavigate();
  
  // 1. 책 목록 상태
  const [books, setBooks] = useState<MyBookItem[]>(initialMyBooks);

  // 2. 토스트 표시 상태
  const [toastVisible, setToastVisible] = useState(false);

  // 삭제 애니메이션 중인 책 ID 저장
  const [leavingId, setLeavingId] = useState<number | null>(null);

  // 3. 토스트 자동 숨김 타이머
  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => {
        setToastVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  // 4. 삭제 핸들러 (애니메이션 적용)
  const handleRemove = (id: number) => {
    // (1) "나가는 중"이라고 표시하여 애니메이션 시작
    setLeavingId(id);

    // (2) 0.3초(300ms) 뒤에 실제로 데이터 삭제
    setTimeout(() => {
      setBooks((prev) => prev.filter((book) => book.id !== id));
      setLeavingId(null); // 상태 초기화
      setToastVisible(true); // 토스트 띄우기
    }, 300); // duration-300과 시간을 맞춤
  };

  // 5. 상세 페이지 이동 핸들러
  const handleCardClick = (id: number) => {
    const targetId = (id % 2) + 1; 
    navigate(`/book/${targetId}`); 
  };

  return (
    <div className="bg-beige1 min-h-screen w-full relative overflow-x-hidden">
      
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
                key={book.id}
                title={book.title}
                subtitle={`책 정보 (${book.author})`}
                thumbnailUrl={book.coverImageUrl}
                tags={book.tags}
                onClickCard={() => handleCardClick(book.id)} // 책 상세페이지로 이동
                showRemoveButton={true}
                onClickRemove={() => handleRemove(book.id)} // 책 삭제 핸들러
                
                // 애니메이션 클래스 적용
                className={cn(
                  "transition-all duration-300 ease-out", // 부드러운 움직임 설정
                  leavingId === book.id 
                    ? "translate-x-full opacity-0" // 삭제 중일 때: 오른쪽으로 밀리고 투명해짐
                    : "translate-x-0 opacity-100"  // 평소 상태: 제자리
                )}
              />
            ))}
          </div>
        )}
      </main>

      {/* 3. 토스트 메시지 */}
      <Toast 
        variant="alert"
        visible={toastVisible}
        message="책장에서 삭제되었습니다"
      />
    </div>
  );
};

export default MyBook;