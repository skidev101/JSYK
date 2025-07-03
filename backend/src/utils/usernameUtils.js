exports.sanitizeDisplayName = (displayName) => {
   if (typeof displayName !== 'string') return "";

   const firstWord = displayName.toLowerCase().split(/\s+/)[0] || "";

   return firstWord
      .replace(/[^\p{L}\p{N}_\-💯-🛸\u{1F000}-\u{1FAFF}]/gu, '')
      .substring(0, 15);

}