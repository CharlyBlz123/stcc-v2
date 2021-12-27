const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async(req, res, next) => {
    try {
        const jwToken = req.header("token");
        if(!jwToken)  res.status(403).json("Not Authorize");

        const payload = jwt.verify(jwToken, process.env.jwtSecret);
        req.user = payload.user;
    } catch (error) {
        res.status(500).json("Not Authorize");
    }

    next();
}