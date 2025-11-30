import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import PositionToggle from "@/components/toggle/PositionToggle";
import { SendIcon } from "@/assets";

type DebateSide = 1 | 2;
type OpinionBarType = "default" | "vs";

interface DebateOpinionBarProps {
  type?: OpinionBarType;
  onSubmit?: (params: { side: DebateSide; content: string }) => void;
}

const DebateOpinionBar: React.FC<DebateOpinionBarProps> = ({
  type = "default",
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
    if (!content.trim()) return;
    onSubmit?.({ side, content: content.trim() });
    setContent("");
    const el = textareaRef.current;
    if (el) el.style.height = "auto";
  };

  return (
    <div className="bg-white px-5 py-3">
      <div className="flex items-center gap-3">
        {/* 진영 토글 버튼 (옵션) */}
        {type === "vs" && (
          <PositionToggle value={side} onSideChange={setSide} />
        )}

        {/* 입력창 */}
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="의견을 여기에 작성"
            className={cn(
              "w-full resize-none bg-transparent text-body3",
              "focus:outline-none focus:ring-0 placeholder:text-body3",
              "max-h-24",
            )}
            rows={1}
          />
        </div>

        {/* 오른쪽 화살표 버튼 */}
        <button onClick={handleSubmit} className="cursor-pointer">
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default DebateOpinionBar;
