import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '@/components';

import type { DebateMessage } from '@/_mocks/debateMock';
import type { Discussion, DiscussionMessage } from '@/api/detail/discussion.api';
import {
  fetchDiscussionMessages,
  voteDiscussion,
  fetchDiscussionVoteStatus,
  fetchDiscussionSummary,
  type DiscussionSummary,
  fetchDiscussionLikeStatus,
  likeDiscussion,
  unlikeDiscussion,
} from '@/api/detail/discussion.api';
import { getCurrentUserId } from '@/utils/auth';

interface VSDebateResultPageProps {
  discussion: Discussion;
}

const VSDebateResultPage: React.FC<VSDebateResultPageProps> = ({ discussion }) => {
  const roomId = discussion.discussion_id;
  const navigate = useNavigate();

  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [selectedSide, setSelectedSide] = useState<1 | 2 | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voting, setVoting] = useState(false);

  const [voteStatusLoading, setVoteStatusLoading] = useState(true);

  const [summary, setSummary] = useState<DiscussionSummary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(true);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    (discussion as any).likeCount ?? (discussion as any).like_count ?? 0,
  );

  // ===== 메시지 로드 =====
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
            author: myId && m.user_id === myId ? 'me' : 'other',
            nickname: m.nickname,
            content: m.content,
            side: m.choice === 1 ? 1 : m.choice === 2 ? 2 : undefined,
          }),
        );

        setMessages(mapped);
      } catch (e) {
        console.error('VS 토론 메시지 불러오기 실패:', e);
      }
    })();
  }, [roomId]);

  // ===== summary 로드 =====
  useEffect(() => {
    if (!roomId) return;

    (async () => {
      try {
        setSummaryLoading(true);
        const data = await fetchDiscussionSummary(roomId);
        setSummary(data);
      } catch (e: any) {
        console.error('summary 불러오기 실패:', e?.message || e);
        setSummary(null);
      } finally {
        setSummaryLoading(false);
      }
    })();
  }, [roomId]);

  // ===== vote-status 로드 =====
  useEffect(() => {
    if (!roomId) return;

    (async () => {
      try {
        setVoteStatusLoading(true);

        const status = await fetchDiscussionVoteStatus(roomId);

        if (status.is_voted) {
          setHasVoted(true);
          if (status.choice === 1 || status.choice === 2) {
            setSelectedSide(status.choice);
          } else {
            setSelectedSide(null);
          }
        } else {
          setHasVoted(false);
          setSelectedSide(null);
        }
      } catch (e: any) {
        console.error('vote-status 불러오기 실패:', e?.message || e);
        setHasVoted(false);
        setSelectedSide(null);
      } finally {
        setVoteStatusLoading(false);
      }
    })();
  }, [roomId]);

  // ===== like-status 로드 =====
  useEffect(() => {
    if (!roomId) return;

    (async () => {
      try {
        const isLiked = await fetchDiscussionLikeStatus(roomId);
        setLiked(isLiked);
      } catch (e: any) {
        console.error('좋아요 상태 조회 실패:', e?.message || e);
      }
    })();
  }, [roomId]);

  // ===== 통계 계산 =====
  const total = summary?.total_comments ?? messages.length;

  const side1Count = messages.filter((m) => m.side === 1).length;
  const side2Count = messages.filter((m) => m.side === 2).length;

  const side1Ratio = summary?.opinion_ratio?.option1_percentage;
  const side2Ratio = summary?.opinion_ratio?.option2_percentage;

  const option1 = summary?.option1 ?? discussion.option1 ?? '1번 의견';
  const option2 = summary?.option2 ?? discussion.option2 ?? '2번 의견';

  const summaryText = summary?.summary ?? 'AI토론 요약문';

  // ===== 투표 =====
  const handleVote = async (side: 1 | 2) => {
    if (voteStatusLoading) return;
    if (hasVoted) return;
    if (voting) return;
    if (!roomId) return;

    try {
      setVoting(true);
      const res = await voteDiscussion(roomId, side);
      console.log('투표 API 호출 성공:', res.message);

      setSelectedSide(side);
      setHasVoted(true);

      setSummaryLoading(true);
      const nextSummary = await fetchDiscussionSummary(roomId);
      setSummary(nextSummary);

      setVoteStatusLoading(true);
      const status = await fetchDiscussionVoteStatus(roomId);
      setHasVoted(status.is_voted);
      setSelectedSide(status.choice === 1 || status.choice === 2 ? status.choice : null);
    } catch (e: any) {
      console.error('투표 API 호출 실패:', e?.message || e);
    } finally {
      setVoting(false);
      setSummaryLoading(false);
      setVoteStatusLoading(false);
    }
  };

  // ===== 좋아요 토글 =====
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
    } catch (e: any) {
      console.error('좋아요 토글 실패:', e?.message || e);
      alert('좋아요 처리에 실패했습니다.');
    }
  };

  return (
    <div className="bg-beige1 flex min-h-screen justify-center">
      <div className="flex w-full max-w-[480px] flex-col">
        <div className="bg-beige1 sticky top-0 z-50">
          <Header
            variant="backTitleDropdown"
            onBackClick={() => navigate(-1)}
            title={discussion.title}
            isLiked={liked}
            likeCount={likeCount}
            onToggleLike={handleToggleLike}
            dropdownContent={
              <div className="bg-beige2 pt-1">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-m bg-yellow text-body2 inline-flex h-8 w-14 items-center justify-center">
                      1번
                    </span>
                    <span className="text-body2">{option1}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="rounded-m bg-green1 text-body2 inline-flex h-8 w-14 items-center justify-center text-white">
                      2번
                    </span>
                    <span className="text-body2">{option2}</span>
                  </div>
                </div>
              </div>
            }
          />
        </div>

        <section className="flex-1 px-5 pt-6 pb-6">
          <div className="mb-4 rounded-l bg-white p-4 shadow-sm">
            <div className="border-green1 text-caption5 text-green1 mb-2 inline-flex items-center rounded-full border bg-white px-3 py-1">
              VS 토론 종료
            </div>
            <h2 className="text-title4 mb-1">{discussion.title}</h2>
            <p className="text-body2 text-gray3">
              이 토론은 <span className="font-semibold">{summary?.ended_at ?? '종료일 없음'}</span>
              에 종료되었어요. 총 <span className="font-semibold">{total}</span>개의 의견이
              오갔어요.
            </p>
          </div>

          <div className="mb-4 rounded-l bg-white p-4 shadow-sm">
            <h3 className="text-title6 mb-2">토론 요약</h3>
            <p className="text-body2 text-gray3">
              1번 측에서 {side1Count}개의 메시지, 2번 측에서 {side2Count}개의 메시지가 작성되었어요.
            </p>
            <p className="text-body2 text-gray2">
              {summaryLoading ? '요약 불러오는 중...' : summaryText}
            </p>
          </div>

          <div className="mb-4 rounded-l bg-white p-4 shadow-sm">
            <h3 className="text-title6 mb-3">참여자 의견 비율</h3>

            <div className="text-caption3 text-gray3 mb-2 flex items-center justify-between">
              <span>1번 의견</span>
              <span> {summaryLoading ? '불러오는 중...' : side1Ratio}%</span>
            </div>
            <div className="bg-beige2 mb-3 h-2 w-full overflow-hidden rounded-full">
              <div
                className="bg-yellow h-full rounded-full transition-all"
                style={{ width: `${side1Ratio}%` }}
              />
            </div>

            <div className="text-caption3 text-gray3 mb-2 flex items-center justify-between">
              <span>2번 의견</span>
              <span>{summaryLoading ? '불러오는 중...' : side2Ratio}%</span>
            </div>
            <div className="bg-beige2 h-2 w-full overflow-hidden rounded-full">
              <div
                className="bg-green1 h-full rounded-full transition-all"
                style={{ width: `${side2Ratio}%` }}
              />
            </div>
          </div>

          <div className="rounded-l bg-white p-4 shadow-sm">
            <h3 className="text-title6 mb-2">최종 투표</h3>
            <p className="text-body2 text-gray3 mb-4">
              이제 토론 내용을 바탕으로 어떤 의견에 더 공감하는지 선택해 주세요.
              <br />* 한 번만 선택할 수 있어요.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleVote(1)}
                disabled={(hasVoted && selectedSide !== 1) || voting || voteStatusLoading}
                className={`group flex h-24 flex-col justify-center rounded-l transition-all ${
                  selectedSide === 1
                    ? 'bg-yellow text-black'
                    : 'text-gray3 bg-white shadow-sm active:scale-[0.98]'
                } ${
                  (hasVoted && selectedSide !== 1) || voting || voteStatusLoading
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:shadow-md'
                } `}
              >
                <span
                  className={`rounded-m mb-2 inline-flex h-7 w-12 items-center justify-center ${
                    selectedSide === 1 ? 'bg-black text-white' : 'bg-yellow text-black'
                  } text-caption3`}
                >
                  1번
                </span>
                <span className="text-caption2 font-medium">
                  {voteStatusLoading ? '불러오는 중...' : '1번 의견에 투표'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleVote(2)}
                disabled={(hasVoted && selectedSide !== 2) || voting || voteStatusLoading}
                className={`group flex h-24 flex-col justify-center rounded-l border transition-all ${
                  selectedSide === 2
                    ? 'border-green1 bg-green1 text-white'
                    : 'border-gray1 text-gray3 bg-white shadow-sm active:scale-[0.98]'
                } ${
                  (hasVoted && selectedSide !== 2) || voting || voteStatusLoading
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:shadow-md'
                } `}
              >
                <span
                  className={`rounded-m mb-2 inline-flex h-7 w-12 items-center justify-center ${
                    selectedSide === 2 ? 'text-green1 bg-white' : 'bg-green1 text-white'
                  } text-caption3`}
                >
                  2번
                </span>
                <span className="text-caption2 font-medium">
                  {voteStatusLoading ? '불러오는 중...' : '2번 의견에 투표'}
                </span>
              </button>
            </div>

            {selectedSide && (
              <p className="text-caption3 text-green1 mt-3 text-center">
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
