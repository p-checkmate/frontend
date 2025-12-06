import React from "react";
import { cn } from "@/utils/cn";
import {
  Character1,
  Character2,
  Character3,
  Character4,
  Character5,
} from "@/assets";

type CharacterComponentType = React.FC<React.SVGProps<SVGSVGElement>>;

const characterImages: { [key: number]: CharacterComponentType } = {
  1: Character1,
  2: Character2,
  3: Character3,
  4: Character4,
  5: Character5,
};

interface BookMarathonCardProps {
  userName: string; //유저네임
  totalPage: number; //해당 도서 총 페이지
  readPage: number; //유저가 읽은 페이지
  memo: string; //유저한줄메모
  level: 1 | 2 | 3 | 4 | 5; //유저레벨
  isCurrentUser: boolean; //유저인지 아니면 다른 사람인지
}

const BookMarathonCard: React.FC<BookMarathonCardProps> = ({
  userName,
  totalPage,
  readPage,
  memo,
  level,
  isCurrentUser,
}) => {
  const percent =
    totalPage > 0 && readPage >= 0
      ? Math.min(100, Math.floor((readPage / totalPage) * 100))
      : 0;

  // 너무 끝에 딱 붙지 않도록 여유
  const safePercent = Math.min(96, Math.max(4, percent));

  const CharacterComponent = characterImages[level] || characterImages[1];

  return (
    <div
      className={cn(
        // 가로 길게
        "relative w-full max-w-[440px] bg-white rounded-m px-5 pt-2 pb-2 box-border shadow-sm",
        isCurrentUser ? "border border-green1" : "border border-gray2"
      )}
    >
      {/* 1. 상단: 닉네임 + 진행률 */}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "text-caption4 font-medium",
            isCurrentUser ? "text-green1" : "text-black"
          )}
        >
          {userName}
        </span>
        <span className="text-caption4 text-gray3">
          {percent}% · {totalPage}p
        </span>
      </div>

      {/* 2. 진행 라인 + 캐릭터 */}
      <div className="relative h-[72px]">
        {/* 라인 */}
        <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-gray2">
          {/* 시작/끝 점 */}
          <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gray3" />
          <div className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gray3" />
        </div>

        {/* 캐릭터를 중앙에 */}
        <CharacterComponent
          width={60}
          height={60}
          className="absolute top-1/2 transition-all duration-500 ease-out"
          style={{
            left: `${safePercent}%`,
            transform: "translate(-50%, -60%)",
          }}
        />
      </div>

      {/* 3. 한 줄 메모 말풍선 */}
      <div>
        <div className="inline-flex max-w-[80%] items-center rounded-sm border border-green1 bg-white px-3 py-1">
          <span className="text-body4 text-black truncate">
            {memo || "아직 작성된 한줄 감상이 없습니다."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookMarathonCard;
