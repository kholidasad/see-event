const express = require("express");
const router = express.Router();
const passport = require('passport')
const { register, login } = require("../controllers/AuthController");
const {generateToken} = require('../utils/jwt')
require('../middleware/passport')

router.post("/register", register);
router.post("/login", login);

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile'],
    session: false
}))


router.get('/google/callback', passport.authenticate(
    'google', 
    {
        failureRedirect: '/',
        session: false
    }),
    function (req, res) {
        res.redirect("/api/v1/event?token=" + generateToken({
            id: req.user[0].id,
            photo: req.user[0].photo,
            firstName: req.user[0].firstName,
            lastName: req.user[0].lastName
        }))
    }
)

module.exports = router;
