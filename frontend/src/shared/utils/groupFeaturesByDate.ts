import type { FeatureRequest } from "@/features/Admin/hooks/useFeatureRequest";


export const groupFeaturesByDate = (features: FeatureRequest[]): Record<string, FeatureRequest[]> => {
   const grouped: Record<string, FeatureRequest[]> = {};
   const todayStr = new Date().toDateString();
   const yesterdayStr = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();


   features.forEach(feature => {
      const linkDateStr = new Date(feature.createdAt).toDateString();
      let dateLabel: string;

      if (linkDateStr === todayStr) {
         dateLabel ='Today';
      } else if (linkDateStr === yesterdayStr) {
         dateLabel = 'Yesterday';
      } else {
         dateLabel = new Date(feature.createdAt).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
         });
      }

      if (!grouped[dateLabel]) {
         grouped[dateLabel] = [];
      }

      grouped[dateLabel].push(feature)
   });

   return grouped
}