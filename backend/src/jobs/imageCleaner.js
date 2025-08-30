import Topic from "../models/Topic.js";
import imageKit from "../config/imageKit.js";
import cron from "node-cron";

const imageCleanupJob = async () => {
  const now = new Date();
  const deleteDate = new Date(now.getTime() - 1 * 60 * 1000); // 15 days ago

  try {
    console.log("now in img cleaner");
    console.log(`Looking for topics older than: ${deleteDate}`);
    const expiredTopics = await Topic.find({
      createdAt: { $lte: deleteDate },
      topicImgUrls: { $exists: true, $ne: [] },
    });

    for (const topic of expiredTopics) {
      const imgs = topic.topicImgUrls;

      for (const img of imgs) {
        try {
          await imageKit.deleteFile(img.fileId);
          console.log(`Deleted image: ${img.url}`);
        } catch (err) {
          console.error("Failed to delete image:", img.url, err.message);
        }
      }

      topic.topicImgUrls = [];
      await topic.save();
    }
    console.log("Image cleanup completed.");
  } catch (err) {
    console.error("Image cleanup job failed:", err);
  }
};

cron.schedule("*/2 * * * *", imageCleanupJob);

export default { imageCleanupJob };
