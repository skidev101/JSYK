import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../../../context/AuthContext";

interface LogoutProps {
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean;
  warning: string;
  header: string;
  btnAction: string;
  friendlyText?: string;
  handleAction?: () => void;
}

const ActionModal = ({
  isOpen,
  onClose,
  loading,
  warning,
  header,
  btnAction,
  friendlyText,
  handleAction
}: LogoutProps) => {
  // const { logout } = useAuth();

  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  // const [friendlyText, setFriendlyText] = useState("");

  // const handleAction = () => {
  //   if (action === "Logout") {
  //     setLoading(true);
  //     setFriendlyText("See U later 😘");
  //     setTimeout(() => {
  //       logout();
  //       setLoading(false);
  //       navigate("/login");
  //     }, 3000);
  //   } else if (action === "Delete") {
  //     setLoading(true);
  //     setTimeout(() => {
  //       setLoading(false);
  //       navigate("/login");
  //     }, 3000);
  //   }
  // };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 backdrop-blur-sm z-[998] bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6 sm:p-6 w-[90%] max-w-md bg-white shadow-md rounded-xl">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold sm:text-2xl">{header}</h1>
                <button
                  onClick={onClose}
                  className="grid place-items-center w-8 h-8 sm:w-10 sm:h-10 rounded-md hover:bg-gray-200 cursor-pointer active:scale-[0.97] transition duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="text-sm sm:text-base py-2">{warning}</p>

              {friendlyText && btnAction === "Logout" && (
                <p className="text-sm sm:text-base py-2">{friendlyText}</p>
              )}

              <div className="flex justify-end items-center gap-3 mt-4">
                <button
                  onClick={onClose}
                  className="p-2 sm:p-3 rounded-md cursor-pointer bg-gray-200 hover:bg-gray-300 active:scale-[0.98] transition duration-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  onClick={() => handleAction?.()}
                  className={`flex justify-center items-center p-2 sm:p-3 text-white rounded-md cursor-pointer ${
                    loading ? "bg-red-500" : "bg-red-600"
                  } hover:bg-red-500 active:scale-[0.97] transition duration-200`}
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    btnAction
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ActionModal;
