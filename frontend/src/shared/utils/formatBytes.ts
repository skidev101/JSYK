export function formatBytes(bytes: number | string, decimals = 2): string {
  const num = typeof bytes === "string" ? Number(bytes) : bytes;

  if (isNaN(num) || num === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(num) / Math.log(k)); // use num here
  return parseFloat((num / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]; // and here
}
