import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header, BaseModal, Button } from '@/components';

import {
  fetchSettingProfile,
  logout,
  deleteAccount,
} from '@/api/mypage/setting.api';
import type { SettingProfile } from '@/api/mypage/setting.api';

const Setting: React.FC = () => {
  const navigate = useNavigate();

  // ===== 유저 정보 상태 =====
  const [profile, setProfile] = useState<SettingProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  // ===== 모달 상태 =====
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 버튼 중복 클릭 방지용
  const [processing, setProcessing] = useState(false);

  // ===== 프로필 로드 =====
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoadingProfile(true);
        setProfileError(null);

        const data = await fetchSettingProfile();
        setProfile(data);
      } catch (e) {
        console.error('설정 화면 프로필 로딩 실패:', e);
        setProfileError('계정 정보를 불러오지 못했어요.');
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  // 2. 로그아웃 처리
  const handleLogoutConfirm = async () => {
    if (processing) return;
    try {
      setProcessing(true);
      await logout(); // 토큰 정리 + 서버에 logout 요청
      setLogoutModalOpen(false);
      navigate('/onboardingLandingPage', { replace: true });
    } catch (err) {
      console.error('로그아웃 처리 중 오류:', err);
    } finally {
      setProcessing(false);
    }
  };

  // 3. 회원 탈퇴 처리
  const handleDeleteConfirm = async () => {
    if (processing) return;
    try {
      setProcessing(true);
      await deleteAccount(); // 서버에서 탈퇴 처리
      setDeleteModalOpen(false);
      navigate('/onboardingLandingPage', { replace: true });
    } catch (err) {
      console.error('회원탈퇴 처리 중 오류:', err);
    } finally {
      setProcessing(false);
    }
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
        {/* 2. 유저 정보 영역 */}
        <section className="px-[37px] py-6 flex flex-col gap-1">
          {loadingProfile ? (
            <>
              <div className="h-5 w-32 bg-gray1 rounded-m animate-pulse" />
              <div className="h-4 w-40 bg-gray1 rounded-m animate-pulse" />
            </>
          ) : profileError ? (
            <p className="text-body4 text-pink">{profileError}</p>
          ) : (
            <>
              <h2 className="text-caption1 text-black">
                {profile?.nickname ?? ''}
              </h2>
              <p className="text-body4 text-gray3 font-normal">
                {profile?.email ?? ''}
              </p>
            </>
          )}
        </section>

        {/* 구분선 */}
        <div className="h-[10px] w-full bg-gray1" />

        {/* 3. 앱 정보 영역 */}
        <section className="px-[37px] py-2">

          {/* 버전 정보 */}
          <div className="flex w-full items-center justify-between py-4">
            <span className="text-caption3 text-black">버전 정보</span>
            <span className="text-caption3 text-black font-medium">
              1.0.0
            </span>
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
      {/* 모달 영역 */}
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
              disabled={processing}
            >
              취소
            </Button>
            <Button
              variant="solid"
              color="green"
              size="md"
              className="flex-1"
              onClick={handleLogoutConfirm}
              disabled={processing}
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
              disabled={processing}
            >
              취소
            </Button>
            <Button
              variant="solid"
              color="green"
              size="md"
              className="flex-1"
              onClick={handleDeleteConfirm}
              disabled={processing}
            >
              탈퇴
            </Button>
          </div>
        }
      >
        <div className="text-center -mt-1 pb-2 space-y-1">
          <p className="text-body4 text-gray3">정말 탈퇴하시겠습니까?</p>
          <p className="text-caption5 text-pink">
            이 작업은 되돌릴 수 없습니다.
          </p>
        </div>
      </BaseModal>
    </div>
  );
};

export default Setting;
