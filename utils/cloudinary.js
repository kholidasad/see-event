const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: "bayu-aji-pamungkas",
    api_key: "125148494366268",
    api_secret: "YuxGoRIrKpVW3L3ln0QA_bPfh2Q"
})

module.exports = cloudinary