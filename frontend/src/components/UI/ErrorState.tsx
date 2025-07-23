import { RefreshCcw } from "lucide-react";
import { UI_CONSTANTS } from "../../constants/ui.constants";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({
  message = "An error occured",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-red-500">
      <img
        src="/error-404.png"
        alt="Error"
        className="w-36 h-36 mb-4 opacity-80"
      />
      <h2 className="text-lg font-semibold mb-2">{message}</h2>
      {onRetry && (
         <button
            onClick={onRetry}
            className={`p-2 hover:bg-gray-100 rounded-full ${UI_CONSTANTS.ANIMATION.TRANSITION}`}
         >
            <RefreshCcw size={UI_CONSTANTS.ICON_SIZES.LARGE} />
         </button>
      )}
    </div>
  );
};

export default ErrorState;
