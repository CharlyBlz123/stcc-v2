const bcrypt = require('bcrypt');

const checkPassword = async (password, userPassword) =>{
    return await bcrypt.compare(password, userPassword);
}

module.exports =checkPassword;