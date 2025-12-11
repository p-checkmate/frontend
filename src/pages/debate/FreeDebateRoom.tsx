import React, { useState, useEffect } from "react";

import { Header, DebateOpinionBar, DebateMessageBubble } from "@/components";

import type { DebateMessage } from "@/_mocks/debateMock";
import { useNavigate } from "react-router-dom";
import {
  fetchDiscussionMessages,
  createDiscussionMessage,
  type Discussion,
  type DiscussionMessage,
  fetchDiscussionLikeStatus,
  likeDiscussion,
  unlikeDiscussion,
} from "@/api/detail/discussion.api";
import { getCurrentUserId } from "@/utils/auth";

interface FreeProps {
  discussion: Discussion;
}

const FreeDebateRoomPage: React.FC<FreeProps> = ({ discussion }) => {
  const roomId = discussion.discussion_id;
  const navigate = useNavigate();

  const [messages, setMessages] = useState<DebateMessage[]>([]);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    (discussion as any).likeCount ?? (discussion as any).like_count ?? 0,
  );

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

  const loadLikeStatus = async () => {
    if (!roomId) return;
    try {
      const isLiked = await fetchDiscussionLikeStatus(roomId);
      setLiked(isLiked);
    } catch (e) {
      console.error("자유 토론 좋아요 상태 조회 실패:", e);
    }
  };

  useEffect(() => {
    loadMessages().catch((e) => {
      console.error("자유토론 메시지 불러오기 실패:", e);
    });

    loadLikeStatus().catch((e) => {
      console.error("자유토론 좋아요 상태 불러오기 실패:", e);
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

  const handleToggleLike = async () => {
    if (!roomId) return;

    try {
      if (liked) {
        await unlikeDiscussion(roomId);
        setLiked(false);
        setLikeCount((prev: number) => Math.max(prev - 1, 0));
      } else {
        await likeDiscussion(roomId);
        setLiked(true);
        setLikeCount((prev: number) => prev + 1);
      }
    } catch (e) {
      console.error("자유토론 좋아요 토글 실패:", e);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-beige1">
      {/* 상단 고정 헤더 */}
      <div className="sticky top-0 z-10 bg-beige1">
        <Header
          variant="backTitleDropdown"
          onBackClick={() => navigate(-1)}
          title={discussion.title}
          isLiked={liked}  
          likeCount={likeCount}  
          onToggleLike={handleToggleLike}
          dropdownContent={
            <section className="bg-beige2 px-2 pt-1 text-body2 leading-relaxed text-black">
              {discussion.content}
            </section>
          }
        />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 pt-6">
        {messages.map((m) => (
          <DebateMessageBubble key={m.id} message={m} />
        ))}
      </div>

      {/* 하단 고정 input bar */}
      <div className="sticky bottom-0 left-0 z-20 mx-auto w-full bg-beige1">
        <DebateOpinionBar type="default" onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default FreeDebateRoomPage;
