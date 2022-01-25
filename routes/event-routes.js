const express = require("express")
const router = express.Router()
const { createEvent, getEvents, getEvent, updateEvent, deleteEvent, findByName, filterEvents} = require("../controllers/eventController")
const { postComment } = require('../controllers/CommentController')
const upload = require("../middlewares/multer")

router.post("/", upload.single("image"), createEvent)
router.get("/", getEvents)
router.get('/search', findByName)
router.get('/filter', filterEvents)
router.get("/detail/:eventId", getEvent)
router.put("/detail/:eventId", upload.single("image"), updateEvent)
router.post('/detail/:eventId', postComment)
router.delete("/:eventId", deleteEvent)

module.exports = router