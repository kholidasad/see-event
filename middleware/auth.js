const User = require('../models').User
const { verifyToken } = require('../utils/jwt')

module.exports = {
    isLogin: async (req, res, next) => {
        try {
            let token = req.header("Authorization").split(' ')
            // cek token
            if (!token) {
                return res.status(401).json({
                    msg: "Please log in.",
                    status: "Unauthorized",
                })
            }
            const decoded = verifyToken(token[1], process.env.JWT_KEY)

            const user = await User.findByPk(decoded.id)
            if (!user) {
                return res.status(401).json({
                    msg: "User not found.",
                    status: "Unauthorized",
                })
            }
        
            req.id = decoded.id
            next()
        }
        catch (error) {
            res.status(500).json({
            status: "Internal server error",
            message: error.message,})
        }
    }
}
