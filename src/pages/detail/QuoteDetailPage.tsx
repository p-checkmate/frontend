import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Badge, Header } from "@/components";
import { getQuoteDetailById, type QuoteDetailData } from "@/_mocks/quoteDetailMock";
import { QuoteIcon } from "@/assets";

const QuoteDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { quoteId } = useParams<{ quoteId: string }>();

  const id = Number(quoteId);
  const data: QuoteDetailData | undefined = getQuoteDetailById(id);

  if (!data) {
    return (
      <div className="min-h-screen bg-beige1 px-5 py-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 text-caption2 text-gray3"
        >
          ← 뒤로가기
        </button>
        <p className="mt-10 text-center text-body3 text-gray4">
          인용구 정보를 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  const {
    bookTitle,
    author,
    publisher,
    coverUrl,
    content,
    writer,
    date,
    tags,
  } = data;

  return (
    <div className="min-h-screen bg-beige1">
      {/* 상단 헤더 */}
      <Header variant="backTitle" title="인용구" onBackClick={()=>navigate(-1)}/>
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
        {tags && tags.length > 0 && (
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
            <span className="text-body4 text-gray3"><QuoteIcon className="w-4"/></span>
            <span className="text-caption4 text-gray3">인상 깊었던 문장</span>
          </div>

          <div className="flex gap-3 pt-1">
            <div className="self-stretch w-1 rounded-full bg-gray1"/>
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
