import React from "react";
import { Image, Badge } from "@/components";
import { CloseIcon } from "@/assets";

export type QuoteTag = {
  id: number;
  label: string;
};

export type QuoteDetailData = {
  bookTitle: string;
  author: string;
  publisher: string;
  coverUrl?: string;
  content: string;
  writer: string;
  date: string;
  tags: QuoteTag[];
};

type QuoteDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: QuoteDetailData;
};

const QuoteDetailModal: React.FC<QuoteDetailModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* 모달 카드 */}
      <div className="w-full max-w-[430px] px-5">
        <div className="rounded-l bg-beige2 border border-gray1 px-5 py-4 shadow-md">
          {/* 헤더 */}
          <div className="mb-3 flex items-center justify-between">
            <p className="text-title6 text-black">인용구</p>
            <button
              type="button"
              onClick={onClose}
              className="flex h-6 w-6 items-center justify-center rounded-full"
            >
              <CloseIcon/>
            </button>
          </div>

          {/* 책 정보 + 표지 */}
          <div className="flex items-center gap-4">
            <div className="h-24 w-[70px] flex-shrink-0">
              <Image
                src={coverUrl}
                alt="책 표지"
                className="h-full w-full"
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
                <Badge variant="tag" key={tag.id} label={tag.label}  />
              ))}
            </div>
          )}

          {/* 구분선 */}
          <div className="my-4 h-px w-full bg-gray1" />

          {/* 인용구 본문 */}
          <div className="px-1">
            <p className="text-body5 text-black whitespace-pre-line">
              {content}
            </p>
          </div>

          {/* 작성자 / 날짜 */}
          <div className="mt-4 text-center">
            <p className="text-caption4 text-gray3">
              — {writer}
              <span className="text-gray2"> · </span>
              {date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetailModal;
