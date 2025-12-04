import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Image } from '@/components';
import GradeGuideModal from '@/components/common/modal/GradeGuideModal';
import { userProfileMock, myBookshelfMock } from '@/_mocks/myPageMock'; //mock 데이터 테스트

import {
  Character1, Character2, Character3, Character4, Character5,
  RightArrowIcon, InfoIcon,
} from '@/assets';

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);

  // 1. Mock Data
  const user = userProfileMock;
  const myBooks = myBookshelfMock; // 나의 책장의 도서 이미지 클릭 시 상세페이지 이동 위함

  // 2. 등급 계산
  const getRankInfo = (exp: number) => {
    if (exp < 100) return { char: Character1, min: 0, max: 100, nextRank: '나무' };
    if (exp < 200) return { char: Character2, min: 100, max: 200, nextRank: '종이' };
    if (exp < 500) return { char: Character3, min: 200, max: 500, nextRank: '수첩' };
    if (exp < 1000) return { char: Character4, min: 500, max: 1000, nextRank: '책' };
    return { char: Character5, min: 1000, max: 2000, nextRank: '만렙' };
  };

  const rankInfo = useMemo(() => getRankInfo(user.exp), [user.exp]);
  const CharacterIcon = rankInfo.char;
  
  const progressPercent = Math.min(
    100,
    Math.max(0, ((user.exp - rankInfo.min) / (rankInfo.max - rankInfo.min)) * 100)
  );

  // 책 클릭 핸들러 (상세페이지 이동 - id 기반 라우팅)
  const handleBookClick = (bookId: number) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <>
      <div className="bg-beige1 min-h-screen w-full relative overflow-x-hidden">
        {/* 1. 헤더 */}
        <Header
          variant="logoSetting"
          className="fixed top-0 z-50 w-full max-w-[430px]"
          onSettingClick={() => navigate('/mypage/setting')} //추후 경로 수정
        />
        <div className="h-14" />

        {/* 2. 초록색 프로필 카드 */}
        <section className="relative w-full bg-green2 px-6 pt-6 pb-8 text-white">
          <div className="flex items-center gap-4">
            <div className="relative flex h-[92px] w-[92px] items-center justify-center rounded-full bg-[#FFE99C]">
               <CharacterIcon className="h-[96px] w-[96px] object-contain" />
            </div>
            <div className="flex flex-col gap-4 -mt-7">
              <h2 className="text-caption1 text-white">{user.nickname}</h2> {/*닉네임*/}
              <div className="flex items-center gap-2">
                 <span className="text-body1 text-white">{user.gradeName}</span> {/*등급이름*/}
              </div>
            </div>
          </div>

          <div className="mt-6">
            {/*진행바*/}
             <div className="h-[6px] w-full bg-[#D9D9D9] overflow-hidden">
               <div 
                 className="h-full bg-[#D6B027] transition-all duration-500 ease-out"
                 style={{ width: `${progressPercent}%` }}
               />
             </div>
             {/*경험치 및 등급 정보 모달*/}
             <div className="flex items-center gap-1 mt-2">
               <span className="text-body1 text-white">Exp {user.exp}</span>
               <button 
                  type="button" 
                  aria-label="등급 정보" 
                  className="flex items-center justify-center"
                  onClick={() => setIsGradeModalOpen(true)}
               >
                 <InfoIcon className="w-[17px] h-[17px] text-white/80 cursor-pointer hover:text-white" />
               </button>
             </div>
          </div>

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
               <span className="text-body1 text-white truncate">{user.genres.join(', ')}</span>
            </div>
          </div>
        </section>

        {/* 3. 나의 책장 영역 */}
        <section className="mt-6 px-6 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-title4 text-black">나의 책장</h3>
            <button 
              type="button" 
              className="text-body4 text-black cursor-pointer"
              onClick={() => navigate('/mypage/mybook')} // 나의 책장으로 이동
            >
              전체 보기
            </button>
          </div>

          {/* 책 가로 스크롤 리스트 */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hidden relative">
            {myBooks.map((book) => (
               <div 
                 key={book.id} 
                 className="flex-shrink-0 w-[68px] h-[91px] relative cursor-pointer active:scale-95 transition-transform"
                 onClick={() => handleBookClick(book.id)}
               >
                 <Image 
                   src={book.coverImageUrl} 
                   alt={book.title} 
                   className="w-full h-full object-cover"
                   rounded="rounded-none"
                 />
               </div>
            ))}
            <div className="flex-shrink-0 w-4" /> 
          </div>

          <div 
            className="pointer-events-none absolute top-[44px] right-0 h-[91px] w-12"
            style={{ background: "linear-gradient(to left, var(--color-beige1), transparent)" }}
          />
        </section>

        {/* 4. 메뉴 링크 영역 */}
        <section className="mt-4 px-6 flex flex-col gap-6 mb-20">
          <button 
            type="button"
            className="flex items-center gap-1 w-fit py-1 cursor-pointer"
            onClick={() => navigate('/my-content')} //추후 경로 수정
          >
             <h3 className="text-title4 text-black">내가 작성한 콘텐츠</h3>
             <RightArrowIcon className="w-8 h-8 text-black" />
          </button>

          <button 
            type="button"
            className="flex items-center gap-1 w-fit cursor-pointer"
            onClick={() => navigate('/my-liked-content')} //추후 경로 수정
          >
             <h3 className="text-title4 text-black">내가 좋아요 한 콘텐츠</h3>
             <RightArrowIcon className="w-8 h-8 text-black" />
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