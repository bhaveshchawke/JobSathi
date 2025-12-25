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

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected (Betul Jobs)'))
    .catch(err => console.error(err));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Betul Jobs Portal API is Running...');
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
