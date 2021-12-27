const db = require('../models/index.js');
const { Op } = require('sequelize');
const socket = require('../index');

exports.getAll = async (req, res) => {
    try {
        const registries = await db.registry.findAll({
            limit: 10,
            order: [ ['createdAt', 'DESC' ]],
            
        });
        res.status(200).json(registries);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error")
    }

}

exports.getByRange = async (req, res) => {
    try {
        const registries = await db.registry.findAll({
        });
        res.status(200).json(registries);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error")
    }
}

exports.create = async (req, res) => {

    try {
        const { date, time, temperature, pression, humidity, wind, wind_max, radiation, precipitation } = req.body;
        await db.registry.create(
            {
                date: date,
                time: time,
                temperature: temperature,
                pression: pression,
                humidity: humidity,
                wind: wind,
                wind_max: wind_max,
                radiation: radiation,
                precipitation: precipitation
            }
        );

        socket.io.emit('new: data', 'Updated');
        res.sendStatus(204);

    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error")
    }

}