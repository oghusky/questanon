const mongoose = require('mongoose'),
    Comment = new mongoose.Schema({
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
        },
        questionId: {
            type: String,
            required: true
        }
    }, { timestamps: true });

module.exports = mongoose.model("Comment", Comment);