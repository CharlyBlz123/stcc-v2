const db = require('../models/index.js');
const { Op } = require('sequelize');
const passwordGenerator = require('../utils/encryptedPasswordGenerator.js');
const checkPassword = require('../utils/checkPassword');

exports.getAll = async (req, res) => {
    try {
        const users = await db.user.findAll({
            attributes: ['id', 'userName', 'email', 'curp', 'rfc', 'phone']
        });
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error")
    }

}

exports.getOne = async (req, res) => {
    try {
        const users = await db.user.findAll({
            attributes: ['id', 'userName', 'email', 'curp', 'rfc', 'phone'],
            where: {
                id: {
                    [Op.eq]: req.user
                }
            }
        });

        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error")
    }


}

exports.updateInformation = async (req, res) => {

    try {
        const { name, curp, rfc, phone } = req.body;
        await db.user.update(
            {
                userName: `"${name}"`,
                curp: `"${curp}"`,
                rfc: `"${rfc}"`,
                phone: `"${phone}"`,
            }, {
            where: {
                id: req.user
            }
        });

        res.status(200).json("User´s information updated!");

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error")
    }

}

exports.updateEmail = async (req, res) => {
    try {
        const { email } = req.body;
        await db.user.update(
            {
                email: `"${email}"`
            }, {
            where: {
                id: req.user
            }
        });

        res.status(200).json("User´s information updated!");

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error")
    }


}
exports.updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;
        const user = await db.user.findAll({
            attributes: ['password'],
            where: {
                id: {
                    [Op.eq]: req.user
                }
            }
        });

        const validPassword = await checkPassword(password,  user[0].dataValues.password);
        if(!validPassword) return res.status(401).json("Password incorrect");

        const encryptedPassword = await passwordGenerator(newPassword);

        await db.user.update(
            {
                password: `${encryptedPassword}`
            }, {
            where: {
                id: req.user
            }
        });

        res.status(200).json("User´s information updated!");

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error")
    }

}

exports.delete = async (req, res) => {
    try {


    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error")
    }

}