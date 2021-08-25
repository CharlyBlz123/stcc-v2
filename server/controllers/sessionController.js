const db = require('../models/index.js');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

exports.create = async (req, res) => {
    try {
        const { name, email, password, rfc, curp, phone } = req.body;
        const userExists = await db.user.findAll({
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        });
        if (userExists.length !== 0) return res.status(401).json("user already exists");

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const encryptedPassword = await bcrypt.hash(password, salt);

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
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        });

        if(user.length === 0) return res.status(401).json("Password or Email is incorrect");

        const validPassword = await bcrypt.compare(password, user[0].dataValues.password);
        if(!validPassword) return res.status(401).json("Password or Email is incorrect");

        const token = jwtGenerator(user[0].dataValues.id)
        res.status(200).json({ token })


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error")
    }
}