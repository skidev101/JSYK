import emojiRegex from "emoji-regex";

const emojiPattern = emojiRegex();


export const validateUsername = (value: string): string | null => {
  const username = value.trim();

  const emojiMatches = username.match(emojiPattern) || [];
  const textWithoutEmojis = username.replace(emojiPattern, '');
  const visualLength = emojiMatches.length + textWithoutEmojis.length;

  if (visualLength < 3) return "Username must be at least 3 characters";

  if (visualLength > 10) return "Username must be less than 10 characters";


  const cleanUsername = username.replace(emojiPattern, '');
  const emojiMatch = /^[\p{L}\p{N}_-]*$/u.test(cleanUsername);

  // const valid = /^[\p{L}\p{N}_-]+/u;

  // const emojiMatch = [...username].every(
  //   (char) => valid.test(char) || emojiPattern.test(char)
  // )

  if (!emojiMatch) return "Username cannot contain spaces";


  return null;
};
