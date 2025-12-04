import React from 'react';
import { BaseModal, Button } from '@/components';
import { RANK_DATA } from '@/constants/grade'; // 상수 import
import {
  Character1, Character2, Character3, Character4, Character5,
} from '@/assets';

interface GradeGuideModalProps {
  open: boolean;
  onClose: () => void;
}

const GradeGuideModal: React.FC<GradeGuideModalProps> = ({ open, onClose }) => {
  // 캐릭터 매핑 (RANK_DATA 순서와 일치시킴: 책 -> 수첩 -> 종이 -> 나무 -> 새싹)
  const CHAR_MAP: Record<number, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = {
    5: Character5,
    4: Character4,
    3: Character3,
    2: Character2,
    1: Character1,
  };

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
        <div className="mb-4 text-left">
          <h2 className="text-caption2 text-black mb-1">등급 안내</h2>
          <div className="text-body4 text-gray2 break-keep">
            <p>등급에 따라 캐릭터가 성장해요!</p>
            <p>경험치를 모아 새로운 캐릭터를 얻어보세요!</p>
          </div>
        </div>

        <div className="flex items-end justify-center gap-[10px] w-full mt-2 mb-2">
          {/* RANK_DATA 상수를 사용하여 맵핑 */}
          {RANK_DATA.map((rank) => {
            const CharComponent = CHAR_MAP[rank.id];
            
            return (
              <div key={rank.id} className="flex flex-col items-center relative">
                
                {/* Exp 텍스트 */}
                <div className="text-center mb-1 flex flex-col items-center">
                  <span className="text-[10px] text-[#D6B027] leading-3">Exp</span>
                  <span className="text-[10px] text-[#D6B027] leading-3 font-medium">
                    {rank.exp}
                  </span>
                </div>

                {/* 회색 막대 */}
                <div className={`w-[43px] bg-[#D9D9D9] rounded-t-sm ${rank.height} relative`}>
                  {/* 캐릭터 이미지 */}
                  <div 
                    className={`absolute left-1/2 -translate-x-1/2 w-[72px] h-[72px] flex items-end justify-center z-10 ${
                      rank.label === '책' ? 'bottom-1' : 'bottom-0'
                    }`}
                  >
                     <CharComponent className="w-full h-full object-contain drop-shadow-sm" />
                  </div>
                </div>

                {/* 등급 이름 */}
                <span className="mt-2 text-body4 text-black">{rank.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </BaseModal>
  );
};

export default GradeGuideModal;