const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const corsConfig = require('./config/corsConfig');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const messageRoutes = require('./routes/messageRoutes');
const topicRoutes = require('./routes/topicRoutes');
const imageServiceRoute = require('./routes/imageServiceRoute');

app.use(cors(corsConfig));

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/topic', topicRoutes);
app.use('/api/image/sign', imageServiceRoute);

app.get('/', (req, res) => {
    res.send('jsyk API is now live!');
});



module.exports = app;