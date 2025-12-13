import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

type TogetherReadCardProps = {
  title: string;
  participants: number;
  remainDays: number;
  isJoined: boolean;
  progress?: number;
  rank?: number;
  thumbnailUrl?: string;
  onClick?: () => void;
  totalDays?: number;
  className?: string;
};

const TogetherReadCard: React.FC<TogetherReadCardProps> = ({
  title,
  participants,
  remainDays,
  isJoined,
  progress = 0,
  rank,
  onClick,
  totalDays,
  className,
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    if (isJoined) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedProgress(0);
    }
  }, [isJoined, progress]);

  return (
    <div
      className={cn(
        "w-full rounded-l bg-beige2 px-5 py-5 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        {/* 텍스트 영역 */}
        <div className="flex flex-1 flex-col gap-[5px]">
          <p className="text-caption4 text-gray3">
            {totalDays}일 동안 함께 읽는 책
          </p>
          <h3 className="text-title6">{title}</h3>

          <p className="text-caption4 text-gray3">
            남은 기간 <span className="text-green1">D-{remainDays}</span> ·
            참여자 <span className="text-green1">{participants}명</span>
          </p>

          {isJoined ? (
            <p className="text-caption4">
              참여자 중 {rank}번째로 많이 읽었어요
            </p>
          ) : (
            <p className="text-caption4 text-gray3">
              아직 참여하지 않았어요
            </p>
          )}
        </div>

        <div className="flex-shrink-0">
          {isJoined ? (
            <CircleProgress percent={animatedProgress} />
          ) : (
            <CircleNotJoined />
          )}
        </div>
      </div>

      {/* 버튼 */}
      <div className="mt-5 flex justify-center">
        <button
          className="cursor-pointer bg-green1 btn-text-white text-caption5 h-7.5 px-10 rounded-2xl"
          onClick={onClick}
        >
          {isJoined ? "함께 읽기 방으로" : "함께 읽기 참여하기"}
        </button>
      </div>
    </div>
  );
};

export default TogetherReadCard;


const CircleProgress = ({ percent }: { percent: number }) => {
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    let frameId: number;
    const duration = 600;
    const start = performance.now();
    const startVal = animatedPercent;
    const diff = percent - startVal;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const next = startVal + diff * t;
      setAnimatedPercent(next);

      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [percent]);

  const clamped = Math.max(0, Math.min(100, animatedPercent));

  const backgroundImage = `conic-gradient(
    var(--color-green1) 0% ${clamped}%,
    var(--color-gray1) ${clamped}% 100%
  )`;

  return (
    <div className="flex items-center justify-center">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full"
        style={{ backgroundImage }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-beige2">
          <span className="text-body1 text-green1">
            {Math.round(clamped)}%
          </span>
        </div>
      </div>
    </div>
  );
};


const CircleNotJoined = () => {
  const backgroundImage = `conic-gradient(
    var(--color-gray1) 0% 100%
  )`;

  return (
    <div className="flex items-center justify-center">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full"
        style={{ backgroundImage }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-beige2">
          <span className="text-caption4 text-gray3">미참여</span>
        </div>
      </div>
    </div>
  );
};
