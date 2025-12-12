import React from "react";
import { cn } from "@/utils/cn";
import type { DebateMessage, DebateType } from "@/_mocks/debateMock";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  message: DebateMessage;
  type?: DebateType;
  /** AI 방 등에서만 켜는 옵션 */
  markdown?: boolean;
}

const DebateMessageBubble: React.FC<Props> = ({
  message,
  type = "FREE",
  markdown = false,
}) => {
  const isMine = message.author === "me";
  const isVS = type === "VS";

  const bubbleColorClass = (() => {
    if (isVS && message.side) {
      if (message.side === 1) return "bg-yellow btn-text-black";
      return "bg-green1 btn-text-white";
    }
    return isMine ? "bg-green1 btn-text-white" : "bg-yellow";
  })();

  const shouldRenderMarkdown = markdown && !isMine; // 내 말은 그대로, 남의 말만 MD

  return (
    <div className={cn("mb-4 flex", isMine ? "justify-end" : "justify-start")}>
      <div>
        {!isMine && (
          <p className="mb-1 text-caption4">{message.nickname}</p>
        )}

        <div
          className={cn(
            "max-w-[260px] rounded-[8px] px-4 py-3 text-body3",
            bubbleColorClass,
          )}
        >
          {shouldRenderMarkdown ? (
            // className은 ReactMarkdown이 아니라 바깥 div에만 줌
            <div className="whitespace-pre-wrap break-words prose prose-sm max-w-none prose-p:mb-2 last:prose-p:mb-0 prose-strong:font-semibold prose-li:my-0">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          ) : (
            <span className="whitespace-pre-wrap break-words">
              {message.content}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebateMessageBubble;
export type { DebateMessage };
