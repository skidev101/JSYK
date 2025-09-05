import { useState, type ChangeEvent, useRef } from "react";
import { Pencil, X, Plus, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FadeDown } from "@/shared/components/Motion/MotionWrappers";
import toast from "react-hot-toast";
import { useCreateTopic } from "../../hooks/useCreateTopic";
import {
  uploadImage,
  type SuccessfulUploadsProps,
} from "@/shared/utils/uploadImage";

interface NewTopicFormProps {
  topic: string;
  setTopic: (value: string) => void;
  themeColor: string;
  setThemeColor: (value: string) => void;
  topicImgFiles: File[];
  setTopicImgFiles: (files: File[]) => void;
  topicImgPreviews: string[];
  setTopicImgPreviews: (urls: string[]) => void;
  // selectedImage: string;
  // setSelectedImage: (img: string | null) => void;
  // topicImageRef: RefObject<HTMLInputElement>;
}

const NewTopicForm = ({
  topic,
  setTopic,
  themeColor,
  setThemeColor,
  topicImgFiles,
  setTopicImgFiles,
  topicImgPreviews,
  setTopicImgPreviews,
}: // selectedImage,
// setSelectedImage,
// topicImageRef
NewTopicFormProps) => {
  const navigate = useNavigate();
  const [topicError, setTopicError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { createTopic } = useCreateTopic();

  const topicImageRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxFileSize = 2 * 1024 * 1024;
    if (file.size > maxFileSize) {
      toast.error("Image size exceeds 2MB limit.");
      return;
    }

    setTopicImgFiles([...topicImgFiles, file]);
    setTopicImgPreviews([...topicImgPreviews, URL.createObjectURL(file)]);
  };

  const removeImage = (index: number) => {
    const updatedFiles = [...topicImgFiles];
    const updatedPreviews = [...topicImgPreviews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setTopicImgFiles(updatedFiles);
    setTopicImgPreviews(updatedPreviews);
  };

  const handleCreateTopic = async () => {
    if (!topic.trim()) {
      setTopicError("Topic is required");
      return;
    }
    if (topic.length === 100) {
      setTopicError("Max length reached");
      return;
    }

    setLoading(true);

    try {
      let uploadedImgUrls: SuccessfulUploadsProps[] | undefined;
      if (topicImgFiles.length) {
        const uploadResult = await uploadImage(
          topicImgFiles,
          "/jsyk/topicImages"
        );
        if (uploadResult) {
          uploadedImgUrls = uploadResult;
        }
        console.log("result from image upload at topicForm:", uploadResult);
      }

      const payload = {
        topic,
        themeColor,
        topicImgUrls: uploadedImgUrls,
      };

      console.log("payload to backend:", payload);

      const topicCreateSuccess = await createTopic(payload);
      if (topicCreateSuccess) {
        toast.success("Topic created");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full sm:max-w-md">
      <FadeDown>
        <div className="w-full sm:max-w-sm rounded-xl p-4 sm:p-6 md:min-w-sm xl:min-w-md bg-white shadow">
          <div className="flex justify-between items-center py-2">
            <h1 className="text-2xl sm:text-3xl">New topic</h1>
            <button
              onClick={() => navigate("/dashboard")}
              className="grid place-items-center p-2 sm:p-2 cursor-pointer rounded-xl text-gray-600 font-semibold hover:bg-gray-200 transition duration-200 outline-0"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col mt-3">
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
                  maxLength={100}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Create a new topic"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-between items-center mt-1">
                <div className="flex  ">
                  {topicError && (
                    <p className="text-sm text-red-500">{topicError}</p>
                  )}
                </div>
                <p
                  className={`${
                    topic.length >= 100 ? "text-red-500" : "text-gray-700"
                  } text-xs`}
                >
                  {topic.length}/100
                </p>
              </div>
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

              <div className="w-full grid grid-cols-2 gap-1 sm:gap-4 mb-4">
                {topicImgPreviews.map((src, index) => (
                  <div
                    key={index}
                    className="relative h-22 sm:h-24 border border-gray-300 rounded-lg overflow-hidden"
                  >
                    <img
                      src={src}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setSelectedImage(src)}
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
                      className="h-24 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:border-gray-600"
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

              <p className="sm:hidden text-sm text-center text-gray-700">*see preview below</p>

            <button
              disabled={loading}
              onClick={handleCreateTopic}
              className={`flex justify-center items-center w-full text-white font-semibold px-4 py-2 mt-4 rounded-lg shadow-lg ${
                loading
                  ? "bg-gradient-to-r from-blue-400 to-purple-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-400 hover:bg-blue-600 cursor-pointer"
              } hover:scale-[1.01] active:scale-[0.98] transition duration-200`}
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                "Create"
              )}
            </button>
          </div>
        </div>
      </FadeDown>

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
              className="absolute top-2 right-2 text-white p-1 rounded-full bg-gray-500 hover:bg-gray-800 hover:cursor-pointer transition"
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

export default NewTopicForm;
