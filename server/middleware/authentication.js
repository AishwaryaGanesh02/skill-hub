const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const token = req.header("token");

    if (!token) {
      return res.status(403).json("Not Authorized");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(403).json("Token is not valid");
  }
};
