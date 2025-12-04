import React from 'react';
import { BaseModal, Button } from '@/components';
import {
  Character1, // 새싹 캐릭터
  Character2, // 나무 캐릭터
  Character3, // 종이 캐릭터
  Character4, // 수첩 캐릭터
  Character5, // 책 캐릭터
} from '@/assets';

interface GradeGuideModalProps {
  open: boolean;
  onClose: () => void;
}

const GradeGuideModal: React.FC<GradeGuideModalProps> = ({ open, onClose }) => {
  // 등급 데이터 (왼쪽 높은 등급 -> 오른쪽 낮은 등급)
  const ranks = [
    {
      label: '책',
      exp: 2000,
      char: Character5,
      height: 'h-[165px]',
      color: '#D6B027', 
    },
    {
      label: '수첩',
      exp: 1000,
      char: Character4,
      height: 'h-[142px]',
    },
    {
      label: '종이',
      exp: 500,
      char: Character3,
      height: 'h-[117px]',
    },
    {
      label: '나무',
      exp: 200,
      char: Character2,
      height: 'h-[92px]',
    },
    {
      label: '새싹',
      exp: 100,
      char: Character1,
      height: 'h-[65px]',
    },
  ];

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      className="w-[313px] rounded-l bg-beige2 px-5 py-6" 
      footer={
        <div className="flex justify-end pt-4">
          <Button
            variant="solid"
            color="green"
            size="sm"
            onClick={onClose}
            className="w-[96px] h-[38px] rounded-m text-caption5 font-medium" 
          >
            확인
          </Button>
        </div>
      }
    >
      <div className="flex flex-col">
        {/* 텍스트 영역: 간격 축소 (mb-8 -> mb-4) */}
        <div className="mb-4 text-left">
          <h2 className="text-caption2 text-black mb-1">등급 안내</h2>
          <div className="text-body4 text-gray2 break-keep">
            <p>등급에 따라 캐릭터가 성장해요!</p>
            <p>경험치를 모아 등급을 올려 새로운 캐릭터를 얻어보세요!</p>
          </div>
        </div>

        {/* 그래프 영역: 상단 여백 축소 (mt-4 -> mt-2) */}
        <div className="flex items-end justify-center gap-[10px] w-full mt-2 mb-2">
          {ranks.map((rank) => (
            <div key={rank.label} className="flex flex-col items-center relative">
              
              {/* Exp 텍스트 */}
              <div className="text-center mb-1 flex flex-col items-center">
                <span className="text-[13px] text-[#D6B027]">Exp</span>
                <span className="text-[13px] text-[#D6B027] leading-3 font-medium">
                  {rank.exp}
                </span>
              </div>

              {/* 회색 막대 (Rectangle) */}
              <div className={`w-[43px] bg-[#D9D9D9] rounded-t-sm ${rank.height} relative`}>
                
                {/* 캐릭터 이미지 */}
                {/* [수정] '책' 등급일 때만 bottom-1(위로 살짝 올림), 나머지는 bottom-0 */}
                <div 
                  className={`absolute left-1/2 -translate-x-1/2 w-[72px] h-[72px] flex items-end justify-center z-10 ${
                    rank.label === '책' ? 'bottom-1' : 'bottom-0'
                  }`}
                >
                   <rank.char className="w-full h-full object-contain drop-shadow-sm" />
                </div>
              </div>

              {/* 등급 이름 */}
              <span className="mt-2 text-body4 text-black">{rank.label}</span>
            </div>
          ))}
        </div>
      </div>
    </BaseModal>
  );
};

export default GradeGuideModal;