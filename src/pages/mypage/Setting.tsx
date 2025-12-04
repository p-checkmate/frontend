import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, BaseModal, Button } from '@/components';
import { RightArrowIcon } from '@/assets';
import { userProfileMock } from '@/_mocks/myPageMock'; // Mock 데이터 가져오기

const Setting: React.FC = () => {
  const navigate = useNavigate();
  
  // 모달 상태 관리
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 1. 라이선스 페이지 이동
  const handleLicenseClick = () => {
    navigate('/mypage/setting/license'); //추후 경로 수정
  };

  // 2. 로그아웃 처리
  const handleLogoutConfirm = () => {
    // TODO: 실제 로그아웃 로직 (토큰 삭제 등)
    console.log('로그아웃 처리됨');
    setLogoutModalOpen(false);
    navigate('/onboardingLandingPage');
  };

  // 3. 회원 탈퇴 처리
  const handleDeleteConfirm = () => {
    // TODO: 실제 회원탈퇴 API 호출
    console.log('회원탈퇴 처리됨');
    setDeleteModalOpen(false);
    navigate('/onboardingLandingPage');
  };

  return (
    <div className="bg-beige1 min-h-screen w-full relative">
      {/* 1. 헤더 */}
      <Header
        variant="backTitle"
        title="설정"
        onBackClick={() => navigate(-1)}
        className="sticky top-0 z-30 bg-beige1"
      />

      <main className="w-full">
        {/* 2. 유저 정보 영역 (Mock Data 연결) */}
        <section className="px-[37px] py-6 flex flex-col gap-1">
          <h2 className="text-caption1 text-black">
            {userProfileMock.nickname}
          </h2>
          <p className="text-body4 text-gray3 font-normal">
            {userProfileMock.email}
          </p>
        </section>

        {/* 구분선 */}
        <div className="h-[10px] w-full bg-gray1" />

        {/* 3. 앱 정보 영역 */}
        <section className="px-[37px] py-2">
          {/* 라이선스 */}
          <button
            type="button"
            onClick={handleLicenseClick}
            className="flex w-full items-center justify-between py-4 cursor-pointer"
          >
            <span className="text-caption3 text-black">라이선스</span>
            <RightArrowIcon className="w-[26px] h-[26px] text-black" />
          </button>

          {/* 버전 정보 */}
          <div className="flex w-full items-center justify-between py-4">
            <span className="text-caption3 text-black">버전 정보</span>
            <span className="text-caption3 text-black font-medium">1.0.0</span>
          </div>
        </section>

        {/* 구분선 */}
        <div className="h-[10px] w-full bg-gray1" />

        {/* 4. 계정 관리 영역 */}
        <section className="px-[37px] py-2">
          {/* 로그아웃 버튼 -> 모달 열기 */}
          <button
            type="button"
            onClick={() => setLogoutModalOpen(true)}
            className="flex w-full items-center py-4 cursor-pointer"
          >
            <span className="text-caption3 text-black">로그아웃</span>
          </button>

          {/* 회원 탈퇴 버튼 -> 모달 열기 */}
          <button
            type="button"
            onClick={() => setDeleteModalOpen(true)}
            className="flex w-full items-center py-4 cursor-pointer"
          >
            <span className="text-caption3 text-black">회원 탈퇴</span>
          </button>
        </section>
      </main>

      {/* ========================= */}
      {/* 모달 영역         */}
      {/* ========================= */}

      {/* 1. 로그아웃 모달 */}
      <BaseModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        title="로그아웃"
        footer={
          <div className="flex justify-center gap-3 w-full">
             <Button 
               variant="outline" 
               color="gray" 
               size="md" 
               className="flex-1"
               onClick={() => setLogoutModalOpen(false)}
             >
               취소
             </Button>
             <Button 
               variant="solid" 
               color="green" 
               size="md" 
               className="flex-1"
               onClick={handleLogoutConfirm}
             >
               확인
             </Button>
          </div>
        }
      >
        <div className="-mt-1 pb-2">
          <p className="text-body4 text-center text-gray3">
            로그아웃 하시겠습니까?
          </p>
        </div>
      </BaseModal>

      {/* 2. 회원 탈퇴 모달 */}
      <BaseModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="회원 탈퇴"
        footer={
          <div className="flex justify-center gap-3 w-full">
             <Button 
               variant="outline" 
               color="gray" 
               size="md" 
               className="flex-1"
               onClick={() => setDeleteModalOpen(false)}
             >
               취소
             </Button>
             <Button 
               variant="solid" 
               color="green" 
               size="md" 
               className="flex-1"
               onClick={handleDeleteConfirm}
             >
               탈퇴
             </Button>
          </div>
        }
      >
        <div className="text-center -mt-1 pb-2 space-y-1">
          <p className="text-body4 text-gray3">
            정말 탈퇴하시겠습니까?
          </p>
          <p className="text-caption5 text-pink">
            이 작업은 되돌릴 수 없습니다.
          </p>
        </div>
      </BaseModal>

    </div>
  );
};

export default Setting;