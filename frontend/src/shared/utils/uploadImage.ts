import {
  uploadToImageKit,
  type UploadResult,
} from "../services/imageKit/uploadToImageKit";
import toast from "react-hot-toast";

export interface SuccessfulUploadsProps {
  url: string;
  fileId: string;
}

export const uploadImage = async (files: File[], folder: string) => {
  if (!files) return;

  try {
    const results = await Promise.all(
      files.map((file) => uploadToImageKit({ file, folder }))
    );
    const successfulUploads: SuccessfulUploadsProps[] = [];
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
