import { useEffect, useState } from 'react';
import Toast from '@/components/common/toast/Toast';
import type { ToastVariant } from '@/components/common/toast/Toast';

interface ToastState {
  variant: ToastVariant;
  message: string;
  visible: boolean;
}

const ToastTest = () => {
  const [toast, setToast] = useState<ToastState | null>(null);

  // visible이 true일 때만 2초 뒤 자동으로 숨김
  useEffect(() => {
    if (!toast?.visible) return;

    const timer = setTimeout(() => {
      setToast((prev) => (prev ? { ...prev, visible: false } : prev));
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast?.visible]);

  const showLikeToast = () => {
    setToast({
      variant: 'like',
      visible: true,
      message: '해당 컨텐츠에 좋아요를 남겼어요.',
    });
  };

  const showBookmarkToast = () => {
    setToast({
      variant: 'bookmark',
      visible: true,
      message: '나의 책장에 해당 책이 저장되었어요.',
    });
  };

  // 알림/경고 토스트 (아이콘 없는 토스트 추가)
  const showAlertToast = () => {
    setToast({
      variant: 'alert',
      visible: true,
      message: '선호하는 장르를 먼저 선택해주세요!',
    });
  };

  return (
    <div className="min-h-screen bg-beige1 px-4 py-8 space-y-6">
      <h1>Toast 테스트</h1>

      <section className="space-y-3">
        <p>
          1. 좋아요 토스트 (하트 아이콘)
        </p>
        <button
          type="button"
          onClick={showLikeToast}
          className="cursor-pointer rounded-m bg-green1 px-4 py-2 text-body4 text-white"
        >
          좋아요 토스트 보여주기
        </button>
      </section>

      <section className="space-y-3">
        <p>
          2. 북마크 토스트 (북마크 아이콘)
        </p>
        <button
          type="button"
          onClick={showBookmarkToast}
          className="cursor-pointer rounded-m bg-green1 px-4 py-2 text-body4 text-white"
        >
          북마크 토스트 보여주기
        </button>
      </section>

      {/* 3. 아이콘 없는 토스트 테스트 */}
      <section className="space-y-3">
        <p>
          3. 알림 토스트 (아이콘 없음)
        </p>
        <button
          type="button"
          onClick={showAlertToast}
          className="cursor-pointer rounded-m bg-yellow text-black px-4 py-2 text-body4"
        >
          알림 토스트 보여주기
        </button>
      </section>

      {toast && (
        <Toast
          variant={toast.variant}
          visible={toast.visible}
          message={toast.message}
        />
      )}
    </div>
  );
};

export default ToastTest;
