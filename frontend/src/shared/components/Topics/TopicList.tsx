// import toast from "react-hot-toast";
// import { useAuth } from "../context/AuthContext";
// import { useDashboardData } from "../features/dashboard/hooks/useDashboardData";
// import { copyToClipboard } from "../utils/copyToClipboard";
// import { groupLinksByDate } from "../utils/groupByDate";
// import { Copy, Link2, Loader2, RefreshCcw } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const ViewTopics = () => {
//   const { firebaseUser } = useAuth();
//   const { data, loading, error, refetch } = useDashboardData(firebaseUser);
//   const groupedLinks = groupLinksByDate(data.recentLinks);
//   const navigate = useNavigate();

//   if (loading) return <div className="text-md">Loading...</div>;
//   if (error) return <div className="text-md">An error occured</div>;

//   const handleCopy = async (url: string) => {
//     const success = await copyToClipboard(`https://jsyk.me/${url}`);
//     if (success) {
//       toast.success("Copied!");
//     } else {
//       toast.error("Error copying");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center w-full min-h-[100vh] flex-col">
//       <div className="w-full max-w-3xl ">
//         <div className="flex justify-between items-center w-full py-2">
//           <div>
//             <h1 className="text-lg sm:text-2xl bg-gray-100 max-w-max px-3 mt-2 sm:px-4 sm:py-1 rounded-xl truncate">
//               Your Topics
//             </h1>
//             {/* <p className="text-sm bg-gray-100 max-w-max px-3 mt-2 sm:px-4 sm:py-1 rounded-xl truncate">All Topics you have created</p> */}
//           </div>
//           <button
//             onClick={() => refetch()}
//             className="bg-gray-100 rounded-full p-2 text-gray-700 font-bold cursor-pointer transition-all active:scale-95"
//           >
//             <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
//           </button>
//         </div>
//         <div className="w-full rounded-2xl p-4 border-1 border-gray-100 shadow-md">
//           {loading ? (
//             <Loader2
//               size={30}
//               className="bg-transparent text-black animate-spin"
//             />
//           ) : error ? (
//             <div className="flex justify-center items-center p-2 text-red-500">
//               An error occured
//             </div>
//           ) : Object.keys(groupedLinks).length === 0 ? (
//             <div className="flex flex-col items-center justify-center text-center py-10">
//               <img
//                 src="/box.png"
//                 alt="No links"
//                 className="w-36 h-36 mb-4 opacity-80"
//               />
//               <h2 className="text-lg font-semibold text-gray-700">
//                 No links yet
//               </h2>
//               <p className="text-sm text-gray-500 max-w-xs mt-2">
//                 Create an anonymous link to see links here
//               </p>
//               <button
//                 onClick={() => navigate("/new")}
//                 className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer active:scale-[0.95]"
//               >
//                 Create New Link
//               </button>
//             </div>
//           ) : (
//
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewTopics;
