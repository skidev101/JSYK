import {
  uploadToImageKit,
  type UploadResult,
} from "@/shared/services/imageKit/uploadToCloudinary";
import toast from "react-hot-toast";

export const useUploadImage = async (files: File[]) => {
  if (!files) return;

  try {
    const results = await Promise.all(
      files.map((file) => uploadToImageKit({ file, folder: "/topicImages" }))
    );
    const successfulUploads: { url: string; publicId: string }[] = [];
    const failedUploads: UploadResult[] = [];

    for (const res of results) {
      if (res.success && res.url && res.publicId) {
        successfulUploads.push({
          url: res.url,
          publicId: res.publicId,
        });
      } else {
        failedUploads.push(res);
      }
    }

    if (failedUploads.length > 0) {
      toast.error("Image upload error. Please retry");
    }

    return successfulUploads;
  } catch (err) {
    console.error("Image error from useUploadImage:", err);
  }
};
