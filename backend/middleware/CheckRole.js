const CheckRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next(); // User has the correct role, proceed to the next middleware or route handler
        } else {
            res.status(403).json({ error: "Forbidden: You do not have the required role" });
        }
    };
};

module.exports = CheckRole;
