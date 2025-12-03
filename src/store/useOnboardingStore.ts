import { create } from 'zustand';

interface OnboardingState {
  selectedBookIds: number[]; // 선택된 책 ID들
  toggleBookSelect: (id: number) => void; // 책 선택/해제 함수

  // 닉네임 관련
  nickname: string;
  setNickname: (name: string) => void;

  // 상위 장르 선택 (하나만 선택 가능하므로 string | null)
  selectedTopGenre: string | null;
  setTopGenre: (genre: string | null) => void;

  // 하위 장르 선택
  selectedSubGenres: string[];
  toggleSubGenre: (genre: string) => void;
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

    // 상위 장르 태그 선택: 초기값 및 함수
  selectedTopGenre: null,
  setTopGenre: (genre) => set({ 
    selectedTopGenre: genre, 
    selectedSubGenres: [] // 상위 장르를 바꿀 때마다 하위 장르를 싹 비운다.
  }),

  // 하위 장르 선택 로직 (최대 3개 제한)
  selectedSubGenres: [],
  toggleSubGenre: (genre) =>
    set((state) => {
      const isSelected = state.selectedSubGenres.includes(genre);
      const MAX_SUB_GENRE = 3; // 최대 선택 개수

      // 1. 이미 선택된 거면? -> 뺀다 (해제)
      if (isSelected) {
        return { selectedSubGenres: state.selectedSubGenres.filter((g) => g !== genre) };
      }

      // 2. 선택 안 된 건데, 이미 3개 꽉 찼으면? -> 무시한다 (추가 안 함)
      if (state.selectedSubGenres.length >= MAX_SUB_GENRE) {
        return state; 
      }

      // 3. 자리 남았으면? -> 추가한다
      return { selectedSubGenres: [...state.selectedSubGenres, genre] };
    }),
}));