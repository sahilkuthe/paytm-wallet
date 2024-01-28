const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("./config")


function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){        //checks the headers
        return res.status(403).json({})
    }

    const token = authHeader.split(" ")[1];     //this will create array ["bearer", "<token>"] and we want the second element of this array
    //now verify if the token is valid

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.userId) {
            req.userId === decoded.userId;
            next();
        }else{
            return res.status(403).json({});
        }

    } catch (error) {
        return res.status(403).json({});
    }
}

module.exports = {
    authMiddleware,
    
};