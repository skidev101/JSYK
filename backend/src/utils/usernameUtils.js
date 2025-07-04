exports.sanitizeDisplayName = (displayName) => {
  if (typeof displayName !== 'string') return "";
  
  return displayName
    .trim()
    .split(/\s+/)[0] // First word only
    .substring(0, 10); // Max 10 chars
};