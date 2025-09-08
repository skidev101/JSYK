import satori from "satori";
import Message from "../models/Message.js";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

    res.setHeader("Content-Type", "image/png");
    res.send(pngBuffer);
  } catch (err) {
    console.error("OG Image Error:", err);
    res.status(500).send("Failed to generate OG image");
  }
};

export const getOgPage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).send("Message not found");
    }

    const imageUrl = `${process.env.API_BASE_URL}/api/image/generate/${messageId}`;

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta property="og:title" content="JSYK" />
          <meta property="og:description" content="send me messages anonymously 🤫🌚" />
          <meta property="og:image" content="${imageUrl}" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="${process.env.FRONTEND_URL}" />
        </head>
        <body>
          <p>This is a page...</p>
        </body>
      </html>
    `);
  } catch (err) {
    console.error("OG Page Error:", err);
    res.status(500).send("Failed to render OG page");
  }
};
