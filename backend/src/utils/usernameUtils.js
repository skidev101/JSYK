const reservedWords = [
  "admin",
  "login",
  "logout",
  "jsyk",
  "dashboard",
  "support",
  "terms",
  "privacy",
  "support",
];

export const sanitizeDisplayName = (displayName) => {
  if (typeof displayName !== "string") return "";

  return displayName
    .trim()
    .split(/\s+/)[0] // First word only
    .substring(0, 10); // Max 10 chars
};

export const generateUniqueSlug = async (username, UserModel) => {
  if (typeof username !== "string" || !username.trim()) {
    throw new Error("INVALID_USERNAME");
  }

  // Sanitize input
  let slug = username
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\-]/g, "") // keep only a-z, 0-9, _ and -
    .substring(0, 10);

  // Check reserved words
  if (reservedWords.includes(slug)) {
    throw new Error("FORBIDDEN_USERNAME");
  }

  // Ensure uniqueness in DB
  let counter = 0;
  let uniqueSlug = slug;
  while (await UserModel.findOne({ profileSlug: uniqueSlug })) {
    counter++;
    uniqueSlug = `${slug}${counter}`; // append counter if already exists
  }

  return uniqueSlug;
};
