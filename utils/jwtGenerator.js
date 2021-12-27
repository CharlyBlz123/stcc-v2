const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(id, role){
    const payload = {
        user: {
            id: id,
            role: role
        }
        
    }

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "24hr"});
}

module.exports =jwtGenerator;