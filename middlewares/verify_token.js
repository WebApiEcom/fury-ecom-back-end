const jwt = require("jsonwebtoken");

// create middleware function to check token validation
module.exports = function (req, res, next) {
    const token = req.header('x-authToken');

    if (!token) return res.status(401).send("Acess Denied");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.users = verified; //in here DB name req.USER <<<
        next();
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};