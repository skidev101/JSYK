import {
  uploadToImageKit,
  type UploadResult,
} from "@/shared/services/imageKit/uploadToImageKit";
import toast from "react-hot-toast";

export const useUploadImage = async (files: File[]) => {
  if (!files) return;

  try {
    const results = await Promise.all(
      files.map((file) => uploadToImageKit({ file, folder: "/topicImages" }))
    );
    const successfulUploads: { url: string; fileId: string }[] = [];
    const failedUploads: UploadResult[] = [];

    for (const res of results) {
      if (res.success && res.url && res.fileId) {
        successfulUploads.push({
          url: res.url,
          fileId: res.fileId,
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
