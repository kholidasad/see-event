const sequelize = require('sequelize')
const Op = sequelize.Op
const Event = require('../models').Event

module.exports = {
    async findByName(req, res) {
        const findEvent = await Event
            .findAll({
                where: {
                    title: {
                        [Op.iLike]: `%${req.query.title}%`
                    }
                }
            })
            .then((data) => {
                if (data.length == 0) {
                    res.status(200).send({
                        message: 'Data Not Found'
                    })
                } else {
                    res.status(200).send({
                        status: 200,
                        message: 'Data Found!',
                        result: data
                    })
                }
            })
            .catch((error) => {
                res.status(500).send({
                    status: 500,
                    message: 'Internal Server Error!'
                })
            })
    },
}