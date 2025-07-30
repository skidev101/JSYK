import Card from "@/shared/components/Card/Card";
import NewTopicForm from "../NewTopicForm";
import TopicPreview from "../TopicPreview";
import { useState } from "react";

const NewTopicPage = () => {
  const [topic, setTopic] = useState("");
  const [themeColor, setThemeColor] = useState("#3570F8");
  const [topicImgFiles, setTopicImgFiles] = useState<File[]>([]);
  const [topicImgPreviews, setTopicImgPreviews] = useState<string[]>([]);

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Card>
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
      </Card>
      <Card>
        <TopicPreview
          topic={topic}
          themeColor={themeColor}
          topicImgPreviews={topicImgPreviews}
        />
      </Card>
    </div>
  );
};

export default NewTopicPage;
