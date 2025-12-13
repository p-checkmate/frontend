import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
} from 'axios';

function buildApiBase() {
  const base = import.meta.env.VITE_API_URL as string | undefined;
  if (!base) throw new Error('Missing VITE_API_URL');

  // 마지막 슬래시 제거
  return base.replace(/\/+$/, '');
}

const API_BASE = buildApiBase();

// =======================
// 공통 인스턴스
// =======================
const api = axios.create({
  baseURL: API_BASE,
  timeout: 7000,
});

const refreshClient = axios.create({
  baseURL: API_BASE,
  timeout: 7000,
});

// =======================
// auth 경로 여부 체크 (401 처리용)
// =======================
function isAuthRequest(url?: string) {
  if (!url) return false;
  try {
    const u = url.startsWith('http') ? new URL(url) : new URL(url, API_BASE);
    const p = u.pathname;
    return p.includes('/auth/');
  } catch {
    return url.includes('/auth/');
  }
}

// =======================
// 토큰을 *붙이지 말아야 하는* auth 요청
// (로그인 / 회원가입 / 토큰 재발급 등)
// =======================
function shouldSkipAuthHeader(url?: string) {
  if (!url) return false;

  try {
    const u = url.startsWith('http') ? new URL(url) : new URL(url, API_BASE);
    const p = u.pathname;

    return p.includes('/auth/login') || p.includes('/auth/register') || p.includes('/auth/refresh');
  } catch {
    return (
      url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/refresh')
    );
  }
}

// =======================
// 요청 인터셉터
// =======================
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // headers 안전하게 다루기
    const headers = (config.headers ?? {}) as any;

    headers['Content-Type'] ??= 'application/json';

    const token = localStorage.getItem('accessToken');

    // 로그인/회원가입/리프레시가 아닌 이상은 Authorization 헤더를 붙인다.
    if (token && !shouldSkipAuthHeader(config.url)) {
      headers.Authorization = `Bearer ${token}`;
    }

    config.headers = headers;
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// =======================
// 응답 인터셉터
// =======================
api.interceptors.response.use(
  (response) => {
    const body = (response as any).data;

    // 백엔드 응답이 status 기반일 때
    if (body?.status === 'success') {
      // 보통 { status: 'success', data: {...} } 형태 → data만 리턴
      return body.data;
    }

    if (body?.status === 'error') {
      return Promise.reject({
        message: body.error?.message ?? '서버 오류가 발생했습니다.',
        code: (response as any).status,
        error: body.error,
      });
    }

    // 그 외에는 body 그대로
    return body;
  },

  // 에러 처리 (토큰 만료 & 공통 에러)
  async (error: AxiosError<any>) => {
    const status = error.response?.status;
    const body = error.response?.data;
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401: accessToken 만료 → refresh 시도
    if (status === 401) {
      // 이미 한 번 재시도했다면 더 이상 리프레시 안 함
      if (originalRequest && originalRequest._retry) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/onboardingLandingPage';
        return Promise.reject(error);
      }

      // /auth/* 요청 자체에서 401이 난 경우 (ex. 로그인 실패, 잘못된 리프레시 토큰 등)
      if (isAuthRequest(originalRequest?.url)) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/onboardingLandingPage';
        return Promise.reject(error);
      }

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        // 리프레시 토큰도 없으면 그냥 로그인 필요
        localStorage.removeItem('accessToken');
        window.location.href = '/onboardingLandingPage';
        return Promise.reject(error);
      }

      try {
        originalRequest._retry = true;

        const refreshResponse = await refreshClient.post('/auth/refresh', {
          refreshToken,
        });

        const refreshBody = refreshResponse.data;

        const newAccessToken = refreshBody?.data?.accessToken ?? refreshBody?.accessToken;
        const newRefreshToken = refreshBody?.data?.refreshToken ?? refreshBody?.refreshToken;

        if (!newAccessToken) {
          throw new Error('토큰 재발급에 실패했습니다.');
        }

        // 새 토큰 저장
        localStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        // 원래 요청 헤더에 새 accessToken 적용
        if (originalRequest.headers) {
          (originalRequest.headers as any).Authorization = `Bearer ${newAccessToken}`;
        } else {
          originalRequest.headers = {
            Authorization: `Bearer ${newAccessToken}`,
          };
        }

        // 원래 요청 다시 보내기
        return api.request(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/onboardingLandingPage';
        return Promise.reject(refreshError);
      }
    }

    // 그 외 공통 에러 포맷
    return Promise.reject({
      message:
        body?.error?.message || body?.message || '네트워크 오류 또는 서버 에러가 발생했습니다.',
      code: status ?? 'UNKNOWN',
      error: body?.error ?? null,
    });
  },
);

export default api;
