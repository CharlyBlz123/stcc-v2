const db = require('../models/index.js');
const { Op } = require('sequelize');
const jwtGenerator = require('../utils/jwtGenerator');
const passwordGenerator = require('../utils/encryptedPasswordGenerator');
const checkPassword = require('../utils/checkPassword');
  

exports.create = async (req, res) => {
    try {
        const { name, email, password, rfc, curp, phone } = req.body;
        const userExists = await db.user.findAll({
            attributes: ['id', 'userName', 'email'],
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        });
        if (userExists.length !== 0) return res.status(401).json("user already exists");

        const encryptedPassword = await passwordGenerator(password);

        const newUser = await db.user.create(
            {
                userName: name,
                email: email,
                rfc: rfc,
                curp: curp,
                phone: phone,
                password: encryptedPassword
            }
        );

        console.log(newUser.dataValues.password)

        const token = jwtGenerator(newUser.dataValues.id)
        res.status(200).json({ token })

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error")
    }

}

exports.new = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        const user = await db.user.findAll({
            attributes: ['id', 'userName', 'email', 'password'],
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        });

        if(user.length === 0) return res.status(401).json("Password or Email is incorrect");

        console.log(user)
        const validPassword = await checkPassword(password,  user[0].dataValues.password);
        if(!validPassword) return res.status(401).json("Password or Email is incorrect");

        const token = jwtGenerator(user[0].dataValues.id)
        res.status(200).json({ token })


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error")
    }

}

exports.authorizeAccess = async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error")
    }
}