require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const corsOptions = require('./config/corsOptions');
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('jsyk API is now live!');
});

module.exports = app;