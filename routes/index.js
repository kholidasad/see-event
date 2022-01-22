const express = require('express')
const router = express.Router()
const Auth = require('../controllers/AuthController')
const Event = require('../controllers/EventController')
const Comment = require('../controllers/CommentController')
const {isLogin} = require('../middleware/auth')
const upload = require("../middleware/multer")

router.post('/register', Auth.register)
router.post('/login', Auth.login)

router.post('/event', isLogin, upload.single("image"), Event.createEvent)
router.get('/event', Event.getEvents)
router.get('/event/detail/:eventId', Event.getEvent)
router.put('/event/detail/:eventId', isLogin, upload.single("image"), Event.updateEvent)
router.delete('/event/:eventId', isLogin, Event.deleteEvent)
router.get('/event/search', Event.findByName)
router.get("/event/filter", Event.filter)

router.post('/event/detail/:eventId', isLogin, Comment.postComment)

// router.post()

module.exports = router