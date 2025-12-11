import React, { useState, useEffect } from "react";

import { Header, DebateOpinionBar, DebateMessageBubble } from "@/components";

import type { DebateMessage } from "@/_mocks/debateMock";
import { getMessagesByDebateRoomId } from "@/_mocks/debateMock";
import { useNavigate } from "react-router-dom";
import type { Discussion } from "@/api/detail/discussion.api";

interface FreeProps {
  discussion: Discussion;
}

const FreeDebateRoomPage: React.FC<FreeProps> = ({ discussion }) => {
  const roomId = discussion.discussion_id;
  const navigate = useNavigate();

  const [messages, setMessages] = useState<DebateMessage[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const msgs = getMessagesByDebateRoomId(roomId);
    setMessages(msgs);
  }, [roomId]);

  /** 메시지 전송 */
  const handleSubmit = ({ content }: { side: 1 | 2; content: string }) => {
    if (!roomId) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        debateRoomId: roomId,
        author: "me",
        nickname: "나",
        content,
      },
    ]);
  };

  return (
    <div className="flex min-h-screen justify-center bg-beige1">
      <div className="flex w-full flex-col">
        <Header
          variant="backTitleDropdown"
          onBackClick={() => navigate(-1)}
          title={discussion.title}
          dropdownContent={
            <section className="bg-beige2 px-2 pt-1 text-body2 leading-relaxed text-black">
              {discussion.content}
            </section>
          }
        />

        <div className="flex flex-1 flex-col bg-beige1">
          <section className="flex-1 px-5 pb-4 pt-6">
            {messages.map((m) => (
              <DebateMessageBubble key={m.id} message={m} />
            ))}
          </section>
        </div>

        <DebateOpinionBar type="default" onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default FreeDebateRoomPage;
