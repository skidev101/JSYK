const imageKit = require("../config/imageKit");

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

const generateShareImage = async () => {
  const { profileImgUrl, topic, message, themeColor } = req.body;

  try {
   const html = `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 20px;
            background: ${themeColor};
            font-family: system-ui, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .card {
            background: white;
            border-radius: 12px;
            width: 350px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            padding: 16px;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .profile {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .profile img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            object-fit: cover;
          }
          .username {
            background: #f3f4f6;
            border-radius: 8px;
            padding: 2px 6px;
            font-size: 14px;
            color: #374151;
          }
          .topic {
            background: #f3f4f6;
            border-radius: 8px;
            padding: 2px 6px;
            font-size: 14px;
            color: #374151;
            margin-top: 10px;
            display: inline-block;
          }
          .message-box {
            background: #f3f4f6;
            padding: 12px;
            border-radius: 8px;
            margin-top: 6px;
            font-size: 15px;
            color: #111827;
            line-height: 1.4;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <div class="profile">
              ${profileImgUrl ? `<img src="${profileImgUrl}" />` : `<div style="width:32px;height:32px;background:#d1d5db;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;color:#4b5563;">J</div>`}
              <div class="username">anonymous</div>
            </div>
          </div>

          ${topic ? `<div class="topic">${topic}</div>` : ""}

          <div class="message-box">
            ${message}
          </div>
        </div>
      </body>
    </html>
    `;


    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkIdle0" });
    const screenShotBuffer = await page.screenshot({ type: "png" });
    await browser.close;

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Disposition", 'attachment; filename="message.png"');
    res.send(screenShotBuffer);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Image generation failed" });
  }
};

module.exports = { getImageUploadSignature };
