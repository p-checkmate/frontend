import React, { useRef, useState, type UIEvent } from "react";
import { cn } from "@/utils/cn";

interface CardCarouselProps {
  children: React.ReactNode;
  className?: string;
  showDots?: boolean;
}

const CardCarousel: React.FC<CardCarouselProps> = ({
  children,
  className,
  showDots = true,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = React.Children.count(children);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollLeft, clientWidth } = target;

    const index = Math.round(scrollLeft / clientWidth);
    setCurrentIndex(index);
  };

  return (
    <div className={cn("w-full px-5", className)}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={cn(
          "flex overflow-x-auto scrollbar-hidden",
          "snap-x snap-mandatory pb-2"
        )}
      >
        {React.Children.map(children, (child, i) => (
          <div
            key={i}
            className="snap-start flex-shrink-0 py-1 px-1 w-full pr-4"
          >
            {child}
          </div>
        ))}
      </div>

      {/* 하단 도트 인디케이터 */}
      {showDots && total > 1 && (
        <div className="mb-2 flex justify-center gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-1.5 rounded-full bg-gray2",
                i === currentIndex && "bg-gray3"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardCarousel;
