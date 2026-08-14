import { useState, type ChangeEvent, useRef } from "react";
import { X, Plus, Loader2, Tag } from "lucide-react";
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

    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type");
      return;
    }

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
        if (!uploadResult || uploadResult.length === 0) {
          toast.error("Image upload failed");
          return;
        }

        uploadedImgUrls = uploadResult;

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
    <section className="min-w-0 border border-[#d9dcd4] bg-[#fffefa] p-5 sm:p-7">
      <FadeDown>
        <div>
          <div className="mb-7 flex items-center justify-between border-b border-[#d9dcd4] pb-5">
              <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center border border-[#d9dcd4] bg-[#f0f1eb] text-[#e86b3c]"><Tag size={17} /></span>
              <div><p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[#8a928b]">Topic setup</p><h2 className="mt-1 text-lg font-semibold tracking-[-0.04em]">New topic</h2></div>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="grid h-9 w-9 place-items-center border border-[#d9dcd4] text-[#707871] transition hover:border-[#275d49] hover:text-[#275d49]"
            >
              <X size={20} />
            </button>
          </div>

          <div>
            <div className="mb-7">
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.1em] text-[#707871]">Topic name</label>
              <div>
                <input
                  type="text"
                  required
                  value={topic}
                  maxLength={100}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Create a new topic"
                  className="h-12 w-full border border-[#d9dcd4] bg-[#f8f7f2] px-3 text-sm outline-none transition placeholder:text-[#a3aaa4] focus:border-[#275d49] focus:bg-[#fffefa]"
                />
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="flex  ">
                  {topicError && (
                    <p className="text-xs text-[#b95345]">{topicError}</p>
                  )}
                </div>
                <p
                  className={`${
                    topic.length >= 100 ? "text-[#b95345]" : "text-[#8a928b]"
                  } font-mono text-[10px]`}
                >
                  {topic.length}/100
                </p>
              </div>
            </div>

            <div className="mb-7 flex items-center justify-between border-y border-[#e2e4de] py-4">
              <div><p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#707871]">Accent color</p><p className="mt-1 text-xs text-[#8a928b]">Used on your message card.</p></div>
              <div className="relative h-10 w-10 overflow-hidden border border-[#d9dcd4] bg-[#f8f7f2]">
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-7">
              <div className="mb-3"><p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#707871]">Optional images</p><p className="mt-1 text-xs text-[#8a928b]">Up to two images, 2MB each.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {topicImgPreviews.map((src, index) => (
                  <div
                    key={index}
                    className="relative h-28 overflow-hidden border border-[#d9dcd4] bg-[#f8f7f2]"
                  >
                    <img
                      src={src}
                      alt={`preview-${index}`}
                  className="h-full w-full cursor-pointer object-cover"
                      onClick={() => setSelectedImage(src)}
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute right-2 top-2 grid h-7 w-7 place-items-center bg-[#fffefa] text-[#707871] shadow-sm transition hover:bg-[#b95345] hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {topicImgPreviews.length < 2 && (
                  <>
                    <button
                      onClick={() => topicImageRef.current?.click()}
                      className="flex h-28 flex-col items-center justify-center border border-dashed border-[#cdd2ca] text-[#8a928b] transition hover:border-[#275d49] hover:text-[#275d49]"
                    >
                      <Plus size={20} />
                      <span className="text-xs mt-1">Add image</span>
                    </button>
                    <input
                      type="file"
                      ref={topicImageRef}
                      accept=".png, .jpg, .jpeg"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>
            </div>

            <p className="mb-4 text-center font-mono text-[9px] uppercase tracking-[0.08em] text-[#8a928b] sm:hidden">Preview below</p>

            <button
              disabled={loading}
              onClick={handleCreateTopic}
              className={`flex h-12 w-full items-center justify-center gap-2 bg-[#275d49] text-sm font-semibold text-white transition hover:bg-[#1d4435] active:translate-y-px ${loading ? "cursor-not-allowed opacity-60" : ""}`}
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
    </section>
  );
};

export default NewTopicForm;
