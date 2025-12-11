import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header, Image, HorizontalBookScrollSection } from '@/components';
import GradeGuideModal from '@/components/common/modal/GradeGuideModal';

import { fetchMyPage, type MyPageResponse } from '@/api/mypage/mypage.api';
import {
  fetchMyBookBookmarks,
  type MyBookResponse,
} from '@/api/mypage/mybook.api';

import {
  Character1,
  Character2,
  Character3,
  Character4,
  Character5,
  RightArrowIcon,
  InfoIcon,
} from '@/assets';

import { RANK_NAMES } from '@/constants/grade';

// 마이페이지에서 사용할 책 프리뷰 타입
type UI_BookPreview = {
  itemId: number;
  title: string;
  thumbnailUrl: string;
};

const MyPage: React.FC = () => {
  const navigate = useNavigate();

  // ===== API State =====
  const [data, setData] = useState<MyPageResponse | null>(null);
  const [books, setBooks] = useState<UI_BookPreview[]>([]); // 나의 책장: 전체 북마크
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);

  // ===== API 호출 (마이페이지 + 나의 책장 전체 북마크) =====
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // 마이페이지 정보 + 북마크 전체를 동시에 가져오기
        const [mypageRes, myBookRes]: [MyPageResponse, MyBookResponse] =
          await Promise.all([fetchMyPage(), fetchMyBookBookmarks()]);

        setData(mypageRes);

        const mappedBooks: UI_BookPreview[] = myBookRes.bookmarks.map((b) => ({
          itemId: b.item_id,
          title: b.title,
          thumbnailUrl: b.thumbnail_url,
        }));

        setBooks(mappedBooks);
      } catch (e) {
        console.error('마이페이지 로딩 실패:', e);
        setError('마이페이지 정보를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const user = data?.user ?? null;

  // ===== 등급 계산 함수 =====
  const getRankInfo = (level: number) => {
    switch (level) {
      case 1:
        return { char: Character1, min: 0, max: 100, nextRank: '나무' };
      case 2:
        return { char: Character2, min: 0, max: 200, nextRank: '종이' };
      case 3:
        return { char: Character3, min: 0, max: 500, nextRank: '수첩' };
      case 4:
        return { char: Character4, min: 0, max: 1000, nextRank: '책' };
      case 5:
        return { char: Character5, min: 0, max: 2000, nextRank: '만렙' };
      default:
        return { char: Character1, min: 0, max: 100, nextRank: '새싹' };
    }
  };

  const rankInfo = useMemo(() => {
    if (!user) return null;
    return getRankInfo(user.level);
  }, [user]);

  const progressPercent = useMemo(() => {
    if (!user || !rankInfo) return 0;

    const ratio = user.exp / rankInfo.max;
    return Math.min(100, Math.max(0, ratio * 100));
  }, [user, rankInfo]);

  // ===== 책 클릭 핸들러 (상세페이지로 이동) =====
  const handleBookClick = (itemId: number) => {
    navigate(`/book/${itemId}`);
  };

  // ------------------------------------------------------------
  // 로딩 / 에러 / Guard
  // ------------------------------------------------------------

  if (loading) {
    return (
      <div className="bg-beige1 min-h-screen flex items-center justify-center">
        <p className="text-body1 text-gray3">불러오는 중...</p>
      </div>
    );
  }

  if (error || !data || !user || !rankInfo) {
    return (
      <div className="bg-beige1 min-h-screen flex items-center justify-center">
        <p className="text-body1 text-red-like">
          {error ?? '데이터를 불러올 수 없습니다.'}
        </p>
      </div>
    );
  }

  const CharacterIcon = rankInfo.char;

  // ------------------------------------------------------------
  // 정상 UI
  // ------------------------------------------------------------

  return (
    <>
      <div className="bg-beige1 min-h-screen w-full relative overflow-x-hidden">
        {/* ===== 헤더 ===== */}
        <Header
          variant="logoSetting"
          className="fixed left-0 right-0 top-0 z-50"
          onSettingClick={() => navigate('/mypage/setting')}
        />
        <div className="h-14" />

        {/* ===== 초록색 프로필 카드 ===== */}
        <section className="relative w-full bg-green2 px-6 pt-6 pb-8 text-white">
          {/* 프로필 + 등급 아이콘 */}
          <div className="flex items-center gap-4">
            <div className="relative flex h-[92px] w-[92px] items-center justify-center rounded-full bg-[#FFE99C]">
              <CharacterIcon className="h-[96px] w-[96px]" />
            </div>

            <div className="flex flex-col gap-4 -mt-7">
              <h2 className="text-caption1">{user.nickname}</h2>
              <span className="text-body1">{RANK_NAMES[user.level]}</span>
            </div>
          </div>

          {/* 경험치 바 */}
          <div className="mt-6">
            <div className="h-[6px] w-full bg-[#D9D9D9] overflow-hidden">
              <div
                className="h-full bg-[#D6B027] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center gap-1 mt-2">
              <span className="text-body1">Exp {user.exp}</span>
              <button
                type="button"
                className="flex items-center justify-center"
                onClick={() => setIsGradeModalOpen(true)}
              >
                <InfoIcon className="w-[17px] h-[17px] text-white/80 cursor-pointer hover:text-white" />
              </button>
            </div>
          </div>

          {/* 이메일 / 선호 장르 */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <div className="w-[84px] h-[28px] bg-yellow rounded-[4px] flex items-center justify-center text-black text-body1 mr-4">
                이메일
              </div>
              <span className="text-body1 text-white">{user.email}</span>
            </div>

            <div className="flex items-center">
              <div className="w-[84px] h-[28px] bg-yellow rounded-[4px] flex items-center justify-center text-black text-body1 mr-4">
                선호 장르
              </div>
              <span className="text-body1 text-white truncate">
                {user.preferred_genres.join(', ')}
              </span>
            </div>
          </div>
        </section>

        {/* ===== 나의 책장 (HorizontalBookScrollSection + 전체 북마크) ===== */}
        <section className="mt-6">
          {/* 상단 타이틀 + 전체보기 버튼 */}
          <div className="flex items-center justify-between px-6">
            <h3 className="text-title4">나의 책장</h3>
            <button
              type="button"
              className="text-body4 cursor-pointer"
              onClick={() => navigate('/mypage/mybook')}
            >
              전체 보기
            </button>
          </div>

          {books.length === 0 ? (
            <div className="px-6 pb-4">
              <p className="text-body2 text-gray3">저장된 책이 없어요.</p>
            </div>
          ) : (
            <HorizontalBookScrollSection
              title="" // 타이틀은 위에서 이미 표시했으니까 비워둠
              className="px-6 pt-0"
            >
              {books.map((book) => (
                <div
                  key={book.itemId}
                  className="h-[91px] w-[68px] flex-shrink-0"
                  onClick={() => handleBookClick(book.itemId)}
                >
                  <Image
                    src={book.thumbnailUrl}
                    alt={book.title}
                    className="h-full w-full object-cover cursor-pointer"
                    rounded="rounded-none"
                  />
                </div>
              ))}
            </HorizontalBookScrollSection>
          )}
        </section>

        {/* ===== 메뉴 링크 ===== */}
        <section className="mt-4 px-6 flex flex-col gap-6 mb-20">
          <button
            type="button"
            className="flex items-center gap-1 w-fit cursor-pointer"
            onClick={() => navigate('/mypage/mywrite')}
          >
            <h3 className="text-title4">내가 작성한 콘텐츠</h3>
            <RightArrowIcon className="w-8 h-8" />
          </button>

          <button
            type="button"
            className="flex items-center gap-1 w-fit cursor-pointer"
            onClick={() => navigate('/mypage/myliked')}
          >
            <h3 className="text-title4">내가 좋아요 한 콘텐츠</h3>
            <RightArrowIcon className="w-8 h-8" />
          </button>
        </section>
      </div>

      <GradeGuideModal
        open={isGradeModalOpen}
        onClose={() => setIsGradeModalOpen(false)}
      />
    </>
  );
};

export default MyPage;
