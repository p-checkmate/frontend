import React from "react";
import { useParams } from "react-router-dom";

import { getDebateRoomById } from "@/_mocks/debateMock";

import FreeDebateRoomPage from "./FreeDebateRoom";
import VSDebateRoomPage from "./VSDebateRoom";

const DebateRoomPage: React.FC = () => {
  const { debateRoomId } = useParams();
  const roomId = Number(debateRoomId);

  const roomInfo = getDebateRoomById(roomId);

  if (!roomInfo) return <div>토론방을 찾을 수 없습니다.</div>;

  // 타입에 따라 페이지 분기
  if (roomInfo.type === "FREE") {
    return <FreeDebateRoomPage debateRoomId={roomId} />;
  }

  if (roomInfo.type === "VS") {
    return <VSDebateRoomPage debateRoomId={roomId} />;
  }

  return null;
};

export default DebateRoomPage;
