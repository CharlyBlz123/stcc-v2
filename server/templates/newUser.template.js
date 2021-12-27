'use strict'

const nodemailer = require('nodemailer');
require('dotenv').config();

this.sendEmailWithCredentials = (name, code, email, password, emailInfo) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPSSWD
        }
    });

    let mailOptions = {
        from: process.env.MAILUSER,
        to: email,
        subject: emailInfo.subject,
        html: `
            <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
            <tr height="200px">  
                <td bgcolor="" width="600px">
                    <h1 style="color: #fff; text-align:center">${emailInfo.title}</h1>
                    <p  style="color: #fff; text-align:center">
                        <span style="color: #e84393">${name}</span> 
                        ${emailInfo.message}
                    </p>
                </td>
            </tr>
            <tr bgcolor="#fff">
                <td style="text-align:center">
                    <p style="color: #000">Número de cuenta: ${code} Contraseña: ${password}</p>
                </td>
            </tr>
            </table>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error.message)
        } else {
            console.log(`Mail sent ${info.response}`);
        }
    });
};

module.exports = this;