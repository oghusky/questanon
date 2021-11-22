const Question = require('../models/Question'),
    Comment = require('../models/Comment');

exports.postCommentByQuestionId = async (req, res) => {
    let name = "";
    const { commentText: { text }, isAnon } = req.body;
    const { questionId } = req.params;
    const encodedEmail = new Uint16Array(req.token.email.split(","));
    const dec = new TextDecoder();
    if (!isAnon) name = dec.decode(encodedEmail);
    try {
        if (!text) return res.status(500).json({ msg: "Message field required" });
        else {
            const author = { id: req.token.id, name: name || "Anonymous" };
            const comment = await Comment.create({ author, text, questionId });
            const question = await Question.findOne({ _id: questionId });
            await question.comments.push(comment);
            await question.save();
            return res.status(201).json({ msg: "Comment created", comment });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Unable to create comment" });
    }
}

exports.getCommentsByQuestionId = async (req, res) => {
    const { questionId } = req.params;
    try {
        const question = await Question.findById({ _id: questionId }).populate("comments");
        const comments = await question.comments;
        return res.status(200).json({ msg: "Found comments", comments });
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: "Unable to get comments" });
    }
}

exports.deleteCommentByCommentId = async (req, res) => {
    const { questionId, commentId } = req.params;
    try {
        const comment = await Comment.findOne({ _id: commentId });
        const question = await Question.findOne({ _id: questionId });
        if (String(req.token.id) === String(comment.author.id)) {
            console.log(comment._id);
            const commentList = await question.comments.filter(item => String(item) !== String(comment._id));
            question.comments = commentList;
            await question.save();
            await comment.remove();
            return res.status(200).json({ msg: "Comment deleted" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Unable to delete comment" });
    }
}