const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const Auth = require('../controllers/AuthController')
const Event = require('../controllers/EventController')
const {verify} = require('../middleware/auth')

//login 
router.post('/register', Auth.register)
router.post('/login', Auth.login)

//event
router.post('/api/v1/event', verify, Event.create)
router.get('/api/v1/event', Event.index)
route.get('/api/v1/event/search', Event.search)

module.exports = router