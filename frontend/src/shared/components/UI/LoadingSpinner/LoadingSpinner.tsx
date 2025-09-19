import { Loader2 } from "lucide-react";
import { UI_CONSTANTS } from "../../../constants/UIConstants";

interface LoaderProps {
  size?: number;
  className?: string;
}

const LoadingSpinner = ({
  size = UI_CONSTANTS.ICON_SIZES.XL,
  className = "",
}: LoaderProps) => {
  <div className={`flex justify-center items-center ${className}`}>
    <Loader2 size={size} className="text-black animate-spin" />
  </div>;
};

export default LoadingSpinner;
