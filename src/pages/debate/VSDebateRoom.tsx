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
  createDiscussionMessage,
  fetchDiscussionLikeStatus,
  likeDiscussion,
  unlikeDiscussion,
} from "@/api/detail/discussion.api";
import { getCurrentUserId } from "@/utils/auth";

interface VSDebateRoomPageProps {
  discussion: Discussion;
}

const VSDebateRoomPage: React.FC<VSDebateRoomPageProps> = ({ discussion }) => {
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
        side:
          m.choice === 1
            ? 1
            : m.choice === 2
            ? 2
            : undefined,
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
      console.error("VS 토론 좋아요 상태 조회 실패:", e);
    }
  };

  useEffect(() => {
    loadMessages().catch((e) => {
      console.error("VS 토론 메시지 불러오기 실패:", e);
    });

    loadLikeStatus().catch((e) => {
      console.error("VS 토론 좋아요 상태 불러오기 실패:", e);
    });
  }, [roomId]);

  const handleSubmit = async ({
    side,
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
        choice: side,
      });

      await loadMessages();
    } catch (e) {
      console.error("VS 토론 메시지 작성 실패:", e);
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
      console.error("VS 토론 좋아요 토글 실패:", e);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  const option1 = discussion.option1 ?? "1번 의견";
  const option2 = discussion.option2 ?? "2번 의견";

  return (
    <div className="flex min-h-screen justify-center bg-beige1">
      {/* 가운데 정렬용 래퍼 + 최대 너비 */}
      <div className="relative flex w-full max-w-[480px] flex-col">
        {/* 상단 고정 헤더 */}
        <div className="sticky top-0 z-10 bg-beige1">
          <Header
            variant="backTitleDropdown"
            onBackClick={() => navigate(-1)}
            title={discussion.title}
            isLiked={liked}                 // ✅ 하트 상태
            likeCount={likeCount}           // ✅ 좋아요 수
            onToggleLike={handleToggleLike} // ✅ 토글 핸들러
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
        </div>

        {/* 메시지 리스트: 가운데만 스크롤 */}
        <section className="flex-1 overflow-y-auto px-5 pb-24 pt-6">
          {messages.map((m) => (
            <DebateMessageBubble key={m.id} message={m} type="VS" />
          ))}
        </section>

        {/* 하단 고정 인풋바 */}
        <div className="sticky bottom-0 left-0 z-20 mx-auto w-full bg-beige1">
          <DebateOpinionBar type="vs" onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default VSDebateRoomPage;
