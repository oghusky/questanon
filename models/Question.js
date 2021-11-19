const mongoose = require('mongoose'),
    Question = new mongoose.Schema({
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            name: String
        },
        text: {
            type: String,
            required: true,
            trim: true
        }
    }, { timestamps: true });

module.exports = mongoose.model("Question", Question);