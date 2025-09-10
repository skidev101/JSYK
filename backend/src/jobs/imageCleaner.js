import Topic from "../models/Topic.js";
import cloudinary from "../config/cloudinary.js";

export const imageCleanupJob = async () => {
  const now = new Date();
  const deleteDate = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000); // 15 days ago

  try {
    console.log("Running image cleanup job...");
    console.log(`Looking for topics older than: ${deleteDate}`);

    const expiredTopics = await Topic.find({
      createdAt: { $lte: deleteDate },
      topicImgUrls: { $exists: true, $ne: [] },
    });

    for (const topic of expiredTopics) {
      const imgs = topic.topicImgUrls;

      for (const img of imgs) {
        if (img.publicId) {
          try {
            await cloudinary.v2.uploader.destroy(img.publicId);
            console.log(`Deleted image: ${img.url}`);
          } catch (err) {
            console.error("Failed to delete image:", img.url, err.message);
          }
        } else {
          console.warn("Skipped cleanup — missing publicId for:", img.url);
        }
      }

      // clear images from DB
      topic.topicImgUrls = [];
      await topic.save();
    }

    console.log("Image cleanup completed.");
  } catch (err) {
    console.error("Image cleanup job failed:", err);
  }
};
