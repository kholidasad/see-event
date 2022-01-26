require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes')
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res)=>{
    res.status(200).json({
        status : "SeeEvent app is running good",
        time : new Date().toLocaleString()
    })
})

app.use('/api/v1', router)

app.listen(port)

module.exports = app