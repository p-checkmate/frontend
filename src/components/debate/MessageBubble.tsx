import React from "react";
import { cn } from "@/utils/cn";
import type { DebateMessage } from "@/_mocks/debateMock";

interface Props {
  message: DebateMessage;
}

const DebateMessageBubble: React.FC<Props> = ({ message }) => {
  const isMine = message.author === "me";

  return (
    <div className={cn("mb-4 flex", isMine ? "justify-end" : "justify-start")}>
      <div>
        {/* 내가 보낸 메시지는 닉네임 숨김 */}
        {!isMine && (
          <p className="mb-1 text-caption4">{message.nickname}</p>
        )}

        <div
          className={cn(
            "max-w-[260px] rounded-2xl px-4 py-3 text-body3",
            isMine ? "bg-green1 text-white" : "bg-yellow",
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
