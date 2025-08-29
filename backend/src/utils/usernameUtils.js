import reservedWords from "./reservedWords";

exports.sanitizeDisplayName = (displayName) => {
  if (typeof displayName !== 'string') return "";
  
  return displayName
    .trim()
    .split(/\s+/)[0] // First word only
    .substring(0, 10); // Max 10 chars
};


exports.generateUniqueSlug = async (username, UserModel) => {
  username
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\-]/g, '')
    .substring(0, 10)

  if (reservedWords.includes(username)) {
    return res.status(403).json({
      success: false,
      message: "Invalid username",
      code: "FORBIDDEN_USERNAME"
    })
  }

  let slug = username;
  let counter = 0;

  while (await UserModel.findOne({ profileSlug: slug })) {
    counter++;
    slug = `{username}{counter}`
  }

  return slug;
}