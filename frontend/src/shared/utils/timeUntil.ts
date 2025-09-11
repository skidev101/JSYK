export const timeUntil = (date?: string | Date): string => {
  if (!date) return "Unknown";
  const target = new Date(date).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) return "Expired";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return `Expires in ${days} day${days > 1 ? "s" : ""}`;
  }
  if (hours > 0) {
    return `Expires in ${hours} hour${hours > 1 ? "s" : ""}`;
  }
  return "Expires soon";
};
