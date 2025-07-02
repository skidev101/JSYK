export const validateUsername = (username: string): string | null => {
  if (username.includes(" ")) return "Username cannot contain spaces";

  if (username.trim().length < 3) return "Username must be at least 3 characters";

  if (username.trim().length > 10) return "Username must be less than 10 characters";

  return null;
};
