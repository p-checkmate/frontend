import Button from '@/components/common/button/Button';
import { useState } from 'react';

const genres = ['판타지', '로맨스', '자연 과학', 'SF', '어쩌고 저쩌고', '이런거'];

const ButtonTest = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  return (
    <div className="space-y-10 bg-beige1 p-4">
      {/* 1. 로그인 / 회원가입 */}
      <section>
        <h1 className="mb-4 text-title3">1. 로그인 / 회원가입 버튼</h1>

        <div className="space-y-3">
          <Button variant="solid" color="green" size="lg" fullWidth>
            로그인
          </Button>

          <Button variant="solid" color="yellow" size="lg" fullWidth>
            회원 가입
          </Button>
        </div>
      </section>

      {/* 2. 토론 타입 */}
      <section>
        <h1 className="mb-4 text-title3">2. 토론 타입 버튼</h1>

        <div className="flex gap-3">
          <Button variant="solid" color="green" size="md">
            자유토론
          </Button>
          <Button variant="outline" color="green" size="md">
            VS 토론
          </Button>
        </div>
      </section>

      {/* 3. 다음 버튼 */}
      <section>
        <h1 className="mb-4 text-title3">3. 다음 버튼</h1>

        <div className="space-y-3">
          <Button variant="solid" color="yellow" size="lg" fullWidth>
            다음
          </Button>

          <Button
            variant="solid"
            color="gray"
            size="lg"
            fullWidth
            disabled
          >
            다음
          </Button>
        </div>
      </section>

      {/* 4. 태그 다중 선택 */}
      <section>
        <h1 className="mb-4 text-title3">4. 장르 태그 (다중 선택)</h1>

        <div className="flex flex-wrap gap-2">
          {genres.map((g) => (
            <Button
              key={g}
              variant="tag"
              size="sm"
              selected={selectedGenres.includes(g)}
              onClick={() => toggleGenre(g)}
            >
              {g}
            </Button>
          ))}
        </div>

        <p className="mt-3 text-body4 text-gray3">
          선택된 장르:{' '}
          <span className="text-body3 text-green1">
            {selectedGenres.length > 0
              ? selectedGenres.join(', ')
              : '없음'}
          </span>
        </p>
      </section>
    </div>
  );
};

export default ButtonTest;
