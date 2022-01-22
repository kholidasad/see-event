const multer = require('multer')
const path = require('path')
const cloudinary = require('../config/cloudinary')
const { CloudinaryStorage } = require("multer-storage-cloudinary")

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    folder: 'mini-project',
      format: async (req, file) => 'png', // supports promises as well,
    },
});


module.exports = multer({ storage: storage});
