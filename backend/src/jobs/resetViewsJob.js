import User from "../models/User.js";

export const resetDailyViews = async () => {
  try {
    console.log("Resetting daily profile views...");
    await User.updateMany({}, { viewsToday: 0, viewsDate: new Date() });
    console.log("Daily views reset successful");
  } catch (err) {
    console.error("Error resetting daily views:", err);
  }
};
