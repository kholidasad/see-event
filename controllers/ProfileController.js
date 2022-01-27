const joi = require('joi')
const catchHandler = require("../utils/catchHandler")
const { hashPassword } = require('../utils/bcrypt')
const Bookmark = require('../models').Bookmark
const User = require('../models').User
const Event = require('../models').Event

module.exports = {
    async getProfile(req, res) {
        let user_id = req.id

        try {
            const getUserProfile = await User.findOne({
                where: {
                    id: user_id
                },
                include: [{
                    model: Event,
                    as: 'bookmark',
                    attribute: {
                        exclude: ['created_at', 'updated_at']
                    }
                },
                {
                    model: Event,
                    as: 'event_user',
                    attribute: {
                        exclude: ['created_at', 'updated_at']
                    }
                }
            ]
            })
            
            res.status(200).json({
                status: "success",
                message: "successfully retrieved",
                result: getUserProfile
            })
        } catch (error) {
            catchHandler(res, error)
        }
    },

    async updateProfile(req, res) {
        let user_id = req.id
        const body = req.body

        try {
            const schema = await joi.object({
                firstName: joi.string(),
                lastName: joi.string(),
                email: joi.string().email(),
                password: joi.string().min(6).max(16),
                image: joi.string()
            })

            const {error} = schema.validate({...body})

            if(error) {
                return res.status(400).json({
                    status: 'Bad Request',
                    message: error.message,
                    result: {}
                })
            }

            if (req.file) {
                body.photo = req.file.path
            }

            if (req.body.password) {
                body.password = hashPassword(password);
            }

            const upProfile = await User.update(body, {
                where: {
                    id: user_id
                }
            })

            if (upProfile[0] != 1) {
                return res.status(500).json({
                    status: "Internal Server Error",
                    message: "Failed to update event",
                    result: {}
                })
            }

            const findProfile = await User.findByPk(user_id)

            res.status(201).json({
                status: 'Success',
                message: 'Profile has been updated',
                result: findProfile
            })

        } catch (error) {
            catchHandler(res,error)
        }
    },

    async deletePhotoProfile(req, res) {
        let user_id = req.id

        const deletePhoto = await User.update({
            photo: 'https://www.its.ac.id/international/wp-content/uploads/sites/66/2020/02/blank-profile-picture-973460_1280-1-300x300.jpg'
        }, {
            where: {
                id: user_id
            }
        })
        .then((data) => {
            res.status(201).json({
                status: 'Success',
                message: 'Photo has been deleted'
            })
        })
        .catch((err) => {
            return res.status(500).json({
                status: "Internal Server Error",
                message: "Failed to delete photo"
            })
        })
    },

    async postBookmark(req, res) {
        let user_id = req.id

        const bookMarked = await Bookmark.create({
            event_id: req.params.eventId,
            user_id: user_id
        })
        .then((data) => {
            res.status(201).json({
                status: 'Success',
                message: 'Successfully Bookmarked',
                result: data
            })
        })
        .catch((err) => {
            res.status(500).send({
                status: 'Error!',
                message: 'Internal Server Error!'
            })
        })
    },

    async removeBookmark(req, res) {
        const deleteMarked = await Bookmark.destroy({
            where: {
                event_id: req.params.eventId
            }
        })
        .then((data) => {
            res.status(201).json({
                status: 'Success',
                message: 'Successfully Unbookmarked',
            })
        })
        .catch((err) => {
            res.status(500).json({
                status: 'Error!',
                message: 'Internal Server Error!'
            })
        })
    },
}