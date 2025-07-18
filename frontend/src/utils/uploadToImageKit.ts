import ImageKit from "imagekit-javascript";
import axios from "axios"

interface UploadOptions {
   file: File;
   folder?: string;
}

export interface UploadResult {
   success: boolean;
   url?: string;
   fileId?: string;
   file?: File;
   error?: string
}


export const uploadToImageKit = async ({ file, folder }: UploadOptions): Promise<UploadResult> => {
   try {
      const { data } = await axios.get('http://127.0.0.1:3000/api/image/sign');
      console.log('image sign successfull')

      const imageKit = new ImageKit({
         publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
         urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT 
      });


      const result = await imageKit.upload({
         file,
         fileName: file.name,
         signature: data.signature,
         token: data.token,
         expire: data.expire,
         folder
      });   

      return { success: true, url: result.url, fileId: result.fileId };
   } catch (err: any) {
      console.error("ImageKit Upload Error:", err);
      return { success: false, file, error: err?.message || "Unknown error" }
   }
}