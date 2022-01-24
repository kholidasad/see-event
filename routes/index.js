const express = require('express')
const router = express.Router()
const eventRoutes = require("./event_routes")
const authRoutes = require('./auth-route')

router.use('/auth', authRoutes)
router.use("/events", eventRoutes)

module.exports = router