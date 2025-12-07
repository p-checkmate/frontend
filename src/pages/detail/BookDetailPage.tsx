// src/pages/BookDetailPage.tsx
import React, { useState, useEffect } from 'react';
import {
  Header,
  Badge,
  DiscussionCard,
  ToggleTab,
  Image,
  DiscussionCreateModal,
  QuoteCreateModal,
} from '@/components';
import { useParams } from 'react-router-dom';
import { fetchBookDetail } from '@/api/detail/detail.api';
import type { BookDetail } from '@/types/book';
import { fetchQuotes } from '@/api/detail/quote.api';
import { createQuote } from '@/api/detail/quote.api';

const TAB_OPTIONS = ['토론', '인용구'] as const;
type Tab = (typeof TAB_OPTIONS)[number];

const BookDetailPage: React.FC = () => {
  const { bookId } = useParams();

  const [activeTab, setActiveTab] = useState<Tab>('토론');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openQuoteModal, setOpenQuoteModal] = useState(false);

  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // 토론/인용구는 api 들어갈 자리
  const discussions: any[] = [];
  const [quotes, setQuotes]=useState<any[]>([]);

  const handleCreateDiscussion = () => {
    setOpenCreateModal(true);
  };

  // ==== 인용구 조회 API ====
  useEffect(()=>{
    if(!bookId) return;
    (async ()=>{
      try{
        const res=await fetchQuotes(bookId);
        setQuotes(res.data??[]);
      }catch(err:any){
        console.error("인용구 불러오기 실패:", err);
      }
    })();
  }, [bookId]);

  // ===== 도서 상세 API 호출 =====
  useEffect(() => {
    if (!bookId) {
      setError('잘못된 접근입니다.');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const data = await fetchBookDetail(bookId);
        setBook(data);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError(err?.message ?? '도서 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [bookId]);

  // ===== 로딩 / 에러 처리 =====
  if (loading) {
    return (
      <div className="bg-beige1 min-h-screen">
        <div className="fixed left-0 right-0 top-0 z-50">
          <Header variant="logoBookmark" />
        </div>
        <p className="mt-20 text-center text-gray6">책 정보를 불러오는 중입니다…</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="bg-beige1 min-h-screen">
        <div className="fixed left-0 right-0 top-0 z-50">
          <Header variant="logoBookmark" />
        </div>
        <p className="mt-20 text-center text-gray6">
          {error ?? '책 정보를 찾을 수 없습니다.'}
        </p>
      </div>
    );
  }

  // ===== API에서 받은 데이터 =====
  const { title, author, publisher, description, thumbnailUrl, genres } = book;

  const coverImageUrl = thumbnailUrl;
  const tags = genres?.map((g) => g.genreName) ?? [];

  return (
    <div className="bg-beige1 min-h-screen">
      <div className="fixed left-0 right-0 top-0 z-50">
        <Header variant="logoBookmark" />
      </div>

      <div className="mx-auto pt-14 pb-10">
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
          <div className="mt-4 pr-2 flex items-center justify-between">
            <span className="text-body3" />
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
          <div className="mt-4 pr-2 flex items-center justify-between">
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
          <div className="mt-4 px-5">
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
          <div className="mt-4 space-y-3 px-5">
            {quotes.length === 0 ? (
              <div className="text-body3 text-gray3 mt-6 text-center">
                아직 등록된 인용구가 없어요.
              </div>
            ) : (
              quotes.map((q) => (
                <DiscussionCard
                  key={q.quote_id}
                  type="quote"
                  bookTitle={title} //책 제목도 안 내려와서 우선 상세 조회 API에서 받아오기
                  content={q.content}
                  tags={tags}
                  nickname={'임시'} // 현재 api에서 닉네임을 안 내려줌,,,,
                  dateLabel={q.created_at}
                  likeCount={q.like_count}
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
        onSubmit={async (quoteContent)=>{
          try{
            await createQuote(bookId!, quoteContent);
            const res=await fetchQuotes(bookId!);
            setQuotes(res.data??[]);
            setOpenQuoteModal(false);
          }catch(err:any){
            console.error("인용구 생성 실패:", err);
          }
        }}
      />
    </div>
  );
};

export default BookDetailPage;
