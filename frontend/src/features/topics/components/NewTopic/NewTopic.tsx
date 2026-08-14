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
    <div className="workspace-page">
      <div className="workspace-heading"><div><p className="workspace-kicker">Build a better prompt</p><h1>Start a new topic.</h1></div><p>Give people a clear door into the conversation.</p></div>
      <div className="topic-form-layout">
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
    </div>
  );
};

export default NewTopic;
