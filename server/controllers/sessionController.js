const db = require('../models/index.js');
const { Op } = require('sequelize');
const jwtGenerator = require('../utils/jwtGenerator');
const checkPassword = require('../utils/checkPassword');

exports.new = async (req, res) => {
    try {
        const { userCode, password } = req.body;
        const user = await db.user.findAll({
            attributes: ['id', 'userName', 'userCode', 'curp', 'phone', 'email', 'role', 'password'],
            where: {
                userCode: {
                    [Op.eq]: userCode
                }
            }
        });

        if(user.length === 0) return res.status(401).json({
            message: "Password or Email is incorrect"
        });

        const validPassword = await checkPassword(password,  user[0].dataValues.password);
        if(!validPassword) return res.status(401).json({
            message: "Password or Email is incorrect"
        });

        const token = jwtGenerator(user[0].dataValues.id, user[0].dataValues.role)
        res.status(200).json({ token, user: user[0].dataValues })


    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: "Server error"})
    }

}

exports.authorizeAccess = async (req, res) => {
    try {
        const user = await db.user.findAll({
            attributes: ['id', 'userName', 'userCode', 'curp', 'phone', 'email', 'role'],
            where: {
                id: {
                    [Op.eq]: req.user.id
                }
            }
        });
        res.status(200).json({auth: true, user: user[0].dataValues});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error")
    }
}