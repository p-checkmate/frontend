import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import {
  Header,
  Badge,
  DiscussionCard,
  ToggleTab,
  Image,
  DiscussionCreateModal,
  QuoteCreateModal,
} from '@/components';
import { getBookDetailById } from '@/_mocks/bookDetailMock';
import { useParams } from 'react-router-dom';

const TAB_OPTIONS = ['토론', '인용구'] as const;
type Tab = (typeof TAB_OPTIONS)[number];

const BookDetailPage: React.FC = () => {
  //const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<Tab>('토론');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openQuoteModal, setOpenQuoteModal] = useState(false);

  const handleCreateDiscussion = () => {
    setOpenCreateModal(true);
  };

  // TODO: API 연결 시 이 부분을 없애고 API로 대체
  const { bookId } = useParams();
  const id = Number(bookId);
  const book = getBookDetailById(id);
  if (!book) {
    return <p className="text-gray6 mt-20 text-center">책 정보를 찾을 수 없습니다.</p>;
  }

  const { title, author, publisher, description, coverImageUrl, tags, discussions, quotes } = book;

  return (
    <div className="bg-beige1 min-h-screen">
      <Header variant="logoBookmark" />

      <div className="mx-auto pb-10">
        {/* ===== 책 정보 카드 ===== */}
        <div className="bg-beige2">
          <div className="flex gap-4 px-6 pt-1 pb-5">
            <div className="flex-1 space-y-2">
              {/* 책 표지 */}
              <div className="flex items-center justify-center">
                <Image src={coverImageUrl} alt={title} className="h-32 w-22" />
              </div>

              {/* 태그 */}
              <div className="flex flex-wrap gap-2 pt-4">
                {tags.map((tag) => (
                  <Badge key={tag} variant="tag" label={`#${tag}`} />
                ))}
              </div>

              {/* 제목 / 저자 */}
              <div className="space-y-1 pt-3">
                <p className="text-caption1">{title}</p>
                <p className="text-caption3">
                  {author} / {publisher}
                </p>
              </div>

              {/* 도서 요약 */}
              <div className="text-body2">{description}</div>
            </div>
          </div>

          <ToggleTab
            options={['토론', '인용구']}
            selected={activeTab}
            onSelect={(tab) => setActiveTab(tab as Tab)}
            variant="underline"
          />
        </div>

        {activeTab === '토론' && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-body3 text-gray6" />
            <button
              type="button"
              className="text-caption2 cursor-pointer"
              onClick={handleCreateDiscussion}
            >
              토론 만들기 &gt;
            </button>
          </div>
        )}

        {activeTab === '인용구' && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-body3" />
            <button
              type="button"
              className="text-caption2 cursor-pointer"
              onClick={() => setOpenQuoteModal(true)}
            >
              인용구 만들기 &gt;
            </button>
          </div>
        )}

        {/* ===== 토론 리스트 ===== */}
        {activeTab === '토론' && (
          <div className="mt-4 px-2">
            {discussions.length === 0 ? (
              <p className="text-body3 text-gray5 mt-6 text-center">아직 등록된 토론이 없어요.</p>
            ) : (
              <div className="space-y-3">
                {discussions.map((d) => (
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
                    onClickCard={() => {
                      // TODO: 토론 상세
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== 인용구 탭 ===== */}
        {activeTab === '인용구' && (
          <div className="mt-4 space-y-3 px-2">
            {quotes.length === 0 ? (
              <div className="text-body3 text-gray3 mt-6 text-center">
                아직 등록된 인용구가 없어요.
              </div>
            ) : (
              quotes.map((q) => (
                <DiscussionCard
                  key={q.id}
                  type="quote"
                  bookTitle={q.bookTitle}
                  content={q.content}
                  tags={tags}
                  nickname={q.nickname}
                  dateLabel={q.dateLabel}
                  likeCount={q.likeCount}
                  onClickCard={() => {
                    // TODO: 인용구 상세
                  }}
                />
              ))
            )}
          </div>
        )}
      </div>
      <DiscussionCreateModal open={openCreateModal} onClose={() => setOpenCreateModal(false)} />
      <QuoteCreateModal
        open={openQuoteModal}
        onClose={() => setOpenQuoteModal(false)}
        onSubmit={(quote) => {
          //TODO: 인용구 생성 API
          console.log('인용구 생성 API 호출', quote);
        }}
      />
    </div>
  );
};

export default BookDetailPage;
