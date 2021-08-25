const bcrypt = require('bcrypt');

const passwordGenerator = async (password) =>{
    const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        return await bcrypt.hash(password, salt);
}

module.exports =passwordGenerator;