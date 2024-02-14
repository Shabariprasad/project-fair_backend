const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log("Inside JWT middleware");

    // Check if the Authorization header is present
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json("Authorization token missing.");
    }

    // Verify the token format and extract the actual token
    if (!token.startsWith('Bearer ')) {
        return res.status(401).json("Invalid token format.");
    }
    const actualToken = token.split(' ')[1];

    // Verify the token
    try {
        const tokenVerification = jwt.verify(actualToken, "superket2024");
        console.log("Token Verification:", tokenVerification);
        req.payload = tokenVerification.userId;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err);
        res.status(401).json("Authorization failed... please login again.");
    }
};

module.exports = jwtMiddleware;
