import { useState } from 'react';
import Search from '@/components/common/search/Search';

const SearchTest = () => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = () => {
    alert(`검색 요청: ${keyword || '(비어 있음)'}`);
  };

  return (
    <div className="min-h-screen bg-beige1 px-4 py-6">
      <p>검색창 컴포넌트 테스트</p>

      <Search
        value={keyword}
        onChange={setKeyword}
        placeholder="찾고 싶은 책이 있나요?"
        onSubmit={handleSubmit}
      />

      <br></br>
      <p>
        현재 검색어:{' '}
        <span>
          {keyword || '없음'}
        </span>
      </p>
    </div>
  );
};

export default SearchTest;
