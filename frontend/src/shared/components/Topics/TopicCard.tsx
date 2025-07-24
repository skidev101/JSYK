// import { Copy, Link2 } from "lucide-react";
// import toast from "react-hot-toast";
// import { copyToClipboard } from "../utils/copyToClipboard";
// import type { RecentLink } from "../utils/groupByDate";

// interface TopicCardProps {
//   date: string;
//   links: RecentLink[];
// }

// const TopicCard = ({ date, links }: TopicCardProps) => {
//   const handleCopy = async (url: string) => {
//     const success = await copyToClipboard(`https://something.me/${url}`); //remember to change
//     if (success) {
//       toast.success("Copied!");
//     } else {
//       toast.error("Error copying");
//     }
//   };

//   return (
//     <div key={date}>
//       <p className="text-sm text-gray-500 bg-gray-100 max-w-max px-3 mt-2 sm:px-4 sm:py-1 rounded-xl truncate">
//         {date}
//       </p>
//       {links.map((link) => (
//         <div
//           key={link._id}
//           className="relative flex justify-between items-center w-full text-gray-700 bg-gray-100 p-2.5 my-2 sm:px-3 sm:py-2.5 rounded-xl overflow-hidden"
//         >
//           <p className="text-sm font-medium text-gray-700 truncate">{link.topic || "no topic"}</p>
//           <div className="flex items-center gap-2">
//             <Link2 size={18} />
//             <p className="text-sm sm:text-base">{link.url}</p>
//           </div>
//           <button
//             onClick={() => handleCopy(link.url)}
//             className="absolute right-2 w-8 h-8 grid place-items-center bg-gray-200 rounded-xl cursor-pointer active:scale-[0.90] transition-all hover:bg-gray-300"
//           >
//             <Copy size={18} />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TopicCard;
