import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, ToggleTab, DiscussionCard } from '@/components';
import { myDiscussionsMock, myQuotesMock } from '@/_mocks/myContentMock';

// 탭 타입 정의
type Tab = '인용구' | '토론';

const MyWrite: React.FC = () => {
  const navigate = useNavigate();
  
  // 1. 탭 상태 관리 (기본값: 인용구)
  const [activeTab, setActiveTab] = useState<Tab>('인용구');

  // 2. 현재 탭에 맞는 데이터 가져오기
  // (나중에 API가 생기면 useEffect로 activeTab 바뀔 때마다 fetch)
  const discussions = myDiscussionsMock;
  const quotes = myQuotesMock;

  return (
    <div className="bg-beige1 min-h-screen w-full relative">
      {/* 1. 헤더 */}
      <Header
        variant="backTitle"
        title="내가 작성한 콘텐츠"
        onBackClick={() => navigate(-1)}
        className="sticky top-0 z-50 bg-beige1"
      />

      <main className="w-full pb-20">
        {/* 2. 토글 탭 영역 */}
        <section className="px-5 py-4">
          <ToggleTab
            variant="pill"
            options={['인용구', '토론']}
            selected={activeTab}
            onSelect={(option) => setActiveTab(option as Tab)}
          />
        </section>

        {/* 3. 콘텐츠 리스트 영역 */}
        <section className="px-5 space-y-3">
          
          {/* (A) 인용구 리스트 */}
          {activeTab === '인용구' && (
            <>
              {quotes.length === 0 ? (
                <div className="text-body3 text-gray3 mt-10 text-center">
                  작성한 인용구가 없습니다.
                </div>
              ) : (
                quotes.map((q) => (
                  <DiscussionCard
                    key={q.id}
                    type="quote"
                    bookTitle={q.bookTitle}
                    content={q.content}
                    tags={q.tags}
                    nickname={q.nickname}
                    dateLabel={q.dateLabel}
                    likeCount={q.likeCount}
                    // 인용구는 댓글 수 없음
                    // 상세 페이지 이동 (임시)
                    onClickCard={() => console.log(`인용구 ${q.id} 클릭`)}
                  />
                ))
              )}
            </>
          )}

          {/* (B) 토론 리스트 */}
          {activeTab === '토론' && (
            <>
              {discussions.length === 0 ? (
                <div className="text-body3 text-gray3 mt-10 text-center">
                  작성한 토론이 없습니다.
                </div>
              ) : (
                discussions.map((d) => (
                  <DiscussionCard
                    key={d.id}
                    type="discussion"
                    bookTitle={d.bookTitle}
                    title={d.title}
                    content={d.content}
                    nickname={d.nickname}
                    dateLabel={d.dateLabel}
                    likeCount={d.likeCount}
                    commentCount={d.commentCount}
                    // 상세 페이지 이동 (임시)
                    onClickCard={() => console.log(`토론 ${d.id} 클릭`)}
                  />
                ))
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyWrite;