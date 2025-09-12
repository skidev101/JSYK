import User from "../models/User.js";

export const requireAdmin = async (req, res, next) => {
  try {
    const { uid } = req.user;
    console.log("uid for admin:", uid);
    if (!uid) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await User.findOne({ uid });
    if (!user || user.role !== "Admin") {
      return res.status(403).json({
        message: "Forbidden: Admins only",
      });
    }

    next();
  } catch (err) {
    console.error("Admin check error:", err);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};
