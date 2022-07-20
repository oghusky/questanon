const User = require('../models/User'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs');
exports.register = async (req, res) => {
    const { email, password } = req.body.register;
    try {
        if (!email || !password) return res.status(500).json({ msg: "All fields required" });
        if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) return res.status(500).json({ msg: "Must Enter Valid Email" });
        if (!email.includes("bloopco.io")) return res.status(500).json({ msg: "Must be a giglabs employee" });
        if (email && password) {
            const user = await User.findOne({ email });
            if (user) return res.status(500).json({ msg: "User with that info already exists" });
            else {
                const enc = new TextEncoder();
                const encoded = enc.encode(email).join(",");
                if (email.includes("philip")) {
                    const newUser = await User.create({ email: encoded, password, admin: true });
                    return res.status(201).json({ msg: "User created", user: newUser.email });
                } else {
                    const newUser = await User.create({ email: encoded, password });
                    return res.status(201).json({ msg: "User created", user: newUser.email });
                }
            }
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Unable to create user" });
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body.login;
    const enc = new TextEncoder();
    const encoded = enc.encode(email).join(",");
    try {
        const user = await User.findOne({ email: encoded });
        if (user) {
            const isUser = await bcrypt.compare(password, user.password);
            const secret = 'phil is awesome';
            if (isUser) {
                const encodedEmail = new Uint16Array(user.email.split(","));
                const dec = new TextDecoder();
                const realEmail = dec.decode(encodedEmail);
                const token = jwt.sign({
                    id: user._id,
                    email: user.email,
                    isAdmin: user.admin
                }, secret, {
                    expiresIn: '30d'
                }, (err, token) => {
                    if (err) console.log(err);
                    return res.status(200).json({
                        msg: "You are logged in",
                        token,
                        user: {
                            id: user._id,
                            email: user.email,
                            isAdmin: user.admin,
                            realName: realEmail.replace(/[^A-Z0-9]/ig, "_").split("__")[0].replace(/[^A-Z0-9]/ig, "").toUpperCase()
                        }
                    })
                });
            }
        } else {
            return res.status(401).json({ msg: "User info doesn't match" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Unable to login" });
    }
}