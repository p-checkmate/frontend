import api from '@/api/api';

export type MainBookThumb = {
    itemId: number;
    thumbnailUrl: string;
};

type RecommendedBooksData = {
    recommendations: MainBookThumb[];
};

type PopularBooksData = {
    books: MainBookThumb[];
};

// AI 추천 도서
export async function fetchRecommendedBooks(): Promise<MainBookThumb[]> {
    try {
        const data = (await api.get('/users/me/recommended-books')) as RecommendedBooksData;
        return data?.recommendations ?? [];
  } catch(e) {
    console.error("fetchRecommendedBooks API 실패", e);
    return [];
  }
}

// 인기 도서
export async function fetchPopularBooks(): Promise<MainBookThumb[]> {
    try {
        const data = (await api.get('/books')) as PopularBooksData;
        return data?.books ?? [];
  } catch(e) {
    console.error("fetchPopularBooks API 실패", e);
    return [];
  }
}