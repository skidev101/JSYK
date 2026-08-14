import NewTopicForm from "../NewTopicForm";
import TopicPreview from "../TopicPreview";
import { useState } from "react";

const NewTopic = () => {
  const [topic, setTopic] = useState("");
  const [themeColor, setThemeColor] = useState("#3570F8");
  const [topicImgFiles, setTopicImgFiles] = useState<File[]>([]);
  const [topicImgPreviews, setTopicImgPreviews] = useState<string[]>([]);

  return (
    <div className="min-h-[calc(100vh-70px)] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 border-b border-[#d9dcd4] pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#275d49]">Build a better prompt</p>
            <h1 className="text-4xl font-semibold leading-none tracking-[-0.06em] text-[#1f2421] sm:text-5xl">Start a new topic.</h1>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[#707871]">Give people a clear door into the conversation.</p>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
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
    </div>
  );
};

export default NewTopic;
