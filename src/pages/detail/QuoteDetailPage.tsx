import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Image, Badge, Header, Toast } from '@/components';
import { QuoteIcon } from '@/assets';
import {
  fetchQuoteDetail,
  fetchQuoteLikeStatus,
  likeQuote,
  unlikeQuote,
  type QuoteDetail,
} from '@/api/detail/quote.api';
import { formatKoreanDate } from '@/utils/date';

const QuoteDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { quoteId } = useParams<{ quoteId: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  // 인용구 상세 데이터
  const [quote, setQuote] = useState<QuoteDetail | null>(null);

  // 헤더 좋아요 상태
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!quoteId) {
      setError('잘못된 접근입니다.');
      setLoading(false);
      return;
    }

    const id = Number(quoteId);
    if (Number.isNaN(id)) {
      setError('유효하지 않은 인용구 ID입니다.');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const [quoteData, likedStatus] = await Promise.all([
          fetchQuoteDetail(id),
          fetchQuoteLikeStatus(id),
        ]);

        setQuote(quoteData);
        setLikeCount(quoteData.like_count ?? 0);
        setLiked(likedStatus ?? false);
      } catch (err: any) {
        console.error('인용구 상세/좋아요 조회 실패:', err);
        setError('인용구 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [quoteId]);

  const handleToggleLike = async () => {
    if (!quote) return;

    try {
      if (liked) {
        await unlikeQuote(quote.quote_id);
        setLiked(false);
        setLikeCount((prev) => Math.max(prev - 1, 0));
        setQuote((prev) =>
          prev
            ? {
                ...prev,
                like_count: Math.max(prev.like_count - 1, 0),
              }
            : prev,
        );
        showToast('좋아요를 취소했어요');
      } else {
        await likeQuote(quote.quote_id);
        setLiked(true);
        setLikeCount((prev) => prev + 1);
        setQuote((prev) =>
          prev
            ? {
                ...prev,
                like_count: prev.like_count + 1,
              }
            : prev,
        );
        showToast('해당 인용구를 좋아합니다.');
      }
    } catch (err) {
      showToast('인용구 좋아요에 실패했어요.');
    }
  };

  // ===== 로딩 / 에러 처리 =====
  if (loading) {
    return (
      <div className="bg-beige1 min-h-screen">
        <Header variant="back" onBackClick={() => navigate(-1)} />
        <p className="text-body3 text-gray4 mt-10 text-center">인용구 정보를 불러오는 중입니다…</p>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="bg-beige1 min-h-screen">
        <Header variant="back" onBackClick={() => navigate(-1)} />
        <p className="text-body3 text-gray4 mt-10 text-center">
          {error ?? '인용구 정보를 찾을 수 없습니다.'}
        </p>
      </div>
    );
  }

  const bookTitle = quote.book?.title ?? '';
  const author = quote.book?.author ?? '';
  const publisher = quote.book?.publisher ?? '';
  const coverUrl = quote.book?.thumbnail_url ?? '';

  const content = quote.content;
  const writer = quote.nickname;
  const date = formatKoreanDate(quote.created_at);

  const tags: { id: number; label: string }[] = [];

  return (
    <div className="bg-beige1 min-h-screen">
      <Toast visible={toastVisible} message={toastMessage} variant="like" />
      {/* 상단 헤더: 뒤로가기 + 하트 */}
      <Header
        variant="back"
        onBackClick={() => navigate(-1)}
        isLiked={liked}
        likeCount={likeCount}
        onToggleLike={handleToggleLike}
      />

      <div className="px-5 py-3">
        {/* 책 정보 + 표지 */}
        <div className="flex items-center gap-4">
          <div className="h-28 w-[80px] flex-shrink-0">
            <Image src={coverUrl} alt="책 표지" className="h-full w-full rounded" />
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <h2 className="text-title6 text-black">{bookTitle}</h2>
            <p className="text-caption4 text-gray3">
              {author}
              <span className="text-gray2"> · </span>
              {publisher}
            </p>
          </div>
        </div>

        {/* 태그 뱃지 영역 */}
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag.id} variant="tag" label={tag.label} />
            ))}
          </div>
        )}

        {/* 구분선 */}
        <div className="bg-gray1 my-5 h-px w-full" />

        {/* 인용구 본문 */}
        <div className="bg-beige2 mt-4 rounded-l px-4 py-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-body4 text-gray3">
              <QuoteIcon className="w-4" />
            </span>
            <span className="text-caption4 text-gray3">인상 깊었던 문장</span>
          </div>

          <div className="flex gap-3 pt-1">
            <div className="bg-gray1 w-1 self-stretch rounded-full" />
            <p className="text-body2 flex-1 whitespace-pre-line">{content}</p>
          </div>
        </div>

        {/* 작성자 / 날짜 */}
        <div className="mt-6 text-center">
          <p className="text-caption4 text-gray3">
            — {writer}
            <span className="text-gray2"> · </span>
            {date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetailPage;
