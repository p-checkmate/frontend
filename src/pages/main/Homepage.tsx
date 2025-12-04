import TogetherReadCard from "@/components/common/cards/TogetherReadCard";

const HomePage = () => {
  const joined = true;

  return (
    <div className="p-4 space-y-6">
      {/* 참여 전 카드 */}
      <TogetherReadCard
        title="책 제목 어쩌고 저쩌고"
        participants={27}
        remainDays={11}
        isJoined={false}
        onClick={() => console.log("참여하기 버튼 클릭")}
      />

      {/* 참여 후 카드 */}
      <TogetherReadCard
        title="책 제목 어쩌고 저쩌고"
        participants={27}
        remainDays={11}
        isJoined={true}
        progress={33}
        rank={2}
        onClick={() => console.log("방으로 이동")}
      />
    </div>
  );
};

export default HomePage;
