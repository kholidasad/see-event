const jwt = require('jsonwebtoken')

const privateKey = process.env.SECRET || 'wakswaks'

const verify = async (req, res, next) => {
    const token = req.headers['auth']

    if(!token) {
        return res.status(401).send({
            message: 'Forbidden'
        })
    }
    
    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Token Invalid'
            })
        } 

        id = decoded
        next()
    })
},

const generate = (payload) => {
    return jwt.sign(payload, privateKey)
}

module.exports = {
    verify,
    generate
}