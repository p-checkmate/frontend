import React, { useState, useEffect } from 'react';
import {
  Header,
  Badge,
  DiscussionCard,
  ToggleTab,
  Image,
  DiscussionCreateModal,
  QuoteCreateModal,
  Toast,
} from '@/components';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBookDetail } from '@/api/detail/detail.api';
import { fetchBookDiscussion, type BookDiscussionSummary } from '@/api/detail/discussion.api';
import type { BookDetail } from '@/types/book';
import { fetchQuotes, createQuote } from '@/api/detail/quote.api';
import { formatKoreanDate } from '@/utils/date';
import {
  createBookBookmark,
  deleteBookBookmark,
  fetchBookBookmarkStatus,
} from '@/api/detail/bookmark.api';

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
  const [discussions, setDiscussions]=useState<BookDiscussionSummary[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const navigate = useNavigate();

  const [isBookmarked, setIsBookmarked] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const handleCreateDiscussion = () => {
    setOpenCreateModal(true);
  };

  // ==== 토론 조회 API ===
  useEffect(()=>{
    if(!book?.bookId) return;

    (async()=>{
      try{
        const list=await fetchBookDiscussion(book.bookId);
        console.log(list)
        setDiscussions(list);
      }catch(err){
        console.error('토론 목록을 불러오지 못했습니다:', err);
      }
    })();
  }, [book?.bookId])

  // ==== 인용구 조회 API ====
  useEffect(() => {
    if (!book?.bookId) return;
    (async () => {
      try {
        const res = await fetchQuotes(book.bookId);
        setQuotes(res.data ?? []);
      } catch (err: any) {
        console.error('인용구 불러오기 실패:', err);
      }
    })();
  }, [book?.bookId]);

  // ===== 도서 상세 API 호출 =====
  // ===== 도서 상세 + 북마크 상태 =====
  useEffect(() => {
    if (!bookId) {
      setError('잘못된 접근입니다.');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);

        // 1) URL 파라미터(bookId)는 상세 조회용 (ex. itemId)
        const detail = await fetchBookDetail(bookId);

        setBook(detail);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError(err?.message ?? '도서 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [bookId]);

    // ===== 북마크 상태 조회 (상세와 분리) =====
  useEffect(() => {
    if (!bookId) return;

    (async () => {
      try {
        const status = await fetchBookBookmarkStatus(bookId.toString());
        setIsBookmarked(!!status);
      } catch (err) {
        console.error('북마크 상태 조회 실패:', err);
        setIsBookmarked(false);
      }
    })();
  }, [bookId]);



  const handleToggleBookmark = async () => {
    if (!bookId) return;

    try {
      if (isBookmarked) {
        await deleteBookBookmark(bookId);
        setIsBookmarked(false);
        showToast("북마크에서 제거했어요.");
      } else {
        await createBookBookmark(bookId);
        setIsBookmarked(true);
        showToast("북마크에 추가했어요!");
      }
    } catch (err: any) {
      console.error('북마크 토글 실패:', err);
      showToast("북마크 변경에 실패했습니다.");
    }
  };

  // ===== 로딩 / 에러 처리 =====
  if (loading) {
    return (
      <div className="bg-beige1 min-h-screen">
        <div className="fixed left-0 right-0 top-0 z-50">
          <Header
            variant="logoBookmark"
            isBookmarked={isBookmarked}
            onToggleBookmark={handleToggleBookmark}
          />
        </div>
        <p className="mt-20 text-center text-gray6">책 정보를 불러오는 중입니다…</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="bg-beige1 min-h-screen">
        <div className="fixed left-0 right-0 top-0 z-50">
          <Header
            variant="logoBookmark"
            isBookmarked={isBookmarked}
            onToggleBookmark={handleToggleBookmark}
          />
        </div>
        <p className="mt-20 text-center text-gray6">
          {error ?? '책 정보를 찾을 수 없습니다.'}
        </p>
      </div>
    );
  }

  const { title, author, publisher, description, thumbnailUrl, genres } = book;

  const coverImageUrl = thumbnailUrl;
  const tags = genres?.map((g) => g.genreName) ?? [];

  return (
    <div className="bg-beige1 min-h-screen">
      <Toast visible={toastVisible} message={toastMessage} variant="alert" />
      <div className="fixed left-0 right-0 top-0 z-40">
        <Header
          variant="logoBookmark"
          isBookmarked={isBookmarked}
          onToggleBookmark={handleToggleBookmark}
        />
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
            {(discussions?.length ?? 0) === 0 ? (
              <p className="text-body3 text-gray5 mt-6 text-center">
                아직 등록된 토론이 없어요.
              </p>
            ) : (
              <div className="space-y-3">
                {(discussions ?? []).map((d) => (
                  <DiscussionCard
                    key={d.discussion_id}
                    type="discussion"
                    bookTitle={title}
                    title={d.title}
                    content={d.content}
                    nickname={d.nickname}
                    dateLabel={formatKoreanDate(d.created_at)}
                    likeCount={d.like_count}
                    commentCount={d.comment_count}
                    onClickCard={() => {
                      navigate(`/debate/${d.discussion_id}`);
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
                  bookTitle={title} // 책 제목도 안 내려와서 우선 상세 조회 API에서 받아오기
                  content={q.content}
                  tags={tags}
                  nickname={q.nickname}
                  dateLabel={formatKoreanDate(q.created_at)}
                  likeCount={q.like_count}
                  onClickCard={() => {
                    navigate(`/quote/${q.quote_id}`);
                  }}
                />
              ))
            )}
          </div>
        )}
      </div>

      <DiscussionCreateModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        bookId={book.bookId}
        onCreated={(id) => {
          console.log('새 토론 생성됨:', id);
          navigate(`/debate/${id}`)
        }}
      />
      <QuoteCreateModal
        open={openQuoteModal}
        onClose={() => setOpenQuoteModal(false)}
        onSubmit={async (quoteContent) => {
          try {
            await createQuote(book.bookId!, quoteContent);
            const res = await fetchQuotes(book.bookId!);
            setQuotes(res.data ?? []);
            setOpenQuoteModal(false);
          } catch (err: any) {
            console.error('인용구 생성 실패:', err);
          }
        }}
      />
    </div>
  );
};

export default BookDetailPage;
