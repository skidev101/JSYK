import cloudinary from "../config/cloudinary.js"

export const getCloudinaryUploadSignature = async (req, res) => {
  try {
    const folder = req.query.folder || "defaultFolder";
    const timestamp = Math.round(new Date().getTime() / 1000);

    // sign with your secret
   const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET
    );

    res.status(200).json({
      success: true,
      timestamp,
      signature,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });
  } catch (err) {
    console.error("Cloudinary signature error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to generate Cloudinary upload signature",
    });
  }
};

// import imageKit from "../config/imageKit.js";

// export const getImageUploadSignature = async (req, res) => {
//   try {
//     const result = imageKit.getAuthenticationParameters();

//     res.status(200).json({
//       success: true,
//       ...result,
//     });
//     console.log(result);
//   } catch (err) {
//     console.error("ImageKit signature error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to generate upload signature",
//     });
//   }
// };
