const express = require('express')
const app = express()
const router = require('./routes')
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(router)

app.listen(port, () => {
    console.log(`Server Listen on Port: ${port}`);
})