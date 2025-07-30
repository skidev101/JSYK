import { useRef, useState, type ChangeEvent } from "react";
import {
  Pencil,
  X,
  Plus,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FadeDown } from "@/shared/components/Motion/MotionWrappers";
import { useUploadImage } from "../../hooks/useUploadImage";
import toast from "react-hot-toast";
import { useCreateTopic } from "../../hooks/useCreateTopics";


const NewTopic = () => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [topicError, setTopicError] = useState("");
  const [themeColor, setThemeColor] = useState("#3570F8");
  const [topicImgFiles, setTopicImgFiles] = useState<File[]>([]);
  const [topicImgPreviews, setTopicImgPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
  };


  const createTopic = async () => {
    if (!topic.trim()) {
      setTopicError("Topic is required");
      return;
    }
    setLoading(true);
    try {
      if (topicImgFiles.length) {
        const uploadResult = await useUploadImage(topicImgFiles)
        console.log("result from image upload at topicForm:", uploadResult)
      }

      const payload = {
        topic,
        themeColor
      }

      useCreateTopic(payload)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row bg-gray-300 w-full gap-5 rounded-xl mt-20 p-2 pt-4 sm:p-6">
        <div className="">
          <FadeDown>
            <div className="w-full max-w-lg rounded-xl p-4 sm:p-6 md:min-w-sm xl:min-w-md bg-white ">
              <div className="flex justify-between items-center ">
                <h1 className="text-2xl sm:text-3xl">New topic</h1>
                <button
                  onClick={() => navigate("/")}
                  className="grid place-items-center w-10 h-10 sm:w-12 sm:h-12 cursor-pointer rounded-xl hover:bg-gray-300 transition duration-200"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-col mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Topic
                  </label>
                  <div className="relative">
                    <Pencil
                      size={18}
                      className="absolute top-3 left-3 text-gray-500"
                    />
                    <input
                      type="text"
                      required
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Create a new topic"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {topicError && (
                    <p className="text-sm text-red-500">{topicError}</p>
                  )}
                </div>

                <div className="flex flex-col mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Pick a color
                  </label>
                  <div className="relative">
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
                  onClick={createTopic}
                  className={`flex justify-center items-center w-full text-white font-semibold px-4 py-2 mt-4 rounded-md shadow-lg ${
                    loading
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  } hover:scale-[1.01] active:scale-[0.98] transition duration-200`}
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    "Create new topic"
                  )}
                </button>
              </div>
            </div>
          </FadeDown>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-neutral-800 z-50 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside image box
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 z-10 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-200 shadow-md cursor-pointer"
            >
              <X size={20} />
            </button>
            <img
              src={selectedImage}
              alt="Full View"
              className="w-full h-auto max-h-[80vh] rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewTopic;
