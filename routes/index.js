const express = require('express')
const router = express.Router()
const Event = require('../controllers/EventController')

router.get('/event/search', Event.findByName)

module.exports = router