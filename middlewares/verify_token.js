const jwt = require("jsonwebtoken");

// create middleware function to check token validation
module.exports = function (req, res, next) {
    const token = req.header('x-authToken');

    if (!token) return res.status(401).send("Acess Denied");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if (verified.email)
        {
            req.email = verified.email;
            next();
        }
        else
        {
            status(400).send("Invalid Token");
        }   
    } catch (err) {
        res.status(400).send(err);
    }
};