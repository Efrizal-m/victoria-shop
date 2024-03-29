const UserFactory = require('../../models/factories/membership/UserFactory.js')
const pool = require('../../config/connection.js');
const { generateToken } = require('../../helpers/jwt.js')

class Controller {
    static async registerUser (req, res, next) {
        try {
            const input = {
                email : req.body.email,
                first_name : req.body.first_name,
                last_name : req.body.last_name,
                password : req.body.password,
            }
            await UserFactory.register(input);
            res.status(200).json({
                "status": 0,
                "message": "Registrasi berhasil silahkan login",
                "data": null
            })
        } catch (error) {
            next(error)
        } finally {
            pool.end()
        }
    }

    static async loginUser (req, res, next) {
        try {
            const input = {
                email : req.body.email,
                password : req.body.password,
            }
            const user = await UserFactory.login(input);
            if (user) {
                const access_token = generateToken({id: user._id, email: user.email})
                res.status(200).json({
                    "status": 0,
                    "message": "Login Sukses",
                    "data": access_token
                })                
            } else {
                res.status(401).json({
                    "status": 103,
                    "message": "Username atau password salah",
                    "data": null
                })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller