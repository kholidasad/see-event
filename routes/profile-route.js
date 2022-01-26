const express = require('express')
const router = express.Router()
const Profile = require('../controllers/ProfileController')
const { isLogin } = require('../middleware/auth')

router.post('/bookmark/:eventId', isLogin, Profile.postBookmark)
router.post('/unbookmark/:eventId', isLogin, Profile.removeBookmark)

module.exports = router