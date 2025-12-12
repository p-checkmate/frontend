import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header, DebateOpinionBar, DebateMessageBubble } from "@/components";
import type { DebateMessage } from "@/_mocks/debateMock";
import { AIIcon } from "@/assets";

const INITIAL_MESSAGES: DebateMessage[] = [
  {
    id: 1,
    debateRoomId: 0, 
    author: "other",
    nickname: "",
    content: "안녕하세요. AI 도서 토론방입니다. 자유롭게 책 이야기를 나눠보세요!",
  },
];

const AIChatRoomPage: React.FC = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<DebateMessage[]>(INITIAL_MESSAGES);

  const handleSubmit = ({
    content,
  }: {
    side: 1 | 2;
    content: string;
  }) => {
    if (!content.trim()) return;

    const trimmed = content.trim();

    const newUserMessage: DebateMessage = {
      id: Date.now(),
      debateRoomId: 0,
      author: "me",
      nickname: "나",
      content: trimmed,
    };

    const newAiMessage: DebateMessage = {
      id: Date.now() + 1,
      debateRoomId: 0,
      author: "other",
      nickname: "",
      content:
        "아직 실제 AI 응답은 연결되지 않았어요. 곧 이 자리에서 책에 대한 AI 토론이 진행될 예정입니다.",
    };

    setMessages((prev) => [...prev, newUserMessage, newAiMessage]);
  };

  return (
    <div className="flex min-h-screen flex-col bg-beige1">
      {/* 상단 고정 헤더 */}
      <div className="sticky top-0 z-10 bg-beige1">
        <Header
          variant="backTitleDropdown"
          onBackClick={() => navigate(-1)}
          title="AI 도서 토론방"
          dropdownContent={
            <section className="bg-beige2 px-2 pt-1 text-body2 leading-relaxed text-black">
              이 방에서는 AI와 함께 책에 대한 생각을 자유롭게 나눌 수 있습니다.
            </section>
          }
        />
      </div>

      {/* 메시지 리스트 영역 */}
      <div className="flex-1 overflow-y-auto px-5 pb-24 pt-6">
        {messages.map((m) => {
          const isAI = m.author === "other";

          return (
            <div key={m.id} className="mb-4">
              {/* AI 메시지일 때만 아이콘 표시 */}
              {isAI && (
                <div className="mb-1 flex items-center">
                  <AIIcon className="h-8 w-8 text-green1" />
                </div>
              )}

              <DebateMessageBubble message={m} />
            </div>
          );
        })}
      </div>

      {/* 하단 고정 입력 바 */}
      <div className="sticky bottom-0 left-0 z-20 mx-auto w-full bg-beige1">
        <DebateOpinionBar type="default" onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AIChatRoomPage;
