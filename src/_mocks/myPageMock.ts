export type UserProfile = {
  nickname: string;
  email: string;
  exp: number;
  gradeName: number; // string -> number로 변경
  genres: string[];
};

export type MyBook = {
  id: number;
  coverImageUrl: string;
  title: string;
};

// 유저 프로필 Mock Data
export const userProfileMock: UserProfile = {
  nickname: "가나디",
  email: "example@gmail.com",
  exp: 90, // 새싹 등급
  gradeName: 1, // "새싹" -> 1 (숫자)로 변경
  genres: ["추리/스릴러", "판타지/SF", "로맨스/멜로"],
};

// 나의 책장 Mock Data
export const myBookshelfMock: MyBook[] = Array.from({ length: 15 }).map((_, i) => {
  // 상세페이지 Mock 데이터 활용: 이곳에 있는 ID가 1, 2번뿐이므로 1, 2를 반복해서 할당해봄
  const targetId = (i % 2) + 1; 
  
  return {
    id: targetId,
    title: `책 제목 ${i + 1}`,
    // 3번째 책마다 이미지를 비워서(빈 문자열) 
    // 이미지 컴포넌트에서 받아오는 url이 없으면 회색 박스 테스트
    coverImageUrl: i % 3 === 0 ? "" : `https://picsum.photos/seed/mybook-${i}/200/300`,
  };
});