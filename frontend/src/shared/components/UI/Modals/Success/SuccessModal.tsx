import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
// import { useState } from "react";

interface SuccessProps {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  message: string;
}

const SuccessModal = ({
  isOpen,
  onClose,
  header,
}: SuccessProps) => {
//   const [loading, setLoading] = useState(false);

//   const handleAction = () => {
//     setLoading(true);
//   };

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
            <div className="p-6 sm:p-6 w-[90%] max-w-sm bg-white shadow-md rounded-xl">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold sm:text-2xl">{header}</h1>
                <button
                  onClick={onClose}
                  className="grid place-items-center w-8 h-8 sm:w-10 sm:h-10 rounded-md hover:bg-gray-200 cursor-pointer active:scale-[0.97] transition duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              

              <div className="flex justify-center gap-2 mt-2">
                <p className="text-sm">Share to</p>
                
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
