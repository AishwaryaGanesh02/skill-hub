const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.header("token");

    // Check if token exists
    if (!token) {
      return res.status(403).json("Not Authorized");
    }

    // Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // Attach payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err.message);
    res.status(403).json("Token is not valid");
  }
};
