const express = require('express')
const router = express.Router()
const Event = require('../controllers/EventController')
const Profile = require('../controllers/ProfileController')

router.get('/event/search', Event.findByName)
router.post('/event/bookmark/:eventId', Profile.postBookmark)
router.delete('/event/bookmark/:eventId', Profile.removeBookmark)

module.exports = router