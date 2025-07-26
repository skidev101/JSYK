import { uploadToImageKit } from "@/shared/utils/upload/uploadImage";



export const uploadImages = async (files: File[]) => {
   try {
      const results = await Promise.all(
         files?.map((file) =>
         uploadToImageKit({ file, folder: "jsyk/topicImages" })
         )
      );

      const successfulUrls: string[] = [];
      const failedUrls = 0
   }
}