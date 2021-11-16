const mongoose = require("mongoose");
const connectDB = async () => {
    const conn = await mongoose.connect("mongodb://localhost:27017/questanon", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    if (conn) console.log("Connected to DB");
    else console.log("Not connected to DB");
};

module.exports = connectDB;
