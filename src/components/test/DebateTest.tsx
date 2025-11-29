// ex) DebateDetailPage.tsx
import OpinionWriteBar from "../common/input/DebateInput";

const DebateDetailPage = () => {
  return (
    <div className="bg-beige1 min-h-screen pb-[60px]">
      {/* 위쪽 토론 내용들... */}

      <div className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2">
        <OpinionWriteBar type="vs" />
      </div>
    </div>
  );
};

export default DebateDetailPage;
