import { Pencil, X, Plus, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type CreateTopicProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateTopicModal= ({ isOpen, onClose }: CreateTopicProps) => {
  if (!isOpen) return null;
  const [loading, setLoading] = useState(false);

  const createNewTopic = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
      console.log('new topic created');
    }, 3000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md p-6 mt-2 sm:p-10 shadow-md rounded-xl bg-white z-50"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-2 sm:mb-4">
              <h1 className="text-2xl sm:text-3xl">New topic</h1>
              <button
                onClick={onClose}
                className="grid place-items-center w-10 h-10 sm:w-12 sm:h-12 cursor-pointer rounded-xl hover:bg-gray-300 transition duration-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col mb-4">
                <label
                  htmlFor="topic"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Topic
                </label>
                <div className="relative">
                  <Pencil
                    size={18}
                    className="absolute top-3 left-3 text-gray-500"
                  />
                  <input
                    type="text"
                    id="topic"
                    placeholder="Create a new topic"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <label
                  htmlFor="color"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Color
                </label>
                <div className="relative">
                  {/* <Palette
                  size={18}
                  className="absolute top-3 left-3 text-gray-500"
                /> */}
                  <input
                    type="color"
                    id="color"
                    />
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Add image
                </label>
                <div className="relative w-1/2 h-22 sm:h-28 border-dashed border-2 border-gray-400 bg-gray-100 rounded-lg flex items-center justify-center">
                  <label
                    htmlFor="imageUpload"
                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Plus size={30} className="text-gray-500" />
                    <p className="text-sm sm:text-base text-gray-500 mt-2">
                      Click to upload
                    </p>
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <button 
               disabled={loading}
               onClick={createNewTopic}
               className={`flex justify-center items-center w-full text-white font-semibold px-4 py-2 mt-4 rounded-md shadow-lg ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'} hover:scale-[1.01] active:scale-[0.98] transition duration-200`}
               >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  'Create topic'
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CreateTopicModal;
