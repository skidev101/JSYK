import { Pencil, X, Plus, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";

interface CreateTopicProps {
  isOpen: boolean;
  onClose: () => void;
};

const CreateTopicModal = ({ isOpen, onClose }: CreateTopicProps) => {
  if (!isOpen) return null;

  const [newTopic, setNewTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [themeColor, setThemeColor] = useState("#c7e90a")
  const [topicImgFiles, setTopicImgFiles] = useState<File[]>([]);
  const [topicImgPreviews, setTopicImgPreviews] = useState<string[]>([]);

  const topicImageRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxFileSize = 2 * 1024 * 1024;
    if (file.size > maxFileSize) {
      toast.error("Image size exceeds 2MB limit.");
      return;
    }

    setTopicImgFiles((prev) => [...prev, file]);
    setTopicImgPreviews((prev) => [...prev, URL.createObjectURL(file)]);
  };

  const removeImage = (index: number) => {
    const updatedFiles = [...topicImgFiles];
    const updatedPreviews = [...topicImgPreviews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setTopicImgFiles(updatedFiles);
    setTopicImgPreviews(updatedPreviews);
  }

  const handleNewTopic = () => {
    setLoading(true);

    // const formData = new FormData();
    // if (topicImgFiles) formData.append("topicImg", topicImgFiles));

    setTimeout(() => {
      setLoading(false);
      toast.success("New topic created successfully!");
      setNewTopic("");
      console.log("new topic created");
    }, 3000);
  };

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
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                   
                    placeholder="Create a new topic"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <label
                  
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Pick a color
                </label>
                <div className="relative">
                  {/* <Palette
                  size={18}
                  className="absolute top-3 left-3 text-gray-500"
                /> */}
                  <input 
                   type="color" 
                   value={themeColor} 
                   onChange={(e) => setThemeColor(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col mb-4">
                <div className="flex justify-between items-center text-sm font-medium mb-1 text-gray-700 py-2">
                  <p>Add image</p>
                  <p>2mb max</p>
                </div>
                
                <div className="flex gap-2 sm:gap-4 mb-4">
                  {topicImgPreviews.map((src, index) => (
                    <div
                      key={index}
                      className="relative w-1/2 h-22 sm:h-24 border border-gray-300 rounded-lg overflow-hidden"
                    >
                      <img
                        src={src}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md cursor-pointer hover:bg-gray-500 hover:text-white transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                  {topicImgPreviews.length < 2 && (
                    <>
                      <button
                        onClick={() => topicImageRef.current?.click()}
                        className="w-1/2 h-24 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:border-gray-600"
                      >
                        <Plus size={20} />
                        <span className="text-xs mt-1">Add image</span>
                      </button>
                      <input
                        type="file"
                        ref={topicImageRef}
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </>
                  )}
                </div>
              </div>

              <button
                disabled={loading}
                onClick={handleNewTopic}
                className={`flex justify-center items-center w-full text-white font-semibold px-4 py-2 mt-4 rounded-md shadow-lg ${
                  loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                } hover:scale-[1.01] active:scale-[0.98] transition duration-200`}
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  "Create topic"
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
