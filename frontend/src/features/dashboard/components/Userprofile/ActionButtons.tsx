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
    <div className="app-action-buttons">
      <button
        onClick={onCopy}
        className=""
      >
        <Copy size={15} />
        <span>Copy anonymous link</span>
      </button>

      <button
        onClick={onCreateWithTopic}
        className=""
      >
        <Plus size={15} />
        <span>Create a topic link</span>
      </button>
    </div>
  );
};

export default ActionButtons;
