import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, ToggleTab, Toast } from '@/components';
import DiscussionCard from '@/components/common/cards/ListCard'; 
import { likedDiscussionsMock, likedQuotesMock } from '@/_mocks/myLikedContentMock';
import { cn } from '@/utils/cn';

type Tab = '인용구' | '토론';

const MyLiked: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('인용구');

  // 1. Mock Data를 State로 변환 (삭제 시 리렌더링을 위해)
  const [quotes, setQuotes] = useState(likedQuotesMock);
  const [discussions, setDiscussions] = useState(likedDiscussionsMock);

  // 2. 삭제 애니메이션 및 토스트 상태 관리
  const [leavingId, setLeavingId] = useState<number | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  // 3. 좋아요 취소 핸들러 (DiscussionCard의 onLikeClick에서 호출)
  const handleUnlike = (id: number, type: 'quote' | 'discussion') => {
    // (1) 애니메이션 시작: 카드가 옆으로 밀려남
    setLeavingId(id);

    // (2) 0.3초(애니메이션 시간) 뒤에 실제 데이터 삭제
    setTimeout(() => {
      if (type === 'quote') {
        setQuotes((prev) => prev.filter((q) => q.id !== id));
      } else {
        setDiscussions((prev) => prev.filter((d) => d.id !== id));
      }
      setLeavingId(null); // 상태 초기화
      setToastVisible(true); // "삭제되었습니다" 토스트 표시
    }, 300);
  };

  // 토스트 자동 숨김 타이머
  useEffect(() => {
    if (toastVisible) {
      const timer = setTimeout(() => setToastVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [toastVisible]);

  return (
    <div className="bg-beige1 min-h-screen w-full relative">
      <Header
        variant="backTitle"
        title="내가 좋아요 한 콘텐츠"
        onBackClick={() => navigate(-1)}
        className="sticky top-0 z-50 bg-beige1"
      />

      <main className="w-full pb-20">
        <section className="px-5 py-4">
          <ToggleTab
            variant="pill"
            options={['인용구', '토론']}
            selected={activeTab}
            onSelect={(option) => setActiveTab(option as Tab)}
          />
        </section>

        <section className="px-5 space-y-3">
          
          {/* (A) 인용구 리스트 */}
          {activeTab === '인용구' && (
            <>
              {quotes.length === 0 ? (
                <div className="flex h-[50vh] items-center justify-center text-body3 text-gray3">
                  좋아요 한 인용구가 없습니다.
                </div>
              ) : (
                quotes.map((q) => (
                  <DiscussionCard
                    key={q.id}
                    type="quote"
                    isLiked={true} // 좋아요 목록이므로 true로 시작
                    onLikeClick={() => handleUnlike(q.id, 'quote')} 
                    
                    bookTitle={q.bookTitle}
                    content={q.content}
                    tags={q.tags}
                    nickname={q.nickname}
                    dateLabel={q.dateLabel}
                    likeCount={q.likeCount}
                    onClickCard={() => console.log(`인용구 ${q.id} 상세 이동`)}
                    
                    // 삭제 애니메이션 클래스 적용
                    className={cn(
                      "transition-all duration-300 ease-out",
                      leavingId === q.id 
                        ? "translate-x-full opacity-0" 
                        : "translate-x-0 opacity-100"
                    )}
                  />
                ))
              )}
            </>
          )}

          {/* (B) 토론 리스트 */}
          {activeTab === '토론' && (
            <>
              {discussions.length === 0 ? (
                <div className="flex h-[50vh] items-center justify-center text-body3 text-gray3">
                  좋아요 한 토론이 없습니다.
                </div>
              ) : (
                discussions.map((d) => (
                  <DiscussionCard
                    key={d.id}
                    type="discussion"
                    isLiked={true} // 좋아요 목록이므로 true로 시작
                    onLikeClick={() => handleUnlike(d.id, 'discussion')} // 하트 클릭 시 handleUnlike 실행
                    
                    bookTitle={d.bookTitle}
                    title={d.title}
                    content={d.content}
                    nickname={d.nickname}
                    dateLabel={d.dateLabel}
                    likeCount={d.likeCount}
                    commentCount={d.commentCount}
                    onClickCard={() => console.log(`토론 ${d.id} 상세 이동`)}
                    
                    // 삭제 애니메이션 클래스 적용
                    className={cn(
                      "transition-all duration-300 ease-out",
                      leavingId === d.id 
                        ? "translate-x-full opacity-0" 
                        : "translate-x-0 opacity-100"
                    )}
                  />
                ))
              )}
            </>
          )}
        </section>
      </main>

      {/* 삭제 알림 토스트 */}
      <Toast 
        variant="alert"
        visible={toastVisible}
        message="목록에서 삭제되었습니다"
      />
    </div>
  );
};

export default MyLiked;