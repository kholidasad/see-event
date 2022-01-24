const joi = require("joi")
const catchHandler = require("../utils/catchHandler")
const sequelize = require('sequelize')
const Op = sequelize.Op
const Event = require('../models').Event

module.exports = {
    createEvent: async (req,res)=>{
        const body = req.body
        const file = req.file

        try {
            const schema = joi.object({
                title: joi.string().required(),
                description: joi.string().required(),
                category: joi.required(), //enum
                date: joi.date().required(), //date
                image: joi.string(),
                user_id: joi.number().required()
            })
            const {error} = schema.validate({
                ...body,
                image: file.path
                })
            if (error) {
                return res.status(400).json({
                    status: "Bad Request",
                    message: error.message,
                    result: {}
                })
            }

            const event = await Event.create({...body, image: file.path})
            if(!event){
                return res.status(500).json({
                    status: "Internal Server Error",
                    message: "Failed to save data to database",
                    result: {}
                })
            }

            res.status(201).json({
                status: "success",
                message: "successfully created event",
                result: event
            })

        } catch (error) {
            catchHandler(res,error)
        }
    },

    getEvents: async (req,res)=> {
        try {
            const event = await Event.findAll({
                limit: 15,
                order: [["date", "DESC"]]
            })
            
            if (event.length == 0){
                return res.status(404).json({
                    status: "Not Found",
                    message: "data does not exist!",
                    result: {}
                })
            }

            res.status(200).json({
                status: "success",
                message: "Events successfully retrieved",
                result: event
            })
        } catch (error) {
            catchHandler(res,error)
        }
    },

    getEvent: async (req,res)=>{
        const {eventId} = req.params
        try {
            const event = await Event.findByPk(eventId)

            if(!event){
                return res.status(404).json({
                    status: "Not Found",
                    message: "Event Not Found",
                    result: {}
                })
            }
            
            res.status(200).json({
                status: "success",
                message: "successfully retrieved",
                result: event
            })
        } catch (error) {
            catchHandler(res,error)
        }
    },

    updateEvent: async (req,res)=>{
        const {eventId} = req.params
        const body = req.body
        const file = req.file
        try {
            const schema = await joi.object({
                title: joi.string(),
                description: joi.string(),
                category: joi.string(), //enum
                date: joi.date(), //date
                image: joi.string(),
                user_id: joi.number()
            })
            console.log(req.file);
            const {error} = schema.validate({...body, image: file.path})
            if(error){
                return res.status(400).json({
                    status: "Bad Request",
                    message: error.message,
                    result: {}
                })
            }
            console.log(req.file);
            if(req.file){
                body.image = req.file.path
            }

            const checkUpdate = await Event.update(...body,{
                where: {
                    id: eventId
                }
            })

            if(checkUpdate[0] != 1){
                return res.status(500).json({
                    status: "Internal Server Error",
                    message: "Failed to update event",
                    result: {}
                })
            }

            const updatedEvent = await Event.findByPk(eventId)

            res.status(201).json({
                status: "success",
                message: "event successfully updated",
                result: updatedEvent
            })
        } catch (error) {
            catchHandler(res,error)
        }
    },

    deleteEvent: async (req,res)=>{
        const {eventId} = req.params
        try {
            const event = await Event.destroy({
                where: {
                    id: eventId
                }
            })

            if(!event){
                return res.status(404).json({
                    status: "Not Found",
                    message: "Event does not exist!",
                    result: {}
                })
            }

            res.status(200).json({
                status: "success",
                message: "Successfully deleted",
                result: {}
            })
        } catch (error) {
            catchHandler(res,error)
        }
    },
    
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

