import { create } from 'zustand';

interface OnboardingState {
  selectedBookIds: number[]; // 선택된 책 ID들
  toggleBookSelect: (id: number) => void; // 책 선택/해제 함수

  // 닉네임 관련
  nickname: string;
  setNickname: (name: string) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  selectedBookIds: [], // 처음엔 빈 배열

  toggleBookSelect: (bookId) =>
    set((state) => {
      const isSelected = state.selectedBookIds.includes(bookId);
      const MAX_SELECTION = 5;

      // 책 선택 1. 이미 선택된 거면 뺀다 (filter)
      if (isSelected) {
        return {
          selectedBookIds: state.selectedBookIds.filter((id) => id !== bookId),
        };
      }

      // 책 선택 2. 5개 꽉 찼으면 더 이상 추가 안 함
      if (state.selectedBookIds.length >= MAX_SELECTION) {
        return state; // 변화 없음
      }

      // 책 선택 3. 새로 추가
      return {
        selectedBookIds: [...state.selectedBookIds, bookId],
      };
    }),

    // 닉네임: 초기값 및 함수
    nickname: "", 
    setNickname: (name) => set({ nickname: name }),
}));