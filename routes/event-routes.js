const express = require("express")
const router = express.Router()
const { createEvent, getEvents, getEvent, updateEvent, deleteEvent, findByName, filterEvents} = require("../controllers/eventController")
const { postComment } = require('../controllers/CommentController')
const upload = require("../middleware/multer")
const { isLogin } = require('../middleware/auth')

router.post("/", isLogin, upload.single("image"), createEvent)
router.get("/", getEvents)
router.get('/search', findByName)
router.get('/filter', filterEvents)
router.get("/detail/:eventId", getEvent)
router.put("/detail/:eventId", isLogin, upload.single("image"), updateEvent)
router.post('/detail/:eventId', isLogin, postComment)
router.delete("/:eventId", isLogin, deleteEvent)

module.exports = router