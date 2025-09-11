import { type TopicDetails } from "@/features/topics/hooks/useFetchTopic"; 


export const getTopicImageStatus = (topic: TopicDetails) => {
  const hasCurrentImages = topic.topicImgUrls && topic.topicImgUrls.length > 0;
  const hadPreviousImages = topic.hadImages;
  
  if (hasCurrentImages) {
    return { status: 'active', message: 'Has images' };
  } else if (hadPreviousImages) {
    return { status: 'expired', message: 'Images expired after 15 days' };
  } else {
    return { status: 'none', message: 'Text-only topic' };
  }
};
