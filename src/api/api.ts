import axios from 'axios';
import type { ApiError, ApiResponse } from '@/types/ApiResponse';

function buildApiBase() {
  const base = import.meta.env.VITE_API_URL as string | undefined;
  if (!base) throw new Error('Missing VITE_API_URL');

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

// =======================
// 재발급 전용 인스턴스
// =======================
const refreshClient = axios.create({
  baseURL: API_BASE,
  timeout: 7000,
});

// =======================
// auth 경로 여부 체크
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
// 요청 인터셉터
// =======================
api.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};
    (config.headers as any)['Content-Type'] ??= 'application/json';

    const token = localStorage.getItem('accessToken');
    if (token && !isAuthRequest(config.url)) {
      (config.headers as any).Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// =======================
// 응답 인터셉터
// =======================
let refreshPromise: Promise<string | null> | null = null;

api.interceptors.response.use(
  (response) => {
    const res = response.data as ApiResponse<any> | undefined;
    if (res && typeof res.success === 'boolean') {
      if (!res.success) {
        const apiError: ApiError = {
          message: res.message || '알 수 없는 오류가 발생했습니다.',
          code: res.code,
          error: Array.isArray(res.error) ? res.error : null,
        };
        return Promise.reject(apiError);
      }

      return res.data;
    }

    return response.data;
  },
  async (error) => {
    const status = error.response?.status;
    const original: any = error.config;

    // =======================
    // 401 → refresh → 재시도
    // =======================
    if (status === 401 && original && !original._retry && !isAuthRequest(original?.url)) {
      original._retry = true;

      const rt = localStorage.getItem('refreshToken');
      if (!rt) {
        const resData = error.response?.data as ApiResponse<any> | undefined;
        const apiError: ApiError = {
          message: resData?.message || '인증이 필요합니다.',
          code: resData?.code || 401,
          error: Array.isArray(resData?.error) ? resData?.error : null,
        };
        window.location.href = '/login';
        return Promise.reject(apiError);
      }

      if (!refreshPromise) {
        refreshPromise = refreshClient
          .post('/auth/refresh', { refreshToken: rt })
          .then(({ data }: any) => {
            const accessToken = data?.accessToken ?? data?.data?.accessToken ?? null;
            const refreshToken = data?.refreshToken ?? data?.data?.refreshToken ?? rt;

            if (accessToken) {
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', refreshToken);
              return accessToken as string;
            }

            return null;
          })
          .catch(() => null)
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccess = await refreshPromise;
      if (!newAccess) {
        const resData = error.response?.data as ApiResponse<any> | undefined;
        const apiError: ApiError = {
          message: resData?.message || '인증 갱신 실패',
          code: resData?.code || 401,
          error: Array.isArray(resData?.error) ? resData?.error : null,
        };

        window.location.href = '/login';
        return Promise.reject(apiError);
      }

      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${newAccess}`;
      return api(original);
    }

    // =======================
    // 그 외 에러
    // =======================
    const resData = error.response?.data as any;
    
    const message =
      resData?.message ||
      resData?.error?.message || 
      "네트워크 오류 또는 서버 에러가 발생했습니다.";

    const apiError: ApiError = {
      message,
      code: resData?.code || status || "UNKNOWN",
      error: Array.isArray(resData?.error) ? resData.error : null,
    };

    return Promise.reject(apiError);
      },
);

export default api;
