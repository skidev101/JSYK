import FeatureRequest from "../models/FeatureRequest.js";

export const sendFeatureRequest = async (req, res) => {
  try {
    const { uid, email, username } = req.user;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "content is required",
        code: "EMPTY_BODY",
      });
    }

    console.log("username at create feature:", username);

    const newFeatureRequest = await FeatureRequest.create({
      uid,
      email,
      username,
      content,
    });

    console.log("new feature request:", newFeatureRequest);
    return res.status(201).json({
      success: true,
      message: "feature request created",
    });
  } catch (err) {
    console.error("send message error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

export const getFeatureRequests = async (req, res) => {
  try {
    const requests = await FeatureRequest.find().sort({ createdAt: -1 });
    console.log("all feature requests:", requests)

    return res.status(200).json({
        success: true,
        featureRequests: requests
    })
  } catch (err) {
    console.error("send message error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
