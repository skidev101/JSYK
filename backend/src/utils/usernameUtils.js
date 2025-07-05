const reservedWords = require("./reservedWords");

exports.sanitizeDisplayName = (displayName) => {
  if (typeof displayName !== 'string') return "";
  
  return displayName
    .trim()
    .split(/\s+/)[0] // First word only
    .substring(0, 10); // Max 10 chars
};

exports.toLinkSlug = (username) => {
  return username
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\-]/g, '')
    .substring(0, 10)
}

exports.generateUniqueSlug = async (baseSlug, UserModel) => {
  if (reservedWords.includes(baseSlug)) return null;

  let slug = baseSlug;
  let counter = 0;

  while (await UserModel.findOne({ jsykLink: slug })) {
    counter++;
    slug = `{baseSlug}{counter}`
  }

  return slug;
}