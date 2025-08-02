export const APP_CONFIG = {
   BASE_URL: import.meta.env.VITE_BASE_URL,
   API: 'http://localhost:3000/api',
   DEFAULT_AVATAR: '/default-pfp.webp'
} as const;