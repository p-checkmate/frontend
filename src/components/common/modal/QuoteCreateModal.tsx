import { useState, useEffect } from 'react';
import { BaseModal, Button, Textarea } from '@/components';

interface QuoteCreateModalProps {
  open: boolean;
  onClose: () => void;
  defaultValue?: string;
  onSubmit?: (quote: string) => void;
}

const QuoteCreateModal = ({
  open,
  onClose,
  defaultValue = '',
  onSubmit,
}: QuoteCreateModalProps) => {
  const [quote, setQuote] = useState(defaultValue);

  useEffect(() => {
    if (open) {
      setQuote(defaultValue);
    }
  }, [open, defaultValue]);

  const handleClose = () => {
    setQuote('');
    onClose();
  };

  const handleSubmit = () => {
    if (!quote.trim()) {
      // TODO: 토스트 혹은 에러 처리
      return;
    }

    if (onSubmit) {
      onSubmit(quote);
    } else {
      console.log('인용구 게시', quote);
    }

    handleClose();
  };

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      title="인용구 입력"
      footer={
        <div className="flex justify-center gap-13 px-3">
          <Button className="flex-1" variant="solid" color="green" onClick={handleSubmit}>
            게시하기
          </Button>
          <Button className="flex-1" variant="outline" color="gray" onClick={handleClose}>
            취소하기
          </Button>
        </div>
      }
    >
      <div className="space-y-3">
        <Textarea
          variant="primary"
          placeholder="인상 깊었던 책의 한 문장을 공유해주세요."
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          rows={10}
          fullWidth
        />
      </div>
    </BaseModal>
  );
};

export default QuoteCreateModal;
