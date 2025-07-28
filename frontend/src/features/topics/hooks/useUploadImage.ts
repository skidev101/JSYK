import { uploadToImageKit, type UploadResult } from "@/shared/utils/upload/uploadImage";
import toast from "react-hot-toast";



export const useUploadImage = async (files: File[]) => {
   if (!files) return;

   try {
      const results = await Promise.all(
         files.map((file) => uploadToImageKit({ file, folder: "/topicImgs"}))
      )
      const successfulUrls: string[] = [];
      const failedUploads: UploadResult[] = [];

      for (const res of results) {
         if (res.success && res.url) {
            successfulUrls.push(res.url)
         } else {
            failedUploads.push(res);
         }
      }

      if (failedUploads.length > 0) {
         toast.error("Image upload error. Please retry")
      }

      return successfulUrls;

   } catch (err) {
      console.error('Image error from useUploadError:', err)
   }
}

