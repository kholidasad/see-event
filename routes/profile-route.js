const express = require('express')
const router = express.Router()
const Profile = require('../controllers/ProfileController')
const { isLogin } = require('../middleware/auth')

router.post('/', isLogin, Profile.updateProfile)
router.post('/photo', isLogin, Profile.deletePhotoProfile)
router.post('/bookmark/:eventId', isLogin, Profile.postBookmark)
router.post('/unbookmark/:eventId', isLogin, Profile.removeBookmark)

module.exports = router