const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtgenerator(id) {
    const paylaod = {
        user_id: id,
    };
    return jwt.sign(paylaod, process.env.JWT_SECRET, { expiresIn: "24hr" });
}
module.exports = jwtgenerator;