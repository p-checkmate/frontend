import { useState } from 'react';
import MyReadCard from '@/components/common/cards/MyReadCard'; // 경로가 'common/cards' 였던 것으로 기억합니다. 확인 필요!

const MyReadCardTest = () => {
  // [가상 DB 데이터]
  const [dbData, setDbData] = useState({
    totalPage: 368, // 전체 도서의 페이지 수
    readPage: 0, // 처음에 저장되어 있는 값
    memo: ''
  });

  const handleUpdateTest = (newReadPage: number, newMemo: string) => {
    console.log(`[API 전송] 페이지: ${newReadPage}, 메모: ${newMemo}`);

    // 백엔드 업데이트 성공 시뮬레이션
    setDbData(prev => ({
      ...prev,
      readPage: newReadPage,
      memo: newMemo
    }));
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-beige1 p-4">
      <h1>MyReadCard 최종 테스트</h1>
      
      <div>
        <p>
          입력 후 업데이트를 눌러보세요.<br/>
          입력창은 지워지지만, 상단 숫자는 업데이트된 값으로 유지되어야 합니다.
        </p>

        {/* initialReadPage에 dbData.readPage를 넣어주는 것이 핵심 */}
        <MyReadCard 
          totalPage={dbData.totalPage} 
          initialReadPage={dbData.readPage}
          initialMemo={dbData.memo}
          onUpdate={handleUpdateTest} 
        />
        
        {/* 현재 DB 상태 확인용 */}
        <div className="mt-8 w-80 rounded-m bg-white p-4 shadow-sm">
           <h3 className="mb-2 border-b border-gray1 pb-2 text-caption1 font-bold">💾 백엔드 데이터 상태</h3>
           <div className="mb-1 flex justify-between text-body5">
             <span className="text-gray3">읽은 페이지:</span>
             <span className="font-bold text-green1">{dbData.readPage}p</span>
           </div>
           <div className="flex justify-between text-body5">
             <span className="text-gray3">최근 메모:</span>
             <span className="font-bold text-green1">{dbData.memo || '(없음)'}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MyReadCardTest;