import type { Topic } from "@/features/dashboard/hooks/useDashboardData";


// export interface RecentLink {
//    _id: string;
//    url: string;
//    createdAt: string;
//    topic: string;
// }

export const groupTopicsByDate = (links: Topic[]): Record<string, Topic[]> => {
   const grouped: Record<string, Topic[]> = {};
   const todayStr = new Date().toDateString();
   const yesterdayStr = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

   // const sortedLinks = [...links].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

   // const topFive = sortedLinks.slice(0, count);

   links.forEach(link => {
      const linkDateStr = new Date(link.createdAt).toDateString();
      let dateLabel: string;

      if (linkDateStr === todayStr) {
         dateLabel ='Today';
      } else if (linkDateStr === yesterdayStr) {
         dateLabel = 'Yesterday';
      } else {
         dateLabel = new Date(link.createdAt).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
         });
      }

      if (!grouped[dateLabel]) {
         grouped[dateLabel] = [];
      }

      grouped[dateLabel].push(link)
   });

   return grouped
}