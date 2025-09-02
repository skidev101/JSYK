import { Copy, Plus } from "lucide-react";

interface ActionButtonsProps {
  onCopy: () => void;
  onCreateWithTopic?: () => void;
}

const ActionButtons = ({
  onCopy,
  onCreateWithTopic,
}: ActionButtonsProps) => {
  return (
    <div className="flex items-center flex-col sm:justify-evenly sm:flex-row gap-3 my-2">
      <button
        onClick={onCopy}
        // style={{ backgroundColor: "#8b5cf6" }}
        className="flex items-center justify-center flex-col w-full shadow-md sm:w-50 sm:h-30 p-4 sm:p-4 rounded-lg sm:rounded-2xl hover:scale-[1.01] bg-gradient-to-r from-blue-500 to-purple-400 hover:bg-emerald-300 active:scale-[0.95] active:bg-emerald-600 transition duration-300 cursor-pointer outline-0"
      >
        <p className="text-center font-bold text-white py-3 text-sm sm:text-base">
          Copy anon link
        </p>
        <Copy size={20} className="text-white" />
      </button>

      <button
        onClick={onCreateWithTopic}
        // style={{ backgroundColor: "#f59e0b" }}
        className="flex items-center justify-center flex-col w-full shadow-md sm:w-50 sm:h-30 p-4 rounded-lg sm:rounded-2xl hover:scale-[1.01] bg-gradient-to-br from-pink-500 to-yellow-500 hover:bg-pink-300 active:scale-[0.95] active:bg-pink-600 transition duration-300 cursor-pointer outline-0"
      >
        <p className="text-center font-bold text-white py-3 text-sm sm:text-base">
          Create anon link with topic
        </p>
        <Plus size={20} className="text-white" />
      </button>
    </div>
  );
};

export default ActionButtons;
