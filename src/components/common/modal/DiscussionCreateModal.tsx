import { useState } from 'react';
import { BaseModal, Button, Input, Textarea } from '@/components';

type CreateStep = 'selectType' | 'free' | 'vs';

interface DiscussionCreateModalProps {
  open: boolean;
  onClose: () => void;
}

const DiscussionCreateModal = ({ open, onClose }: DiscussionCreateModalProps) => {
  const [step, setStep] = useState<CreateStep>('selectType');

  const [freeTitle, setFreeTitle] = useState('');
  const [freeDetail, setFreeDetail] = useState('');

  const [vsTitle, setVsTitle] = useState('');
  const [vsSide1, setVsSide1] = useState('');
  const [vsSide2, setVsSide2] = useState('');

  const resetState = () => {
    setStep('selectType');
    setFreeTitle('');
    setFreeDetail('');
    setVsTitle('');
    setVsSide1('');
    setVsSide2('');
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  /* =========================
   * 1단계: 토론 유형 선택 모달
   * ========================= */
  if (step === 'selectType') {
    return (
      <BaseModal
        open={open}
        onClose={handleClose}
        title="생성할 토론의 유형을 선택하세요"
        footer={
          <div className="flex justify-center gap-10">
            <Button variant="solid" color="green" onClick={() => setStep('free')}>
              자유토론
            </Button>
            <Button variant="outline" color="green" onClick={() => setStep('vs')}>
              VS 토론
            </Button>
          </div>
        }
      >
        <p className="text-body4 text-gray3 text-center">
          VS 토론은 진영을 설정해 생성할 수 있어요
        </p>
      </BaseModal>
    );
  }

  /* =========================
   * 2단계: 자유토론 생성 모달
   * ========================= */
  if (step === 'free') {
    return (
      <BaseModal
        open={open}
        onClose={handleClose}
        title="자유토론 생성"
        footer={
          <div className="flex justify-center gap-13 px-1 pt-2">
            <Button
              className="flex-1"
              variant="solid"
              color="green"
              onClick={() => {
                console.log('자유토론 생성', { freeTitle, freeDetail });
                handleClose();
              }}
            >
              게시하기
            </Button>
            <Button className="flex-1" variant="outline" color="gray" onClick={handleClose}>
              취소하기
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-caption3 pt-3">
                제목<span className="text-pink">*</span>
              </p>
              <Input
                variant="primary"
                placeholder="생성할 토론의 제목을 입력하세요"
                value={freeTitle}
                onChange={(e) => setFreeTitle(e.target.value)}
                fullWidth
                className="mt-1"
              />
            </div>

            <div className="space-y-2">
              <p className="text-caption3">상세 설명</p>
              <Textarea
                variant="primary"
                placeholder="생성할 토론의 상세 내용을 입력하세요"
                value={freeDetail}
                onChange={(e) => setFreeDetail(e.target.value)}
                rows={4}
                fullWidth
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </BaseModal>
    );
  }

  /* =========================
   * 3단계: VS 토론 생성 모달
   * ========================= */
  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      title="VS 토론 생성"
      footer={
        <div className="flex justify-center gap-13 px-1 pt-4">
          <Button
            className="flex-1"
            variant="solid"
            color="green"
            onClick={() => {
              console.log('VS 토론 생성', { vsTitle, vsSide1, vsSide2 });
              handleClose();
            }}
          >
            게시하기
          </Button>
          <Button className="flex-1" variant="outline" color="gray" onClick={handleClose}>
            취소하기
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-caption3">
              제목<span className="text-pink">*</span>
            </p>
            <Input
              variant="primary"
              placeholder="생성할 토론의 제목을 입력하세요"
              value={vsTitle}
              className="mt-2"
              onChange={(e) => setVsTitle(e.target.value)}
              fullWidth
            />
          </div>

          <div className="space-y-2">
            <p className="text-caption3">
              의견<span className="text-pink">*</span>
            </p>
            <Input
              variant="primary"
              placeholder="1번 진영의 대표 의견을 적어주세요"
              value={vsSide1}
              onChange={(e) => setVsSide1(e.target.value)}
              fullWidth
              className="mt-2"
            />
            <Input
              variant="primary"
              placeholder="2번 진영의 대표 의견을 적어주세요"
              value={vsSide2}
              className="mt-2"
              onChange={(e) => setVsSide2(e.target.value)}
              fullWidth
            />
          </div>
        </div>
      </div>
    </BaseModal>
  );
};

export default DiscussionCreateModal;
