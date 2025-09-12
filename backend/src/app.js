import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import corsConfig from "./config/corsConfig.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import imageRoute from "./routes/imageRoute.js";
import userRoutes from "./routes/userRoutes.js";
import ogRoutes from "./routes/ogRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import featureRequestRoutes from "./routes/featureRequestRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();

app.get("/", (req, res) => {
  res.send("jsyk backend is now live!");
});

app.use(cors(corsConfig));
app.use(express.json());

app.use(helmet());

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/topic", topicRoutes);
app.use("/api/image/sign", imageRoute);
app.use("/api/user", userRoutes);
app.use("/api/image", ogRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feature", featureRequestRoutes);
app.use("/api/jobs", jobRoutes)

export default app;
