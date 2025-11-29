import { useState } from "react";
import { cn } from "@/utils/cn";
import { Input } from "@/components";
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

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit?.({ side, content: content.trim() });
    setContent("");
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
          <Input
            variant="default"
            placeholder="의견을 여기에 작성"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            className={cn(
              "border-none bg-transparent px-0 h-auto text-body3",
              "focus:ring-0 focus:outline-none placeholder:text-body3",
            )}
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
