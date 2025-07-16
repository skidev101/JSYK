import ImageKit from "imagekit-javascript";
import axios from "axios"

interface UploadOptions {
   file: File;
   folder?: string;
}

export const uploadToImageKit = async ({ file, folder }: UploadOptions): Promise<string | null> => {
   try {
      const { data } = await axios.get('http://127.0.0.1:3000/api/image/sign');

      const imageKit = new ImageKit({
         publicKey: data.token,
         urlEndpoint: '', // from env
         authenticationEndpoint: ''
      });

      const result = await imageKit.upload({
         file,
         fileName: file.name,
         signature: data.signature,
         timestamp: Math.floor(Date.now() / 1000),
         folder: folder
      });   

      return result.url;
   } catch (err: any) {
      console.error("ImageKit Upload Error:", err);
      return null;
   }
}