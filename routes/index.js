const express = require('express')
const router = express.Router()
const Auth = require('./auth-route')
const Event = require('../controllers/EventController')
const Profile = require('../controllers/ProfileController')

router.use('/auth', Auth)
router.use('/event', Event)
router.use('/profile', Profile)
router.get('/event/search', Event.findByName)
router.post('/event/bookmark/:eventId', Profile.postBookmark)
router.delete('/event/bookmark/:eventId', Profile.removeBookmark)

module.exports = router