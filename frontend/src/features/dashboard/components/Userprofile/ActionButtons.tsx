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
    <div className="grid gap-2">
      <button
        onClick={onCopy}
        className="flex h-10 w-full items-center justify-center gap-2 bg-[#275d49] px-3 text-xs font-semibold text-white transition hover:bg-[#1d4435] active:translate-y-px"
      >
        <Copy size={15} />
        <span>Copy anonymous link</span>
      </button>

      <button
        onClick={onCreateWithTopic}
        className="flex h-10 w-full items-center justify-center gap-2 border border-[#275d49] px-3 text-xs font-semibold text-[#275d49] transition hover:bg-[#e8eee8] active:translate-y-px"
      >
        <Plus size={15} />
        <span>Create a topic link</span>
      </button>
    </div>
  );
};

export default ActionButtons;
