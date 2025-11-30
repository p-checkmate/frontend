import { useState } from "react";
import { Button, Input, Textarea, BaseModal } from "@/components";

const ModalTest = () => {
  const [openType, setOpenType] = useState(false);
  const [openFree, setOpenFree] = useState(false);
  const [openVs, setOpenVs] = useState(false);
  const [openQuote, setOpenQuote] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [freeTitle, setFreeTitle] = useState("");
  const [freeDetail, setFreeDetail] = useState("");
  const [vsTitle, setVsTitle] = useState("");
  const [vsSide1, setVsSide1] = useState("");
  const [vsSide2, setVsSide2] = useState("");
  const [quote, setQuote] = useState("");

  return (
    <div className="bg-beige1 min-h-screen p-6">
      <h1 className="mb-6 text-title4 font-semibold">모달 테스트</h1>

      <div className="flex flex-col gap-3">
        <Button color="green" onClick={() => setOpenType(true)}>
          1. 토론 유형 선택 모달
        </Button>
        <Button color="green" onClick={() => setOpenFree(true)}>
          2. 자유토론 생성 모달
        </Button>
        <Button color="green" onClick={() => setOpenVs(true)}>
          3. VS 토론 생성 모달
        </Button>
        <Button color="green" onClick={() => setOpenQuote(true)}>
          4. 인용구 입력 모달
        </Button>
        <Button color="green" onClick={() => setOpenDelete(true)}>
          5. 삭제 확인 모달
        </Button>
      </div>

      {/* 1. 토론 유형 선택 모달 */}
      <BaseModal
        open={openType}
        onClose={() => setOpenType(false)}
        title="생성할 토론의 유형을 선택하세요"
        footer={
          <div className="flex justify-center gap-10">
            <Button
              variant="solid"
              color="green"
              onClick={() => {
                setOpenType(false);
                setOpenFree(true);
              }}
            >
              자유토론
            </Button>
            <Button
              variant="outline"
              color="green"
              onClick={() => {
                setOpenType(false);
                setOpenVs(true);
              }}
            >
              VS 토론
            </Button>
          </div>
        }
      >
        <p className="text-center text-body4 text-gray3">
          VS 토론은 진영을 설정해 생성할 수 있어요
        </p>
      </BaseModal>

      {/* 2. 자유토론 생성 모달 */}
      <BaseModal
        open={openFree}
        onClose={() => setOpenFree(false)}
        title="자유토론 생성"
        footer={
          <div className="flex w-full gap-10">
            <Button
              className="flex-1"
              variant="solid"
              color="green"
              onClick={() => {
                console.log("자유토론 생성", { freeTitle, freeDetail });
                setOpenFree(false);
              }}
            >
              게시하기
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              color="gray"
              onClick={() => setOpenFree(false)}
            >
              취소하기
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-caption3">
              제목<span className="text-pink">*</span>
            </p>
            <Input
              variant="primary"
              placeholder="생성할 토론의 제목을 입력하세요"
              value={freeTitle}
              onChange={(e) => setFreeTitle(e.target.value)}
              fullWidth
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
            />
          </div>
        </div>
      </BaseModal>

      {/* 3. VS 토론 생성 모달 */}
      <BaseModal
        open={openVs}
        onClose={() => setOpenVs(false)}
        title="VS 토론 생성"
        footer={
          <div className="flex w-full gap-10">
            <Button
              className="flex-1"
              variant="solid"
              color="green"
              onClick={() => {
                console.log("VS 토론 생성", { vsTitle, vsSide1, vsSide2 });
                setOpenVs(false);
              }}
            >
              게시하기
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              color="gray"
              onClick={() => setOpenVs(false)}
            >
              취소하기
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-caption3">
              제목<span className="text-pink">*</span>
            </p>
            <Input
              variant="primary"
              placeholder="생성할 토론의 제목을 입력하세요"
              value={vsTitle}
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
              className="mb-2"
            />
            <Input
              variant="primary"
              placeholder="2번 진영의 대표 의견을 적어주세요"
              value={vsSide2}
              onChange={(e) => setVsSide2(e.target.value)}
              fullWidth
            />
          </div>
        </div>
      </BaseModal>

      {/* 4. 인용구 입력 모달*/}
      <BaseModal
        open={openQuote}
        onClose={() => setOpenQuote(false)}
        title="인용구 입력"
        footer={
          <div className="flex w-full gap-2">
            <Button
              className="flex-1"
              variant="solid"
              color="green"
              onClick={() => {
                console.log("인용구 게시", quote);
                setOpenQuote(false);
              }}
            >
              게시하기
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              color="gray"
              onClick={() => setOpenQuote(false)}
            >
              취소하기
            </Button>
          </div>
        }
      >
        <Textarea
          variant="primary"
          placeholder="인상 깊었던 책의 한 문장을 공유해주세요."
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          rows={8}
          fullWidth
        />
      </BaseModal>

      {/* 5. 삭제 확인 모달 – 하단 꽉 채우는 1:1 버튼 */}
      <BaseModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        title="정말 삭제하시겠습니까?"
        footer={
          <div className="flex w-full gap-2">
            <Button
              className="flex-1"
              variant="solid"
              color="green"
              onClick={() => {
                console.log("삭제 확인");
                setOpenDelete(false);
              }}
            >
              예
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              color="gray"
              onClick={() => setOpenDelete(false)}
            >
              아니요
            </Button>
          </div>
        }
      >
        <p className="text-center text-body4 text-gray3">
          한 번 삭제한 콘텐츠는 다시 복원할 수 없어요!
        </p>
      </BaseModal>
    </div>
  );
};

export default ModalTest;
