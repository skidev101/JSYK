import dotenv from "dotenv";
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import corsConfig from './config/corsConfig.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import topicRoutes from './routes/topicRoutes.js';
import imageRoute from './routes/imageRoute.js';
import userRoutes from './routes/userRoutes.js';
import ogRoutes from './routes/ogRoutes.js';
import { imageCleanupJob } from './jobs/imageCleaner.js';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
    res.send('jsyk backend is now live!');
});

app.get('/api/cleanup-images', async (req, res) => {
    try {
        await imageCleanupJob();
        console.log("cleanup done");
        res.json({ success: true, message: "Cleanup executed" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.use(cors(corsConfig));
app.use(express.json());

app.use(helmet());

app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/topic', topicRoutes);
app.use('/api/image/sign', imageRoute);
app.use('/api/user', userRoutes);
app.use('/api/og-image', ogRoutes);
app.use('/api/share', ogRoutes);



module.exports = app;