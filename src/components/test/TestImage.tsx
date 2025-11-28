import { useState } from 'react';
import Image from '../common/image/Image';

export default function TestImagePage() {
  const [showMany, setShowMany] = useState(false);

  return (
    <div className="p-4 space-y-10">

      {/* 1. 정상 이미지 로딩 테스트 */}
      <section>
        <h2 className="text-xl font-bold mb-2">정상 이미지 로딩</h2>
        <Image
          src="https://picsum.photos/600/400"
          alt="정상 이미지"
          aspectRatio="aspect-[3/2]"
          rounded="rounded-lg"
          className="w-60 h-40"
        />
      </section>

      {/* 2. 이미지 에러 테스트 */}
      <section>
        <h2 className="text-xl font-bold mb-2">이미지 로딩 실패</h2>
        <Image
          src="https://this-url-does-not-exist-asdf.com/image.png"
          alt="에러 이미지"
          aspectRatio="aspect-[3/2]"
          className="w-60 h-40"
        />
      </section>

      {/* 3. IntersectionObserver (스크롤해서 inView 되는 순간 로딩) */}
      <section>
        <h2 className="text-xl font-bold mb-2">스크롤 로딩 테스트</h2>
        <button
          onClick={() => setShowMany(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          아래 이미지들 보기
        </button>

        <div className="h-[600px] bg-gray-100 mt-4 flex items-center justify-center text-gray-500">
          아래로 스크롤 ↓
        </div>

        {showMany &&
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="mb-10">
              <Image
                src={`https://picsum.photos/seed/${i}/600/400`}
                alt={`Lazy 이미지 ${i}`}
                aspectRatio="aspect-[3/2]"
                className="w-full max-w-sm mx-auto"
              />
            </div>
          ))}
      </section>

    </div>
  );
}
