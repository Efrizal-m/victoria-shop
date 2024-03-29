const ProfileFactory = require('../../models/factories/membership/ProfileFactory.js')

class ProfileController {
    static async getUserProfile (req, res, next) {
        try {
            const userEmail = req.loggedInUser.email
            const profile = await ProfileFactory.findProfile(userEmail)
            res.status(200).json({
                "status": 0,
                "message": "Sukses",
                "data": {
                    email: profile.email,
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                    profile_image: profile.profile_image
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateProfile (req, res, next) {
        try {
            const input = {
                first_name : req.body.first_name,
                last_name : req.body.last_name,
            }
            input.id = req.loggedInUser.id
            await ProfileFactory.updateProfile(input)

            const profile = await ProfileFactory.findProfile(req.loggedInUser.email)
            res.status(200).json({
                "status": 0,
                "message": "Sukses",
                "data": {
                    email: profile.email,
                    first_name: profile.first_name,
                    last_name: profile.last_name,
                    profile_image: profile.profile_image
                }
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateProfileImage (req, res, next) {
        try {
        } catch (error) {
            next(error)
        }
    }    
}

module.exports = ProfileController