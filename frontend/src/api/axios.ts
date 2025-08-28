import { APP_CONFIG } from "@/shared/constants/config";
import axios from "axios";

export default axios.create({
    baseURL: `${APP_CONFIG.API_BASE_URL}`
});

export const axiosPrivate = axios.create({
    baseURL: `${APP_CONFIG.API_BASE_URL}`,
    headers: {'Content-Type': 'application/json'},
});