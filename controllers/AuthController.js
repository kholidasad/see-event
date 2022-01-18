const User = require('../models').User
const bcrypt = require('bcrypt')
const {generate} = require('../middleware/auth')

module.exports = {
    async register(req, res) {
        await User.findOne({ 'email' : req.body.email }).then(async data => {
            if (data == 0) {
                const hashedPass = await bcrypt.hash(req.body.password, 10)
                return User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashedPass,
                    photo: 'waks'
                })
                .then((hasil) => res.status(200).send({
                    status: 200,
                    message: 'Register Success',
                    result: hasil,
                    token: generate({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                    })
                }))
                .catch((err) => res.status(500).send({
                    status: 500,
                    message: 'Internal Server Error!'
                }))
            } else {
                return res.status(400).send({
                    status: 400,
                    message: 'Email already exist!'
                })
            }
        })
    },

    async login (req, res) {
        const samePassword = await bcrypt.compareSync(req.body.password, findEmail.password)
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((data) => {
            if (!data || !samePassword) {
                return res.status(400).send({
                    error: 'ERRROR',
                    status: 400,
                    message: 'Email and Password mismatch!'
                })
            } 

            res.status(200).send({
                status: 200,
                message: 'Login Success!',
                token: generate({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                })
            })
        })
        .catch(err => {
            res.status(500).send({
                status: 500,
                message: 'Internal Server Error!'
            })
        })
    }
}