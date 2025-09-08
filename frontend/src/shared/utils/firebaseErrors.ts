// utils/firebaseErrors.ts
export const firebaseErrorMessages: Record<string, string> = {
  "auth/email-already-in-use": "This email is already registered. Try logging in instead.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/operation-not-allowed": "Email/password accounts are disabled. Contact support.",

  "auth/user-disabled": "This account has been disabled. Contact support.",
  "auth/user-not-found": "No account exists with this email.",
  "auth/wrong-password": "Incorrect password. Try again.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",

  "auth/account-exists-with-different-credential": "An account already exists with this email using another sign-in method.",
  "auth/popup-closed-by-user": "The popup was closed before completing sign-in.",
  "auth/cancelled-popup-request": "Another popup is already open. Please try again.",

  "auth/network-request-failed": "Network error. Check your internet connection.",
  "auth/internal-error": "Something went wrong. Please try again.",
  "auth/invalid-credential": "Invalid or expired credentials. Please log in again.",
};

export const getFirebaseErrorMessage = (code: string): string =>
  firebaseErrorMessages[code] || "Something went wrong. Please try again.";
