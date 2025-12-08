import axios from 'axios';

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

api.interceptors.response.use(
  (response) => {
    const body = response.data;

    // 백엔드 응답이 status 기반일 때
    if (body?.status === 'success') {
      return body.data;
    }

    if (body?.status === 'error') {
      return Promise.reject({
        message: body.error?.message ?? '서버 오류가 발생했습니다.',
        code: response.status,
        error: body.error,
      });
    }

    return body;
  },

  async (error) => {
    const status = error.response?.status;
    const body = error.response?.data;

    // 401: accessToken 만료 → refresh 시도
    if (status === 401) {
      const originalRequest = error.config;

      // 이미 한 번 재시도했다면 더 이상 리프레시 안 함
      if (originalRequest && (originalRequest as any)._retry) {
        // 토큰 정리 후 로그인 페이지로 이동
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isAuthRequest(originalRequest?.url)) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        // 리프레시 토큰도 없으면 그냥 로그인 필요
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        (originalRequest as any)._retry = true;

        const refreshResponse = await refreshClient.post(
          "/auth/refresh", 
          { refreshToken },
        );

        const refreshBody = refreshResponse.data;

        const newAccessToken =
          refreshBody?.data?.accessToken ?? refreshBody?.accessToken;
        const newRefreshToken =
          refreshBody?.data?.refreshToken ?? refreshBody?.refreshToken;

        if (!newAccessToken) {
          throw new Error("토큰 재발급에 실패했습니다.");
        }

        localStorage.setItem("accessToken", newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        if (originalRequest?.headers) {
          (originalRequest.headers as any).Authorization = `Bearer ${newAccessToken}`;
        } else if (originalRequest) {
          originalRequest.headers = {
            Authorization: `Bearer ${newAccessToken}`,
          };
        }

        return api.request(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject({
      message:
        body?.error?.message ||
        body?.message ||
        "네트워크 오류 또는 서버 에러가 발생했습니다.",
      code: status ?? "UNKNOWN",
      error: body?.error ?? null,
    });
  },
);



export default api;
