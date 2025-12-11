import React, { useEffect, useState } from "react";

import { Header, DebateOpinionBar, DebateMessageBubble } from "@/components";

import type { DebateMessage } from "@/_mocks/debateMock";
import { useNavigate } from "react-router-dom";
import type {
  Discussion,
  DiscussionMessage,
} from "@/api/detail/discussion.api";
import {
  fetchDiscussionMessages,
} from "@/api/detail/discussion.api";
import { getCurrentUserId } from "@/utils/auth";

interface VSDebateRoomPageProps {
  discussion: Discussion;
}

const VSDebateRoomPage: React.FC<VSDebateRoomPageProps> = ({ discussion }) => {
  const roomId = discussion.discussion_id;
  const navigate = useNavigate();

  const [messages, setMessages] = useState<DebateMessage[]>([]);

  useEffect(() => {
    if (!roomId) return;

    (async () => {
      try {
        const apiMessages = await fetchDiscussionMessages(roomId);
        const myId = getCurrentUserId();

        const mapped = apiMessages.map(
          (m: DiscussionMessage): DebateMessage => ({
            id: m.comment_id,
            debateRoomId: m.discussion_id,
            author: myId && m.user_id === myId ? "me" : "other",
            nickname: m.nickname,
            content: m.content,
            side:
              m.choice === 1
                ? 1
                : m.choice === 2
                ? 2
                : undefined,
          }),
        );

        setMessages(mapped);
      } catch (e) {
        console.error("VS 토론 메시지 불러오기 실패:", e);
      }
    })();
  }, [roomId]);

  const handleSubmit = ({
    side,
    content,
  }: {
    side: 1 | 2;
    content: string;
  }) => {
    if (!roomId) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        debateRoomId: roomId,
        author: "me",
        nickname: "나",
        content,
        side,
      },
    ]);
  };

  const option1 = discussion.option1 ?? "1번 의견";
  const option2 = discussion.option2 ?? "2번 의견";

  return (
    <div className="flex min-h-screen justify-center bg-beige1">
      <div className="flex w-full flex-col">
        <Header
          variant="backTitleDropdown"
          onBackClick={() => navigate(-1)}
          title={discussion.title}
          dropdownContent={
            <div className="bg-beige2 pt-1">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-14 items-center justify-center rounded-[8px] bg-yellow text-body2">
                    1번
                  </span>
                  <span className="text-body2">{option1}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="inline-flex h-8 w-14 items-center justify-center rounded-[8px] bg-green1 text-body2 text-white">
                    2번
                  </span>
                  <span className="text-body2">{option2}</span>
                </div>
              </div>
            </div>
          }
        />

        <div className="flex flex-1 flex-col bg-beige1">
          <section className="flex-1 px-5 pb-4 pt-6">
            {messages.map((m) => (
              <DebateMessageBubble key={m.id} message={m} type="VS" />
            ))}
          </section>
        </div>

        <DebateOpinionBar type="vs" onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default VSDebateRoomPage;
