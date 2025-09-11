export const formatDate = (date?: string | Date): string => {
  if (!date) return "Unknown";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",  
    day: "numeric",  
    year: "numeric", 
  });
};
