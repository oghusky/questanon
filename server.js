require("dotenv").config();
const express = require('express'),
    app = express(),
    cors = require('cors'),
    path = require('path'),
    morgan = require('morgan'),
    PORT = process.env.PORT || 3001,
    connectDB = require('./config/db');

// connect DB
connectDB();
// route logging
app.use(morgan('dev'));
// express middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// test route
app.get("/config", (req, res) => {
    res.json({
        status: "SERVER WORKS"
    })
});

app.use("/", require('./routes/public-routes'));
app.use('/auth', require('./routes/auth-routes'));
app.use('/question', require('./routes/question-routes'));

// index html route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})