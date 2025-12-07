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

    // 혹시 모를 예외적 응답
    return body;
  },

  async (error) => {
    const status = error.response?.status;
    const body = error.response?.data;

    // refresh 처리
    if (status === 401) {
      // 원래 있던 로직 그대로 두면 됨
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
