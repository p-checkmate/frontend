import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Badge, Header } from "@/components";
import { QuoteIcon } from "@/assets";
import { fetchQuoteDetail } from "@/api/detail/quote.api";
import { formatKoreanDate } from "@/utils/date";

const QuoteDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { quoteId } = useParams<{ quoteId: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 인용구 상세 데이터
  const [quote, setQuote] = useState<{
    quote_id: number;
    user_id: number;
    nickname: string;
    book_id: number;
    content: string;
    like_count: number;
    created_at: string;
    updated_at: string | null;
  } | null>(null);

  useEffect(() => {
    if (!quoteId) {
      setError("잘못된 접근입니다.");
      setLoading(false);
      return;
    }

    const id = Number(quoteId);
    if (Number.isNaN(id)) {
      setError("유효하지 않은 인용구 ID입니다.");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError(null);

        // 인터셉터 때문에 fetchQuoteDetail 결과는 바로 data 객체
        const quoteData = await fetchQuoteDetail(id);
        setQuote(quoteData);
      } catch (err: any) {
        console.error("인용구 상세 조회 실패:", err);
        setError("인용구 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [quoteId]);

  // ===== 로딩 / 에러 처리 =====
  if (loading) {
    return (
      <div className="min-h-screen bg-beige1">
        <Header
          variant="backTitle"
          title="인용구"
          onBackClick={() => navigate(-1)}
        />
        <p className="mt-10 text-center text-body3 text-gray4">
          인용구 정보를 불러오는 중입니다…
        </p>
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="min-h-screen bg-beige1">
        <Header
          variant="backTitle"
          title="인용구"
          onBackClick={() => navigate(-1)}
        />
        <p className="mt-10 text-center text-body3 text-gray4">
          {error ?? "인용구 정보를 찾을 수 없습니다."}
        </p>
      </div>
    );
  }

  // ===== 화면에 쓸 데이터 매핑 =====
  // 🔹 책 정보는 일단 임시 하드코딩
  const bookTitle = "임시 책 제목";
  const author = "임시 저자";
  const publisher = "임시 출판사";
  const coverUrl = "https://via.placeholder.com/80x112?text=Book";

  const content = quote.content;
  const writer = quote.nickname;
  const date = formatKoreanDate(quote.created_at);

  // 아직 태그 없음
  const tags: { id: number; label: string }[] = [];

  return (
    <div className="min-h-screen bg-beige1">
      {/* 상단 헤더 */}
      <Header
        variant="backTitle"
        title="인용구"
        onBackClick={() => navigate(-1)}
      />

      <div className="px-5 py-3">
        {/* 책 정보 + 표지 */}
        <div className="flex items-center gap-4">
          <div className="h-28 w-[80px] flex-shrink-0">
            <Image
              src={coverUrl}
              alt="책 표지"
              className="h-full w-full rounded"
            />
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
        <div className="my-5 h-px w-full bg-gray1" />

        {/* 인용구 본문 */}
        <div className="mt-4 rounded-l bg-beige2 px-4 py-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-body4 text-gray3">
              <QuoteIcon className="w-4" />
            </span>
            <span className="text-caption4 text-gray3">인상 깊었던 문장</span>
          </div>

          <div className="flex gap-3 pt-1">
            <div className="self-stretch w-1 rounded-full bg-gray1" />
            <p className="flex-1 whitespace-pre-line text-body2">
              {content}
            </p>
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
