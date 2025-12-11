import React, { useState, useEffect } from "react";

import { Header, DebateOpinionBar, DebateMessageBubble } from "@/components";

import type { DebateMessage } from "@/_mocks/debateMock";
import { useNavigate } from "react-router-dom";
import {
  fetchDiscussionMessages,
  createDiscussionMessage,
  type Discussion,
  type DiscussionMessage,
} from "@/api/detail/discussion.api";
import { getCurrentUserId } from "@/utils/auth";

interface FreeProps {
  discussion: Discussion;
}

const FreeDebateRoomPage: React.FC<FreeProps> = ({ discussion }) => {
  const roomId = discussion.discussion_id;
  const navigate = useNavigate();

  const [messages, setMessages] = useState<DebateMessage[]>([]);

  const loadMessages = async () => {
    if (!roomId) return;

    const apiMessages = await fetchDiscussionMessages(roomId);
    const myId = getCurrentUserId();

    const mapped = apiMessages.map(
      (m: DiscussionMessage): DebateMessage => ({
        id: m.comment_id,
        debateRoomId: m.discussion_id,
        author: myId && m.user_id === myId ? "me" : "other",
        nickname: m.nickname,
        content: m.content,
      }),
    );

    setMessages(mapped);
  };

  useEffect(() => {
    loadMessages().catch((e) => {
      console.error("자유토론 메시지 불러오기 실패:", e);
    });
  }, [roomId]);

  const handleSubmit = async ({
    content,
  }: {
    side: 1 | 2;
    content: string;
  }) => {
    if (!roomId) return;
    if (!content.trim()) return;

    try {
      await createDiscussionMessage(roomId, {
        content: content.trim(),
      });

      await loadMessages();
    } catch (e) {
      console.error("자유토론 메시지 작성 실패:", e);
      alert("댓글 작성에 실패했습니다.");
    }
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
