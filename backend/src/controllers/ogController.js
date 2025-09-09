import satori from "satori";
import Message from "../models/Message.js";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import imageKit from "../config/imageKit.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fontPath = path.join(__dirname, "../assets/fonts/Poppins-Regular.ttf");
const fontData = fs.readFileSync(fontPath);

export const generateOgImage = async (req, res) => {
  try {
    const { messageId } = req.params;

    // Fetch message from DB
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).send("Message not found");
    }

    if (message.ogImageUrl) {
      return res.status(200).json({
        imageUrl: message.ogImageUrl,
      });
    }

    const svg = await satori(
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            width: "100%",
            height: "100%",
            background: "#1d4ed8", // or message.topic.color
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: 36,
            fontFamily: "Poppins",
            padding: "40px",
            textAlign: "center",
          },
          children: message.content,
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Poppins",
            data: fontData,
            weight: 400,
            style: "normal",
          },
        ],
      }
    );

    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: 1200 },
    });
    const pngBuffer = resvg.render().asPng();

    const uploadResult = await imageKit.upload({
      file: pngBuffer,
      fileName: `og-message-${messageId}.png`,
      folder: "/og-images/",
    });

    message.ogImageUrl = uploadResult.url;
    await message.save();

    res.status(200).json({
      imageUrl: uploadResult.url,
    });
  } catch (err) {
    console.error("OG Image Error:", err);
    res.status(500).send("Failed to generate OG image");
  }
};

export const getOgPage = async (req, res) => {
  try {
    const { messageId } = req.params;
    if (!messageId) {
      return res.status(400).send("Message ID is required");
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).send("Message not found");
    }

    const imageUrl =
      message.ogImageUrl || "https://ik.imagekit.io/yo9tu00cr/jsyk.png";
    const shareUrl = `${process.env.FRONTEND_URL}/m/${message.profileSlug}`

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta property="og:title" content="JSYK" />
          <meta property="og:description" content="send me messages anonymously 🤫🌚" />
          <meta property="og:image" content="${imageUrl}" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="${shareUrl}" />
        </head>
        <body></body>
      </html>
    `);
  } catch (err) {
    console.error("OG Page Error:", err);
    res.status(500).send("Failed to render OG page");
  }
};
