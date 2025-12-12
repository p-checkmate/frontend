import { create } from 'zustand';
import type { TopGenre } from '@/constants/genre';

interface OnboardingState {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;

  // 닉네임 관련
  nickname: string;
  setNickname: (name: string) => void;

  // 책 선택
  selectedBookIds: number[];
  toggleBookSelect: (id: number) => void;

  // 상위 장르 선택
  selectedTopGenre: TopGenre | null;
  setTopGenre: (genre: TopGenre | null) => void;

  // 하위 장르 선택
  selectedSubGenres: string[];
  toggleSubGenre: (genre: string) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  email: '',
  password: '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  // 닉네임
  nickname: '',
  setNickname: (name) => set({ nickname: name }),

  // 책 선택
  selectedBookIds: [],
  toggleBookSelect: (bookId) =>
    set((state) => {
      const isSelected = state.selectedBookIds.includes(bookId);
      const MAX_SELECTION = 5;

      if (isSelected) {
        return {
          selectedBookIds: state.selectedBookIds.filter((id) => id !== bookId),
        };
      }

      if (state.selectedBookIds.length >= MAX_SELECTION) {
        return state;
      }

      return {
        selectedBookIds: [...state.selectedBookIds, bookId],
      };
    }),

  // 상위 장르
  selectedTopGenre: null,
  setTopGenre: (genre) =>
    set({
      selectedTopGenre: genre,
      // 상위 장르 바꾸면 하위 선택 초기화
      selectedSubGenres: [],
    }),

  // 하위 장르
  selectedSubGenres: [],
  toggleSubGenre: (genre) =>
    set((state) => {
      const isSelected = state.selectedSubGenres.includes(genre);
      const MAX_SUB_GENRE = 3;

      if (isSelected) {
        return {
          selectedSubGenres: state.selectedSubGenres.filter(
            (g) => g !== genre,
          ),
        };
      }

      if (state.selectedSubGenres.length >= MAX_SUB_GENRE) {
        return state;
      }

      return {
        selectedSubGenres: [...state.selectedSubGenres, genre],
      };
    }),
}));
