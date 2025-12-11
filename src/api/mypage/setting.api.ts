import api from '../api';

// 설정 화면에서 쓸 프로필 정보 타입
export interface SettingProfile {
  nickname: string;
  email: string;
}

/**
 * 마이페이지 프로필 조회
 * GET /users/mypage
 * (리턴 전체 중에서 nickname, email만 추려서 사용)
 */
export const fetchSettingProfile = async (): Promise<SettingProfile> => {
  const data = (await api.get('/users/mypage')) as {
    user: {
      nickname: string;
      email: string;
    };
    my_bookshelf?: unknown;
  };

  return {
    nickname: data.user.nickname,
    email: data.user.email,
  };
};

/**
 * 로그아웃
 * POST /auth/logout
 * body: { refreshToken }
 * 실패하더라도 토큰은 정리해 주고, 호출 쪽에서 라우팅 처리
 */
export const logout = async (): Promise<void> => {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    if (refreshToken) {
      await api.post('/auth/logout', { refreshToken });
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } catch (err) {
    console.error('로그아웃 API 실패:', err);
    throw err;
  } 
};

/**
 * 회원 탈퇴
 * DELETE /auth/me
 * 성공/실패 여부는 호출하는 쪽에서 핸들링
 */
export const deleteAccount = async (): Promise<void> => {
  try {
    await api.delete('/auth/me');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (err) {
      console.error('회원 탈퇴 API 실패:', err);
      throw err;
  }
};