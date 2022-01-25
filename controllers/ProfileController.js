const Bookmark = require('../models').Bookmark

module.exports = {
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