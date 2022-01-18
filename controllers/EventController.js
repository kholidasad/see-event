const Event = require('../models').Event

module.exports = {
    async create(req, res) {
        let user_id = await id.id

        return Event
            .create({
                title: req.body.title,
                desc: req.body.desc,
                category: req.body.category,
                date: req.body.date,
                UserId: user_id
            })
            .then((data) => {
                res.status(200).send({
                    status: 200,
                    message: 'Event has been created!',
                    results: data
                })
            })
            .catch((err) => {
                res.status(500).send({
                    status: 500,
                    message: 'Internal Server Error!'
                })
            })
    },

    index (req, res) {
        return Event
            .findAll()
            .then((data) => {
                res.status(200).send({
                    message: 'Index Event',
                    result: data
                })
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Internal Server Error'
                })
            })
    },
    
    async search (req, res) {
        const searchEvent = await Event.findAll({
            where: {
                title: '%' + req.query.title + '%'
            }
        })
        .then((data) => {
            res.send({
                status: 200,
                message: 'Data has been found',
                result: data
            })
        })
        .catch((err) => {
            res.send({
                status: 404,
                message: 'Data not found'
            })
        })
    }   
}