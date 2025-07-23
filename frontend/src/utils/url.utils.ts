import { APP_CONFIG } from "../constants/config";

export const buildShareUrl = (path: string): string => {
   return `${APP_CONFIG.BASE_URL}/${path}`;
};