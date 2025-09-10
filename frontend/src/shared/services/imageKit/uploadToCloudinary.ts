// import ImageKit from "imagekit-javascript";
// import axios from "axios";
// import { APP_CONFIG } from "../../constants/config";

// interface UploadOptions {
//   file: File;
//   folder?: string;
// }

// export interface UploadResult {
//   success: boolean;
//   url?: string;
//   publicId?: string;
//   file?: File;
//   error?: string;
// }

// export const uploadToImageKit = async ({
//   file,
//   folder,
// }: UploadOptions): Promise<UploadResult> => {
//   try {
//     const { data } = await axios.get(`${APP_CONFIG.API_BASE_URL}/image/sign`);

//     const imageKit = new ImageKit({
//       publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
//       urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
//     });

//     const result = await imageKit.upload({
//       file,
//       fileName: file.name || `upload_${Date.now()}`,
//       signature: data.signature,
//       token: data.token,
//       expire: data.expire,
//       folder,
//     });

//     return { success: true, url: result.url, publicId: result.publicId };
//   } catch (err: any) {
//     console.error("ImageKit Upload Error:", err);
//     return { success: false, file, error: err?.message || "Unknown error" };
//   }
// };

import axios from "axios";
import { APP_CONFIG } from "../../constants/config";

interface UploadOptions {
  file: File;
  folder?: string;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  file?: File;
  error?: string;
}

  export const uploadToCloudinary = async ({
    file,
    folder,
  }: UploadOptions): Promise<UploadResult> => {
    try {
      // Get signature and params from backend
      const { data } = await axios.get(
        `${APP_CONFIG.API_BASE_URL}/image/sign`
      );
      const { timestamp, signature, cloudName, apiKey } = data;
      console.log("img upload res:", data)

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      if (folder) formData.append("folder", folder);

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return {
        success: true,
        url: response.data.secure_url,
        publicId: response.data.public_id,
      };
    } catch (err: any) {
      console.error(
        "Cloudinary Upload Error:",
        err.response?.data || err.message
      );
      return {
        success: false,
        file,
        error:
          err.response?.data?.error?.message || err.message || "Unknown error",
      };
    }
  };
