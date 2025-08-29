import imageKit from "../config/imageKit.js";

const getImageUploadSignature = async (req, res) => {
  try {
    const result = imageKit.getAuthenticationParameters();

    res.status(200).json({
      success: true,
      ...result,
    });
    console.log(result);
  } catch (err) {
    console.error("ImageKit signature error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to generate upload signature",
    });
  }
};


module.exports = { getImageUploadSignature };
