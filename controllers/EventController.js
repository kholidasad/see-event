const joi = require("joi")
const catchHandler = require("../utils/catchHandler")
const User = require("../models").User
const sequelize = require('sequelize')
const Op = sequelize.Op
const Event = require('../models').Event
const Bookmark = require('../models').Bookmark
const moment = require("moment");
const { verifyToken } = require('../utils/jwt')

const eventController = {
    createEvent: async (req,res)=>{
        const body = req.body
        const file = req.file
        let user_id = req.id

        try {
            const schema = joi.object({
                title: joi.string().required(),
                description: joi.string().required(),
                category: joi.required(), //enum
                date: joi.date().required(), //date
                image: joi.string(),
                // user_id: joi.number().required()
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

            const event = await Event.create({...body, image: file.path, user_id: user_id})
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
        let token = req.header("Authorization")
        let decoded = null
        
        if (token) {
          token = token.split(' ')
          decoded = verifyToken(token[1], process.env.JWT_KEY)
        } 

        const event = await Event.findAll({
            // limit: 15, //kenapa di limit
            order: [["date", "DESC"]],
            include: {
                        model: User,
                        as: "information",
                        attributes: {
                            exclude: ["email", "password", "updatedAt", "createdAt"],
                            },
                        }
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
                result: event,
                userLogin: decoded
            })
        } catch (error) {
            catchHandler(res,error)
        }
    },

    getEvent: async (req,res)=>{
        let token = req.header("Authorization")
        let decoded = null
        let isBookmark
        
        if (token) {
          token = token.split(' ')
          decoded = verifyToken(token[1], process.env.JWT_KEY)
        } 

        const {eventId} = req.params
        try {
          const event = await Event.findOne({
              where: {
                  id: eventId
              },
              include: {
                          model: User,
                          as: "information",
                          attributes: {
                              exclude: ["email", "password", "updatedAt", "createdAt"],
                            },
                        },
                      })
            if(!event){
                return res.status(404).json({
                    status: "Not Found",
                    message: "Event Not Found",
                    result: {}
                })
            }

            const findBookmark = await Bookmark.findOne({
              where: {
                event_id: eventId,
                user_id: decoded.id
              }
            })

            if(findBookmark) {
              isBookmark = true
            } else {
              isBookmark = false
            }

            res.status(200).json({
                status: "success",
                message: "successfully retrieved",
                result: event,
                bookmarkByUser: isBookmark
          
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
            // console.log(req.file);
            const {error} = schema.validate({...body})
            if(error){
                return res.status(400).json({
                    status: "Bad Request",
                    message: error.message,
                    result: {}
                })
            }
            // console.log(req.file);
            if(req.file){
                body.image = req.file.path
            }

            const checkUpdate = await Event.update(body,{
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

    filterEvents: async (req, res) => {
        const { order, date, category, limit, page } = req.query;
        try {
          // sort by date
          let sort;
          switch (order) {
            case "old":
              sort = ["createdAt", "ASC"];
              break;
            case "name":
              sort = ["title", "ASC"];
              break;
            default:
              sort = ["createdAt", "DESC"];
              break;
          }
    
          //sort datetime
          let today = new Date(),
            y = today.getFullYear(),
            m = today.getMonth(),
            d = today.getDate();
          let first, last;
          let dateRange;
          switch (date) {
            case "today":
              first = moment().startOf("day").toDate();
              last = moment().endOf("day").toDate();
              dateRange = {
                date: {
                  [Op.between]: [first, last],
                },
              };
              break;
            case "tomorrow":
              first = moment().endOf("day").toDate();
              last = moment().add(1, "day").endOf("day").toDate();
              dateRange = {
                date: {
                  [Op.between]: [first, last],
                },
              };
              break;
            case "week":
              first = moment().startOf("week").toDate();
              last = moment().endOf("week").toDate();
              dateRange = {
                date: {
                  [Op.between]: [first, last],
                },
              };
              break;
            case "month":
              first = moment().startOf("month").toDate();
              last = moment().endOf("month").toDate();
              dateRange = {
                date: {
                  [Op.between]: [first, last],
                },
              };
              break;
            case "year":
              first = moment().startOf("year").toDate();
              last = moment().endOf("year").toDate();
              dateRange = {
                date: {
                  [Op.between]: [first, last],
                },
              };
              break;
          }
          // sort Category
          let categoryQuery;
          if (category) {
            categoryQuery = {
              category: category,
            };
          }
          // console.log(categoryQuery);
    
          // sort pagination
          if (!page) {
            page - 1;
          }
    
          // limit data
          let limitData;
          if (limit) {
            limitData = Number(limit);
          } else {
            limitData = 8;
          }
    
          const events = await Event.findAndCountAll({
            limit: limitData,
            offset: (page - 1) * limitData,
            order: [sort],
            where: {
              ...dateRange,
              ...categoryQuery,
            },
          });
    
          if (events.length == 0) {
            return res.status(404).json({
              status: "Data Not Found",
              message: "The data is empty",
              result: [],
            });
          }
    
          return res.status(200).json({
            status: "OK",
            message: "Successfuly retrieve data",
            result: events,
            totalPage: Math.ceil(events.count / limitData),
          });
        } catch (error) {
          catchHandler(res, error);
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

module.exports = eventController