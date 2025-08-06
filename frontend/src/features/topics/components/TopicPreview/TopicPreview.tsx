import { useAuth } from "@/context/AuthContext"
import MessageCard from "@/shared/components/Message/MessageCard"
import { FadeDown } from "@/shared/components/Motion/MotionWrappers"
import { APP_CONFIG } from "@/shared/constants/config";
import { toSlug } from "@/shared/utils/slugify";
import { EllipsisVertical, Home, Palette } from "lucide-react"


interface TopicPreviewProps {
  topic: string;
  themeColor: string;
  topicImgPreviews?: string[];
}

const TopicPreview = ({ topic, themeColor, topicImgPreviews}: TopicPreviewProps )=> {
   const { user } = useAuth();

  return (
    <div className="w-full h-full">
          <FadeDown>
            <div className="bg-white rounded-xl p-4 sm:p-5 sm:w-full md:max-h-[100vh] md:overflow-y-auto">
              <div className="flex items-center gap-2 border-b-1 border-gray-200">
                <Palette size={20} />
                <h1 className="text-2xl">Preview</h1>
              </div>

              <div className="flex justify-center items-center w-full mt-4">
                <div className="flex flex-col w-full max-w-sm h-auto bg-gray-100 rounded-2xl p-2 sm:p-4">
                  <div className="flex justify-center items-center gap-4 border-b-1 pb-2 border-gray-300">
                    <Home size={20} className="text-gray-600" />
                    <div className="w-full px-2 py-2 bg-gray-200 rounded-full min-w-[150px] max-w-[250px]">
                      <p className="text-gray-600 text-sm truncate">
                        {`${APP_CONFIG.BASE_URL}/${toSlug(topic)}`}
                      </p>
                    </div>
                    <EllipsisVertical size={20} className="text-gray-600" />
                  </div>
                  <div className="w-full mt-5">
                    <MessageCard
                      username={user?.username}
                      profileImgUrl={user?.profileImgUrl}
                      topic={topic}
                      topicImgUrls={topicImgPreviews}
                      preview={true}
                      inView={false}
                      themeColor={themeColor}
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeDown>
        </div>
  )
}

export default TopicPreview