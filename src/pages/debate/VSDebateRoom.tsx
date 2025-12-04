import React, { useEffect, useState } from "react";

import { Header, DebateOpinionBar, DebateMessageBubble } from "@/components";

import type { DebateMessage, DebateRoom } from "@/_mocks/debateMock";
import {
  getMessagesByDebateRoomId,
  getDebateRoomById,
} from "@/_mocks/debateMock";
import { useNavigate } from "react-router-dom";

interface VSDebateRoomPageProps {
  debateRoomId: number;
}

const VSDebateRoomPage: React.FC<VSDebateRoomPageProps> = ({debateRoomId}) => {
  const roomId = Number(debateRoomId);
  const navigate=useNavigate();
  const [roomInfo, setRoomInfo] = useState<DebateRoom | null>(null);
  const [messages, setMessages] = useState<DebateMessage[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const room = getDebateRoomById(roomId);
    const msgs = getMessagesByDebateRoomId(roomId);

    if (!room || room.type !== "VS") {
      setRoomInfo(null);
      setMessages([]);
      return;
    }

    setRoomInfo(room);
    setMessages(msgs);
  }, [roomId]);

  /** 메시지 전송 */
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

  if (!roomInfo) return <div>토론방을 찾을 수 없습니다.</div>;

  return (
    <div className="flex min-h-screen justify-center bg-beige1">
      <div className="flex w-full flex-col">
        <Header
          variant="backTitleDropdown"
          onBackClick={()=>navigate(-1)}
          title={roomInfo.title}
          dropdownContent={
            <div className="bg-beige2 pt-1">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center rounded-[8px] bg-yellow w-14 h-8 text-body2">
                    1번
                  </span>
                  <span className="text-body2">어쩌고 저쩌고 1번 의견</span>
                </div>
                <div className="pt-1 flex items-center gap-2">
                  <span className="inline-flex items-center justify-center rounded-[8px] bg-green1 w-14 h-8 text-body2 text-white">
                    2번
                  </span>
                  <span className="text-body2">어쩌고 저쩌고 2번 의견</span>
                </div>
              </div>
            </div>
          }
        />

        <div className="flex flex-1 flex-col bg-beige1">
          <section className="flex-1 px-5 pb-4 pt-6">
            {messages.map((m) => (
              <DebateMessageBubble key={m.id} message={m} type="VS"/>
            ))}
          </section>
        </div>

        <DebateOpinionBar type="vs" onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default VSDebateRoomPage;
