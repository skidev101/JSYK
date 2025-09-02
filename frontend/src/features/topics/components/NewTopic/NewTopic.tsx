// import Card from "@/shared/components/Card/Card";
import NewTopicForm from "../NewTopicForm";
import TopicPreview from "../TopicPreview";
import { useState } from "react";

const NewTopic = () => {
  const [topic, setTopic] = useState("");
  const [themeColor, setThemeColor] = useState("#3570F8");
  const [topicImgFiles, setTopicImgFiles] = useState<File[]>([]);
  const [topicImgPreviews, setTopicImgPreviews] = useState<string[]>([]);

  return (
    <div className="flex flex-col sm:flex-row items-start mt-16 mb-4 px-1 py-2 sm:px-2 sm:py-4 gap-6 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      
        <NewTopicForm
          topic={topic}
          setTopic={setTopic}
          themeColor={themeColor}
          setThemeColor={setThemeColor}
          topicImgPreviews={topicImgPreviews}
          setTopicImgPreviews={setTopicImgPreviews}
          topicImgFiles={topicImgFiles}
          setTopicImgFiles={setTopicImgFiles}
        />
      
      
        <TopicPreview
          topic={topic}
          themeColor={themeColor}
          topicImgPreviews={topicImgPreviews}
        />
      
    </div>
  );
};

export default NewTopic;
