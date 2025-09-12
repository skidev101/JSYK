import { RefreshCcw } from "lucide-react";
import { UI_CONSTANTS } from "../../../constants/ui.constants";

interface ErrorStateProps {
  src?: string;
  message: string;
  onRetry?: () => void;
}

const ErrorState = ({ src, message, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] p-4 ">
      <img src={src} alt="Error" className="w-36 h-36 mb-2" />
      <h2 className="text-lg mb-2 text-red-500">{message}</h2>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`flex items-center gap-2 px-4 py-2 mt-6 active:scale-[0.95] transition-all bg-blue-500 hover:bg-blue-600 text-white rounded-lg hover:cursor-pointer ${UI_CONSTANTS.ANIMATION.TRANSITION}`}
        >
          Retry
          <RefreshCcw size={UI_CONSTANTS.ICON_SIZES.LARGE} />
        </button>
      )}
    </div>
  );
};

export default ErrorState;
