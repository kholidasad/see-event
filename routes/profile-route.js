const express = require('express')
const router = express.Router()
const Profile = require('../controllers/ProfileController')
const upload = require('../middleware/multer')
const { isLogin } = require('../middleware/auth')

router.get('/', isLogin, Profile.getProfile)
router.post('/', isLogin, upload.single('photo'), Profile.updateProfile)
router.post('/photo', isLogin, Profile.deletePhotoProfile)
router.post('/bookmark/:eventId', isLogin, Profile.postBookmark)
router.post('/unbookmark/:eventId', isLogin, Profile.removeBookmark)

module.exports = router