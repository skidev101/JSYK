const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const corsConfig = require('./config/corsConfig');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const messageRoutes = require('./routes/messageRoutes');
const topicRoutes = require('./routes/topicRoutes');
const imageRoute = require('./routes/imageRoute');
const userRoutes = require('./routes/userRoutes');
const ogRoutes = require('./routes/ogRoutes');

app.get('/api/cleanup-images', async (req, res) => {
    const { imageCleanupJob } = require('./jobs/imageCleaner');
    try {
        await imageCleanupJob();
        res.json({ success: true, message: "Cleanup executed" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.use(cors(corsConfig));

app.use(helmet());

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/topic', topicRoutes);
app.use('/api/image/sign', imageRoute);
app.use('/api/user', userRoutes);
app.use('/api/og-image', ogRoutes);
app.use('/api/share', ogRoutes);


app.get('/', (req, res) => {
    res.send('something API is now live!');
});



module.exports = app;