const decode = require('jwt-decode');
exports.isAuth = async (req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'authorization, Origin, Content-Type, Accept'
    );
    if (req.headers.authorization) {
        req.token = await decode(req.headers.authorization);
        next();
    } else {
        res.status(403).json({ msg: "You must log in" });
    }
}