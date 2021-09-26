const db = require('../models/index.js');
const { Op } = require('sequelize');


const passwordRandom = require('../utils/generateRandomPassword.js');
const passwordGenerator = require('../utils/encryptedPasswordGenerator.js');
const checkPassword = require('../utils/checkPassword.js');

const mailer = require('../templates/newUser.template.js')


exports.create = async (req, res) => {
    try {
        const { name, code, email, curp, phone, role } = req.body;
        const userExists = await db.user.findAll({
            attributes: ['id', 'userName', 'email'],
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        });
        if (userExists.length !== 0) return res.status(401).json("user already exists");

        const password = passwordRandom();
        const encryptedPassword = await passwordGenerator(password);

        const newUser = await db.user.create(
            {
                userName: name,
                userCode: code,
                email: email,
                curp: curp,
                phone: phone,
                password: encryptedPassword,
                role: role
            },
        )

        if (newUser) {
            mailer.sendEmailWithCredentials(name, code, email, password);
            res.status(201).json({ message: "User created" })
        } else {
            res.status(200).json({ message: "User was not create" })
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error")
    }

}

exports.getAll = async (req, res) => {
    try {

        const users = await db.user.findAll({
            attributes: ['id', 'userName', 'userCode', 'role', 'email', 'curp', 'status', 'phone']
        });
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error")
    }

}

exports.getOne = async (req, res) => {
    console.log(req.user)
    try {
        const users = await db.user.findAll({
            attributes: ['id', 'userName', 'email', 'curp', 'userCode', 'phone'],
            where: {
                id: {
                    [Op.eq]: req.user.id
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
        const body = await req.body;
        if (req.user.role === "admin" || req.user.id === body.id) {
            await db.user.update(body, {
                where: {
                    id: body.id
                }
            });

            res.status(200).json({
                statusCode: 200,
                message: "user updated"
            });
        } else {
            res.status(401).json(
                {
                    statusCode: 401,
                    message: "Unauthorized"
                }
            );
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json(
            {
                statusCode: 500,
                message: "Internal server error"
            }
        )
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

        const validPassword = await checkPassword(password, user[0].dataValues.password);
        if (!validPassword) return res.status(401).json("Password incorrect");

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
        if (req.user.role === "admin") {
            const body = req.body;
            await db.user.update({
                status: false
            }, {
                where: {
                    id: body.id
                }
            });

            res.status(200).json({
                statusCode: 200,
                message: "user delited"
            });
        } else {
            res.status(401).json(
                {
                    statusCode: 401,
                    message: "Unauthorized"
                }
            );
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json(
            {
                statusCode: 500,
                message: "Internal server error"
            }
        )
    }

}