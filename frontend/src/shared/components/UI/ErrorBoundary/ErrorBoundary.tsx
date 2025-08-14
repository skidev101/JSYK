import { RefreshCcw } from "lucide-react";
import { UI_CONSTANTS } from "../../../constants/ui.constants";

interface ErrorStateProps {
  src?: string;
  message: string;
  onRetry?: () => void;
}

const ErrorState = ({
  src,
  message,
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] p-4 ">
      <img
        src={src}
        alt="Error"
        className="w-36 h-36 mb-4"
      />
      <h2 className="text-lg mb-2">{message}</h2>
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
