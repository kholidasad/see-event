const { User } = require('../models')
const { verifyToken } = require('../utils/jwt')

module.exports = {
    isLogin: async (req, res, next) => {
        try {
            let token = req.header("Authorization").replace("Bearer ","")
            // cek token
            if (!token) {
                return res.status(401).json({
                    msg: "Please log in.",
                    status: "Unauthorized",
                })
            }
            const decoded = verifyToken(token, process.env.JWT_KEY)

            const user = await User.findByPk(decoded.id)
            if (!user) {
                return res.status(401).json({
                    msg: "User not found.",
                    status: "Unauthorized",
                })
            }

            // res.status(200).json({
            //     msg: "Successfully logged in.",
            //     status: "Success",
            // })
            
            req.id = decoded.id
            next()
        }
        catch (error) {
            res.status(401).json({
            status: "Unauthorized",
            message: "Please log in.",})
        }
    }
}