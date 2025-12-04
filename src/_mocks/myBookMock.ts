export interface MyBookItem {
  id: number;
  title: string;
  author: string; // 저자 정보 추가
  coverImageUrl: string;
  tags: string[]; // 태그 추가
}

// 20개 정도의 더미 데이터 생성 (나의 책장 스크롤 테스트용)
export const initialMyBooks: MyBookItem[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1, // ID는 1부터 시작 (상세페이지 ID 1, 2와 매칭하려면 i%2 + 1 로직 필요 시 적용)
  title: `책 제목 ${i + 1}`,
  author: `저자 ${i + 1}`,
  coverImageUrl: i % 3 === 0 ? "" : `https://picsum.photos/seed/book-${i}/200/300`,
  tags: ["태그1", "태그2"],
}));