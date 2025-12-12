import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "@/components";

import type { DebateMessage } from "@/_mocks/debateMock";
import type {
  Discussion,
  DiscussionMessage,
} from "@/api/detail/discussion.api";
import { fetchDiscussionMessages, voteDiscussion } from "@/api/detail/discussion.api"; // 💡 voteDiscussion 임포트 추가
import { getCurrentUserId } from "@/utils/auth";

const DAY_MS = 24 * 60 * 60 * 1000;
const DEBATE_DURATION_DAYS = 7;

interface VSDebateResultPageProps {
  discussion: Discussion;
}

const VSDebateResultPage: React.FC<VSDebateResultPageProps> = ({
  discussion,
}) => {
  const roomId = discussion.discussion_id;
  const navigate = useNavigate();

  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [selectedSide, setSelectedSide] = useState<1 | 2 | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voting, setVoting] = useState(false); // 💡 voting 상태 추가

  // ===== 메시지 로드 (기존과 동일) =====
  useEffect(() => {
    // ... (기존 useEffect 로직 생략)
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


  // ===== 통계 계산 (기존과 동일) =====
  const total = messages.length;
  const side1Count = messages.filter((m) => m.side === 1).length;
  const side2Count = messages.filter((m) => m.side === 2).length;

  const side1Ratio = total ? Math.round((side1Count / total) * 100) : 0;
  const side2Ratio = total ? 100 - side1Ratio : 0;

  const createdAt = discussion.created_at
    ? new Date(discussion.created_at)
    : null;
  const endedAt = createdAt
    ? new Date(createdAt.getTime() + DEBATE_DURATION_DAYS * DAY_MS)
    : null;

  const formatDate = (d: Date | null) => {
    if (!d) return "";
    const yyyy = d.getFullYear();
    const mm = `${d.getMonth() + 1}`.padStart(2, "0");
    const dd = `${d.getDate()}`.padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  };

  const option1 = discussion.option1 ?? "1번 의견";
  const option2 = discussion.option2 ?? "2번 의견";

  // 💡 투표 API 연동 로직
  const handleVote = async (side: 1 | 2) => {
    console.log(`[HANDLE VOTE] Clicked on side ${side}. hasVoted: ${hasVoted}, voting: ${voting}`);

    if (hasVoted) {
        console.log("[HANDLE VOTE] Already voted, returning.");
        return;
    }
    if (voting) {
        console.log("[HANDLE VOTE] Currently voting, returning.");
        return;
    }
    
    try {
      setVoting(true); // API 호출 시작
      
      // 💡 실제 최종 투표 API 연동
      const res = await voteDiscussion(roomId, side); 
      console.log("투표 API 호출 성공:", res.message);

      setSelectedSide(side);
      setHasVoted(true); // 성공 시에만 상태 업데이트
      // TODO: 투표 완료 토스트 메시지 띄우기
    } catch (e: any) {
      console.error("투표 API 호출 실패:", e.message || e); // 에러 상세 로그
      // TODO: 에러 토스트 메시지 띄우기
    } finally {
      setVoting(false); // API 호출 완료
    }
  };

  return (
    <div className="flex min-h-screen justify-center bg-beige1">
      <div className="flex w-full flex-col">
        {/* Header 부분 (생략) */}
        <Header
          variant="backTitleDropdown"
          onBackClick={() => navigate(-1)}
          title={discussion.title}
          dropdownContent={
            <div className="bg-beige2 pt-1">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-14 items-center justify-center rounded-m bg-yellow text-body2">
                    1번
                  </span>
                  <span className="text-body2">{option1}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="inline-flex h-8 w-14 items-center justify-center rounded-m bg-green1 text-body2 text-white">
                    2번
                  </span>
                  <span className="text-body2">{option2}</span>
                </div>
              </div>
            </div>
          }
        />

        <section className="flex-1 px-5 pb-6 pt-6">
          {/* 상단 카드 - 종료 안내 (생략) */}
          <div className="mb-4 rounded-l bg-white p-4 shadow-sm">
            <div className="mb-2 inline-flex items-center rounded-full border border-green1 bg-white px-3 py-1 text-caption5 text-green1">
              VS 토론 종료
            </div>
            <h2 className="mb-1 text-title4">{discussion.title}</h2>
            <p className="text-body2 text-gray3">
              이 토론은{" "}
              <span className="font-semibold">
                {endedAt ? formatDate(endedAt) : "일주일 뒤"}
              </span>
              에 종료되었어요. 총{" "}
              <span className="font-semibold">{total}</span>개의 의견이 오갔어요.
            </p>
          </div>

          {/* 토론 요약 영역 (생략) */}
          <div className="mb-4 rounded-l bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-title6">토론 요약</h3>
            <p className="text-body2 text-gray3">
              1번 측에서 {side1Count}개의 메시지, 2번 측에서 {side2Count}
              개의 메시지가 작성되었어요.{" "}
            </p>
            <p className="text-body2 text-gray2">
              AI토론 요약문 어쩌고 저쩌고 1번측은 이렇게 생각해요 2번측은
              ~라는 의견을 내세웠지만 ~에 반박당했어요
            </p>
          </div>

          {/* 의견 비율 바 (생략) */}
          <div className="mb-4 rounded-l bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-title6">참여자 의견 비율</h3>

            {/* 1번 */}
            <div className="mb-2 flex items-center justify-between text-caption3 text-gray3">
              <span>1번 의견</span>
              <span>{side1Ratio}%</span>
            </div>
            <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-beige2">
              <div
                className="h-full rounded-full bg-yellow transition-all"
                style={{ width: `${side1Ratio}%` }}
              />
            </div>

            {/* 2번 */}
            <div className="mb-2 flex items-center justify-between text-caption3 text-gray3">
              <span>2번 의견</span>
              <span>{side2Ratio}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-beige2">
              <div
                className="h-full rounded-full bg-green1 transition-all"
                style={{ width: `${side2Ratio}%` }}
              />
            </div>
          </div>

          {/* 최종 투표 카드 */}
          <div className="rounded-l bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-title6">최종 투표</h3>
            <p className="mb-4 text-body2 text-gray3">
              이제 토론 내용을 바탕으로 어떤 의견에 더 공감하는지 선택해 주세요.
              <br />
              * 한 번만 선택할 수 있어요.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {/* 1번 카드 */}
              <button
                type="button"
                onClick={() => handleVote(1)}
                disabled={(hasVoted && selectedSide !== 1) || voting}
                className={`
                  group flex h-24 flex-col justify-center rounded-l transition-all
                  ${
                    selectedSide === 1
                      ? "bg-yellow text-black"
                      : "bg-white text-gray3 shadow-sm active:scale-[0.98]"
                  }
                  ${
                    (hasVoted && selectedSide !== 1) || voting // 💡 voting 상태 CSS에 추가
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-md"
                  }
                `}
              >
                {/* ... (UI 내용 생략) */}
                <span
                  className={`
                    mb-2 inline-flex h-7 w-12 items-center justify-center rounded-m 
                    ${
                      selectedSide === 1
                        ? "bg-black text-white"
                        : "bg-yellow text-black"
                    }
                    text-caption3
                  `}
                >
                  1번
                </span>
                <span className="text-caption2 font-medium">
                  1번 의견에 투표
                </span>
              </button>

              {/* 2번 카드 */}
              <button
                type="button"
                onClick={() => handleVote(2)}
                disabled={(hasVoted && selectedSide !== 2) || voting}
                className={`
                  group flex h-24 flex-col justify-center rounded-l border transition-all
                  ${
                    selectedSide === 2
                      ? "border-green1 bg-green1 text-white"
                      : "border-gray1 bg-white text-gray3 shadow-sm active:scale-[0.98]"
                  }
                  ${
                    (hasVoted && selectedSide !== 2) || voting // 💡 voting 상태 CSS에 추가
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:shadow-md"
                  }
                `}
              >
                {/* ... (UI 내용 생략) */}
                <span
                  className={`
                    mb-2 inline-flex h-7 w-12 items-center justify-center rounded-m 
                    ${
                      selectedSide === 2
                        ? "bg-white text-green1"
                        : "bg-green1 text-white"
                    }
                    text-caption3
                  `}
                >
                  2번
                </span>
                <span className="text-caption2 font-medium">
                  2번 의견에 투표
                </span>
              </button>
            </div>

            {selectedSide && (
              <p className="mt-3 text-center text-caption3 text-green1">
                {selectedSide}번 의견에 투표했어요.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default VSDebateResultPage;