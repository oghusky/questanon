const Question = require('../models/Question');

exports.postQuestion = async (req, res) => {
    let name = "";
    const { questText: { text }, isAnon } = req.body;
    const encodedEmail = new Uint16Array(req.token.email.split(","));
    const dec = new TextDecoder();
    if (!isAnon) name = dec.decode(encodedEmail);
    try {
        if (!text) return res.status(500).json({ msg: "Message field required" });
        else {
            const author = { id: req.token.id, name: name || "Anonymous" };
            const question = await Question.create({ author, text });
            return res.status(201).json({ msg: "Question created", question });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Unable to create question" });
    }
}

exports.getQuestions = async (req, res) => {
    try {
        if (req.token.isAdmin) {
            const questions = await Question.find();
            return res.status(200).json({ msg: "Found questions", questions });
        } else {
            const questions = await Question.find({ "author.id": String(req.token.id) });
            return res.status(200).json({ msg: "Found questions", questions });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Unable to get questions" });
    }
}

exports.deleteQuestions = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await Question.findOne({ _id: id });
        if (String(req.token.id) === String(question.author.id) || req.token.isAdmin) {
            await question.remove()
            return res.status(200).json({ msg: "Question deleted" });
        } else return res.status(403).json({ msg: "You aren't authorized to do that" });
    } catch (e) {
        console.log(e)
        return res.status(500).json({ msg: "Unable to delete message" })
    }
}