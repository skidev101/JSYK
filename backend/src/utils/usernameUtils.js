exports.sanitizeDisplayName = (displayName) => {
   if (typeof displayName !== 'string') return "";

   const firstName = displayName.toLowerCase().split(/\s+/)[0] || "";

   return firstName
      .replace(/[^\p{L}\p{N}_\-💯-🛸]/gu, '')
      .substring(0, 15);

}