// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ error: 'Authentication failed: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
        if (error) {
            return res.status(401).json({ error: 'Authentication failed: Invalid token' });
        }

        req.userId = decodedToken.userId; // Attach decoded userId to request object
        next(); // Pass control to the next middleware
    });
};

module.exports = authenticateToken;
