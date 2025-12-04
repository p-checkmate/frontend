import React from "react";
import { cn } from "@/utils/cn";
import type { DebateMessage, DebateType } from "@/_mocks/debateMock";

interface Props {
  message: DebateMessage;
  type?: DebateType;
}

const DebateMessageBubble: React.FC<Props> = ({ message, type = "FREE" }) => {
  const isMine = message.author === "me";
  const isVS = type === "VS";

  const bubbleColorClass = (() => {
    // VS 토론: 진영(side)에 따라 색상 고정
    if (isVS && message.side) {
      if (message.side === 1) {
        return "bg-yellow text-black";
      }
      return "bg-green1 btn-text-white";
    }

    // 기본(FREE) 토론: 내가 보낸 건 초록, 남이 보낸 건 노랑
    return isMine ? "bg-green1 btn-text-white" : "bg-yellow";
  })();

  return (
    <div className={cn("mb-4 flex", isMine ? "justify-end" : "justify-start")}>
      <div>
        {!isMine && <p className="mb-1 text-caption4">{message.nickname}</p>}

        <div
          className={cn(
            "max-w-[260px] rounded-[8px] px-4 py-3 text-body3",
            bubbleColorClass,
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default DebateMessageBubble;
export type { DebateMessage };
