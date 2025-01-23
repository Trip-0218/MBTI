const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Vishalisagood$boy'; // Ensure this is a strong secret and kept private

const Fetchuser = (req, res, next) => {
    // Get the token from the request body
    const token = req.body.token;

    // Check if the token is present
    if (!token) {
        return res.status(401).send({ error: "No token provided, authentication failed" });
    }

    try {
        // Verify the token
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; // Attach user data to the request object
        
        // Proceed to the next middleware or route handler
        next();
        
    } catch (error) {
        // Token is invalid or expired
        return res.status(401).send({ error: "Invalid or expired token" });
    }
};

module.exports = Fetchuser;
