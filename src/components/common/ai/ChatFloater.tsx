import { AIIcon } from "@/assets";
import { cn } from "@/utils/cn";

type ChatFloaterProps = {
  onClick: () => void;
};

const ChatFloater: React.FC<ChatFloaterProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "sticky bottom-6 ml-auto mr-5 z-50",
        "flex h-14 w-14 items-center justify-center rounded-full",
        "bg-green1 shadow-lg shadow-black/15",
        "transition-transform hover:scale-105 active:scale-95"
      )}
      style={{ float: "right" }}
    >
      <span className="flex h-6 w-6 items-center justify-center">
        <AIIcon className="text-white"/>
      </span>
    </button>
  );
};

export default ChatFloater;
