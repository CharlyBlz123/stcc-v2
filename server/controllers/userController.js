const db = require('../models/index.js');
const { Op } = require('sequelize');


const passwordRandom = require('../utils/generateRandomPassword.js');
const passwordGenerator = require('../utils/encryptedPasswordGenerator.js');
const checkPassword = require('../utils/checkPassword.js');

const mailer = require('../templates/newUser.template.js')


exports.create = async (req, res) => {
    try {
        if (req.user.role === "admin") {
            const { name, code, email, curp, phone, role } = req.body;
            const userExists = await db.user.findAll({
                attributes: ['id', 'userName', 'email'],
                where: {
                    email: {
                        [Op.eq]: email
                    }
                }
            });
            if (userExists.length !== 0) return res.status(400).json("user already exists");

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
                const emailInfo = {
                    subject: "Nueva cuenta en el STCC",
                    title: "Bienvenido",
                    message: "al STCC"
                }
                mailer.sendEmailWithCredentials(name, code, email, password, emailInfo);
                res.status(201).json({ message: "User created" })
            } else {
                res.status(204).json({ message: "User was not create" })
            }
        } else {
            res.status(401).json({message: "User Not authorized"})

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
        console.log(req.user)
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
            console.log(req.body.id )
            console.log(req.user.id )

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
exports.updateCredentials = async (req, res) => {
    try {

        
        const {id, email, password, oldPassword} = req.body;

        const user = await db.user.findAll({
            attributes: ['password'],
            where: {
                id: {
                    [Op.eq]: req.user.id
                }
            }
        });

        console.log(oldPassword)
        const validPassword = await checkPassword(oldPassword, user[0].dataValues.password);
        if (!validPassword) return res.status(401).json("Password incorrect");
        
        let newData = {};
        if(password !== undefined){
            const encryptedPassword = await passwordGenerator(password);
            newData = {password: encryptedPassword}
            console.log(`new Data ${newData}`)
        }
        if(email){
            newData = {email: email, ...newData}
        }
        await db.user.update(newData, {
            where: {
                id: id
            }
        });

        res.status(200).json("User´s information updated!");

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error")
    }

}

exports.resetPassword = async (req, res) => {
    try {
        const { id, name, code, email } = req.body;
        const password = passwordRandom();
        const encryptedPassword = await passwordGenerator(password);
        let newData = {password: encryptedPassword};
        await db.user.update(newData, {
            where: {
                id: id
            }
        });
        const emailInfo = {
            subject: "Contraseña restablecida",
            title: "Nuevas credenciales",
            message: "para el STCC"
        }
        mailer.sendEmailWithCredentials(name, code, email, password, emailInfo);
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

exports.undelete = async (req, res) => {

    try {
        if (req.user.role === "admin") {
            const body = req.body;
            await db.user.update({
                status: true
            }, {
                where: {
                    id: body.id
                }
            });

            res.status(200).json({
                statusCode: 200,
                message: "user activated"
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