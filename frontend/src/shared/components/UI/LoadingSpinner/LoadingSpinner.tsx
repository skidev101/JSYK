import { Loader2 } from "lucide-react";
import { UI_CONSTANTS } from "../../../constants/ui.constants";

interface LoaderProps {
   size?: number;
   className?: string;
}

const SpinningLoader = ({ size = UI_CONSTANTS.ICON_SIZES.XL, className = '' }: LoaderProps) => {
   <div className={`flex justify-center items-center ${className}`}>
      <Loader2 size={size} className="text-black animate-spin" />
   </div>
}

export default SpinningLoader