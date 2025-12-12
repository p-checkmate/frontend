// src/pages/AIChatRoomPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Header, DebateOpinionBar, DebateMessageBubble } from "@/components";
import type { DebateMessage } from "@/_mocks/debateMock";
import { AIIcon } from "@/assets";
import { createAIChat, sendAIChatMessage } from "@/api/main/chat.api";

const AIChatRoomPage: React.FC = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isResponding, setIsResponding] = useState(false); 

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const res = await createAIChat();

        setChatId(res.chatId);

        setMessages([
          {
            id: Date.now(),
            debateRoomId: 0,
            author: "other",
            nickname: "",
            content: res.message,
          },
        ]);
      } catch (e: any) {
        console.error("AI 채팅방 생성 실패:", e);
        alert(e?.message ?? "AI 채팅방을 생성하지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleSubmit = async ({
    content,
  }: {
    side: 1 | 2;
    content: string;
  }) => {
    if (!content.trim()) return;
    if (!chatId) {
      alert("채팅 세션을 초기화하지 못했습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    const trimmed = content.trim();

    const userMsg: DebateMessage = {
      id: Date.now(),
      debateRoomId: 0,
      author: "me",
      nickname: "",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsResponding(true);

    try {
      const res = await sendAIChatMessage(chatId, trimmed);

      const aiMsg: DebateMessage = {
        id: Date.now() + 1,
        debateRoomId: 0,
        author: "other",
        nickname: "",
        content: res.message,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (e: any) {
      console.error("AI 응답 실패:", e);
      console.error("AI 응답 실패 error.detail:", e?.error);
      alert(e?.message ?? "AI 응답을 가져오지 못했습니다.");
    } finally {
      setIsResponding(false);
    }
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
        {loading && messages.length === 0 && (
          <p className="text-center text-caption3 text-gray3">
            AI 채팅을 준비하고 있어요...
          </p>
        )}

        {messages.map((m) => {
          const isAI = m.author === "other";

          return (
            <div key={m.id} className="mb-4">
              {isAI && (
                <div className="mb-1 flex items-center">
                  <AIIcon className="h-5 w-5 text-green1" />
                </div>
              )}

              <DebateMessageBubble
                message={{
                  ...m,
                  nickname: "",
                }}
              />
            </div>
          );
        })}

        {/* AI 응답 로딩 UI */}
        {isResponding && (
          <p className="mt-2 text-center text-caption3 text-gray3">
            AI가 응답을 작성 중이에요...
          </p>
        )}
      </div>

      {/* 하단 고정 입력 바 */}
      <div className="sticky bottom-0 left-0 z-20 mx-auto w-full bg-beige1">
        <DebateOpinionBar type="default" onSubmit={handleSubmit} disabled={loading}/>
      </div>
    </div>
  );
};

export default AIChatRoomPage;
