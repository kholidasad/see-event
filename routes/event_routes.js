const express = require("express")
const router = express.Router()
const { createEvent, getEvents, getEvent, updateEvent, deleteEvent, findByName} = require("../controllers/eventController")
const upload = require("../middleware/multer")

router.post("/", upload.single("image"), createEvent)
router.get("/", getEvents)
router.get("/:eventId", getEvent)
router.put("/:eventId", upload.single("image"), updateEvent)
router.delete("/:eventId", deleteEvent)
router.get('/search', findByName)

module.exports = router