const UserFactory = require('../models/factories/membership/UserFactory.js')
const { verifyToken } = require('../helpers/jwt.js')

class Authentication {
    static async userAuth (req,res, next) {
        try {
            const { access_token } = req.headers
            if (!access_token) {
                res.status(401).json({
                    "status": 108,
                    "message": "Token tidak tidak valid atau kadaluwarsa",
                    "data": null
                })
            } else {
                const decoded = verifyToken(access_token)
                req.loggedInUser = decoded
                const user = await UserFactory.checkById(decoded.id);
                if (user) {
                    next()
                } else {
                    res.status(401).json({
                        "status": 108,
                        "message": "Token tidak tidak valid atau kadaluwarsa",
                        "data": null
                    })
                }
            }        
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Authentication

