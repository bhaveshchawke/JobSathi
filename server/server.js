const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
const session = require('express-session');
const MongoStore = require('connect-mongo').default || require('connect-mongo');

app.use(express.json());

// Session Configuration
app.use(session({
    secret: 'betuljobs_very_secret_key', // In prod, use process.env.SESSION_SECRET
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 Day
        httpOnly: true,
        // secure: true // Enable this if using HTTPS
    }
}));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));

const fs = require('fs');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected (Betul Jobs)'))
    .catch(err => console.error(err));

// Serve static assets in production
const clientBuildPath = path.join(__dirname, '../client/dist');
console.log(`[DEBUG] NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`[DEBUG] Client Build Path: ${clientBuildPath}`);
console.log(`[DEBUG] Client Build Exists: ${fs.existsSync(clientBuildPath)}`);

if (process.env.NODE_ENV === 'production') {
    if (fs.existsSync(clientBuildPath)) {
        app.use(express.static(clientBuildPath));

        app.get('*', (req, res) => {
            const indexPath = path.join(clientBuildPath, 'index.html');
            if (fs.existsSync(indexPath)) {
                res.sendFile(indexPath);
            } else {
                res.status(404).send('Error: index.html not found in build directory.');
            }
        });
    } else {
        app.get('/', (req, res) => {
            res.send(`API Running (Production), but Client Build not found at: ${clientBuildPath}`);
        });
    }
} else {
    app.get('/', (req, res) => {
        res.send('Betul Jobs Portal API is Running...');
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
