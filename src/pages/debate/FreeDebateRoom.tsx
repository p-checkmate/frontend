import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Header, DebateOpinionBar, DebateMessageBubble } from "@/components";

import type { DebateMessage, DebateRoom } from "@/_mocks/debateMock";
import { getMessagesByDebateRoomId, getDebateRoomById } from "@/_mocks/debateMock";

const FreeDebateRoomPage: React.FC = () => {
  const { debateRoomId } = useParams(); // URL에서 :debateRoomId 가져오기
  const roomId = Number(debateRoomId);

  const [roomInfo, setRoomInfo] = useState<DebateRoom | null>(null);
  const [messages, setMessages] = useState<DebateMessage[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const room = getDebateRoomById(roomId);
    const msgs = getMessagesByDebateRoomId(roomId);

    setRoomInfo(room ?? null);
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

  if (!roomInfo) return <div>토론방을 찾을 수 없습니다.</div>;

  return (
    <div className="flex min-h-screen justify-center bg-beige1">
      <div className="flex w-full max-w-[430px] flex-col">
        <Header variant="backTitleDropdown" title={roomInfo.title} dropdownContent={<section className="bg-beige2 px-2 text-body2 leading-relaxed text-black">
            {roomInfo.description}
          </section>}/>

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
