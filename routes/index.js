const express = require('express')
const router = express.Router()
const Auth = require('./auth-route')
const Event = require('./event-routes')
const Profile = require('./profile-route')
// const Profile = require('../controllers/ProfileController')

router.use('/auth', Auth)
router.use('/event', Event)
router.use('/profile', Profile)

module.exports = router