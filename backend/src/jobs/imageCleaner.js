const cron = require("node-cron");
const Topic = require("../models/Topic");


cron.schedule("0 0 * * *", async () => {
    const now = new Date();
    const deleteDate = new Date(now.setDate(now.getDate() - 15)); // 15 days ago

    try {
        const expiredTopics = await Topic.find({
            createdAt: { $lte: deleteDate },
            topicImgUrls: { $exists: true, $ne: [] }
        })

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
            await Topic.save();
        }
        console.log("Image cleanup completed.");
    } catch (err) {
        console.error("Image cleanup job failed:", err);
    }
});