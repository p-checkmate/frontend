import React, { useState } from "react";
import {
  Header,
  DiscussionCard,
  Image,
  Search,
  TogetherReadCard,
  HorizontalBookScrollSection,
  CardCarousel,
} from "@/components";
import { useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";
import useScrollHide from "@/hooks/useScrollDirection";

import {
  MOCK_MAIN_BOOKS,
  MOCK_TOGETHER_READ,
  MOCK_HOT_DISCUSSIONS,
  MOCK_RECOMMENDED_QUOTES,
} from "@/_mocks/mainPageMock";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const togetherRead = MOCK_TOGETHER_READ; // 추후 API로 교체
  const [keyword, setKeyword] = useState("");
  const isHidden = useScrollHide(40);

  const handleSubmit = () => {
    console.log(`검색 요청: ${keyword || "(비어 있음)"}`);
  };

  return (
    <div className="min-h-screen bg-beige1">
      <div className="fixed left-0 right-0 top-0 z-50">
        <Header variant="logoMy" onMyPageClick={()=>navigate('/mypage')}/>

        <div
          className={cn(
            "flex justify-center pt-1 pb-3 transition-all duration-300 bg-beige1",
            "origin-top",
            isHidden
              ? "-translate-y-full opacity-0"
              : "translate-y-0 opacity-100"
          )}
        >
          <Search
            value={keyword}
            onChange={setKeyword}
            placeholder="찾고 싶은 책이 있나요?"
            onSubmit={handleSubmit}
            className="px-7"
          />
        </div>
      </div>

      <div className="mx-auto pb-20 pt-27">
        {/* ===== 배너 영역  ===== */}
        <div className="mt-3.5">
          <Image className="w-full h-41"/>
        </div>

        {togetherRead && (
          <section className="mt-6 px-5">
            <h2 className="mb-4 text-title5 text-black">
              현재 진행되고 있는 함께 읽기
            </h2>

            <TogetherReadCard
              title={togetherRead.title}
              participants={togetherRead.participants}
              remainDays={togetherRead.remainDays}
              isJoined={togetherRead.isJoined}
              progress={togetherRead.progress}
              rank={togetherRead.rank}
              thumbnailUrl={togetherRead.thumbnailUrl}
              onClick={() => {
                // TODO: 함께 읽기 상세/참여 페이지로 이동, 여기도 캐러셀로 감싸기..
              }}
            />
          </section>
        )}

        {/* ===== AI 추천 도서 ===== */}
        <HorizontalBookScrollSection title="님을 위한 AI 추천 도서" className="pt-8">
          {MOCK_MAIN_BOOKS.map((b) => (
            <div key={b.id} className="h-23 w-17 flex-shrink-0">
              <Image
                src={b.coverUrl}
                alt={b.title}
                className="h-full w-full cursor-pointer"
                onClick={() => navigate(`/book/${b.id}`)}
              />
            </div>
          ))}
        </HorizontalBookScrollSection>

        {/* ===== 체크메이트의 인기 도서 ===== */}
        <HorizontalBookScrollSection title="체크메이트의 인기 도서" className="pt-5">
          {MOCK_MAIN_BOOKS.map((b) => (
            <div key={b.id} className="h-23 w-17 flex-shrink-0">
              <Image
                src={b.coverUrl}
                alt={b.title}
                className="h-full w-full"
                onClick={() => navigate(`/book/${b.id}`)}
              />
            </div>
          ))}
        </HorizontalBookScrollSection>

        {/* ===== 지금 뜨거운 토론장 ===== */}
        <section className="mt-10">
          <h2 className="px-5 text-title5">지금 뜨거운 토론장</h2>

          <CardCarousel className="mt-3">
            {MOCK_HOT_DISCUSSIONS.map((d) => (
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
                onClickCard={() => navigate(`/debate/${d.id}`)}
              />
            ))}
          </CardCarousel>
        </section>

        {/* ===== 나를 위한 인용구 ===== */}
        <section className="mt-10">
          <h2 className="px-5 text-title5">나를 위한 인용구</h2>

          <CardCarousel className="mt-3">
            {MOCK_RECOMMENDED_QUOTES.map((q) => (
              <DiscussionCard
                key={q.id}
                type="quote"
                bookTitle={q.bookTitle}
                content={q.content}
                tags={q.tags}
                nickname={q.nickname}
                dateLabel={q.dateLabel}
                likeCount={q.likeCount}
                onClickCard={() => {
                  // TODO: 인용구 상세 모달 열기
                }}
              />
            ))}
          </CardCarousel>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
