import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import PositionToggle from "@/components/debate/PositionToggle";
import { SendIcon } from "@/assets";

type DebateSide = 1 | 2;
type OpinionBarType = "default" | "vs";

interface DebateOpinionBarProps {
  type?: OpinionBarType;
  disabled?: boolean;
  onSubmit?: (params: { side: DebateSide; content: string }) => void;
}

const DebateOpinionBar: React.FC<DebateOpinionBarProps> = ({
  type = "default",
  disabled = false,
  onSubmit,
}) => {
  const [side, setSide] = useState<DebateSide>(1);
  const [content, setContent] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [content]);

  const handleSubmit = () => {
    if (disabled) return;
    if (!content.trim()) return;

    onSubmit?.({ side, content: content.trim() });
    setContent("");

    const el = textareaRef.current;
    if (el) el.style.height = "auto";
  };

  return (
    <div className={cn(
      "bg-white px-5 py-3",
      disabled && "opacity-50 pointer-events-none"
    )}>
      <div className="flex items-center gap-3">

        {/* 진영 토글 버튼 (VS 모드일 때만) */}
        {type === "vs" && (
          <PositionToggle
            value={side}
            onSideChange={setSide}
            disabled={disabled}
          />
        )}

        {/* 입력창 */}
        <div className="pt-1 flex-1">
          <textarea
            ref={textareaRef}
            value={content}
            disabled={disabled}
            onChange={(e) => setContent(e.target.value)}
            placeholder="의견을 여기에 작성"
            className={cn(
              "w-full resize-none bg-transparent text-body3",
              "focus:outline-none focus:ring-0 placeholder:text-body3",
              "max-h-24",
              disabled && "cursor-not-allowed"
            )}
            rows={1}
            onKeyDown={(e) => {
              if (disabled) return;

              if (e.key === "Enter" && e.shiftKey) return;
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
        </div>

        {/* 전송 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={disabled}
          className={cn(
            "cursor-pointer",
            disabled && "opacity-40 cursor-not-allowed"
          )}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default DebateOpinionBar;
