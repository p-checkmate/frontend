import React, { useState } from 'react';
import Badge from '@/components/common/badge/Badge';

const BadgeTest: React.FC = () => {
    const [selected, setSelected] = useState(false);

    const handleBookClick = () => {
        setSelected((prev) => !prev);
    };

    return (
    <div className="p-6 flex flex-col gap-8 bg-beige1 min-h-screen">
    {/* 1) 태그 뱃지 */}
    <section>
        <h2 className="text-title4 mb-3">1) Tag Badge (#태그)</h2>
        <div className="flex gap-3">
            <Badge variant="tag" label="#태그" />
            <Badge variant="tag" label="#판타지" />
            <Badge variant="tag" label="#로맨스" />
        </div>
    </section>

    {/* 2) 댓글 수 뱃지 */}
    <section>
        <h2 className="text-title4 mb-3">2) Comment Badge (댓글)</h2>
        <div className="flex gap-3">
            <Badge variant="comment" comment={3} />
            <Badge variant="comment" comment={24} />
            <Badge variant="comment" comment={158} />
        </div>
    </section>

    {/* 3) 책 선택 체크 뱃지 */}
    <section>
        <h2 className="text-title4 mb-3">3) Check Badge (책 선택)</h2>

        <div className="flex items-center gap-4">
            {/* 책 카드 */}
            <div
                className="relative w-[88px] h-[125px] cursor-pointer"
                onClick={handleBookClick}
            >
            {/* 회색 책 이미지 (Rectangle 45) */}
            <div className="absolute inset-0 bg-[#D9D9D9]" />

            {/* 오른쪽 상단 체크 표시 */}
            <Badge
                variant="check"
                visible={selected}
                className="absolute top-1.5 right-1.5"
            />
        </div>

        <p className="text-body3">
            회색 책 이미지를 클릭하면 체크 표시
        </p>
        </div>
    </section>
    </div>
    );
};

export default BadgeTest;
