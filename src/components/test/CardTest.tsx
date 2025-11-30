import { DiscussionCard } from "@/components";

const DiscussionCardTest = () => {
  return (
    <div className="min-h-screen bg-beige1 p-6 space-y-4">
      {/* 자유 토론 카드 */}
      <DiscussionCard
        type="discussion"
        bookTitle="책 제목"
        title="토론 제목"
        content="토론 상세 내용 어쩌고 저쩌고 이렇게 길게 만들까?? dddddddddddddddddddddddddddddddddddd근데 얼마나 길게 해야 되는지"
        likeCount={24}
        commentCount={24}
        nickname="닉네임"
        dateLabel="25.11.03"
      />

      {/* 인용구 카드 */}
      <DiscussionCard
        type="quote"
        bookTitle="책 제목"
        content="인용구 이렇게 어쩌고 저쩌고 길어지면 두줄까지 허용해야 되는건가??? …"
        tags={["태그", "태그", "태그"]}
        likeCount={242}
        nickname="닉네임"
        dateLabel="25.11.03"
      />
    </div>
  );
};

export default DiscussionCardTest;
