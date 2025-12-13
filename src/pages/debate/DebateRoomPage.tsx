import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FreeDebateRoomPage from './FreeDebateRoom';
import VSDebateRoomPage from './VSDebateRoom';

import { fetchDiscussionDetail } from '@/api/detail/discussion.api';
import type { Discussion } from '@/api/detail/discussion.api';
import VSDebateResultPage from '@/components/debate/ResultPage';

const DAY_MS = 24 * 60 * 60 * 1000;
const DEBATE_DURATION_DAYS = 7;

const DebateRoomPage: React.FC = () => {
  const { debateRoomId } = useParams();
  const discussionId = Number(debateRoomId);

  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!discussionId) {
      setError('잘못된 토론방 ID입니다.');
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);

        const data = await fetchDiscussionDetail(discussionId);

        setDiscussion(data);
        setError(null);
      } catch (e: any) {
        console.error('토론 상세 불러오기 실패:', e);
        setError(e?.message ?? '토론방 정보를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [discussionId]);

  if (loading) return <div>토론 정보를 불러오는 중입니다…</div>;

  if (error || !discussion) {
    return <div>{error ?? '토론방을 찾을 수 없습니다.'}</div>;
  }

  //테스트용
  discussion.created_at = new Date(Date.now() - 10 * DAY_MS).toISOString();

  const isVSClosed =
    discussion.discussion_type === 'VS' && discussion.created_at
      ? new Date(discussion.created_at).getTime() + DEBATE_DURATION_DAYS * DAY_MS <= Date.now()
      : false;

  if (discussion.discussion_type === 'FREE') {
    return <FreeDebateRoomPage discussion={discussion} />;
  }

  if (discussion.discussion_type === 'VS') {
    if (isVSClosed) {
      return <VSDebateResultPage discussion={discussion} />;
    }
    return <VSDebateRoomPage discussion={discussion} />;
  }

  return <div>지원하지 않는 토론방 유형입니다.</div>;
};

export default DebateRoomPage;
