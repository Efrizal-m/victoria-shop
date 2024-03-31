const ProfileFactory = require('../../models/factories/membership/ProfileFactory.js')
const { uploadToImgur } = require('../../helpers/imgur.js')

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
            const updateSuccess = await ProfileFactory.updateProfile(input)

            if (updateSuccess) {
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
            } else {
                throw { status: 500, message: 'Internal Error' }                
            }

        } catch (error) {
            next(error)
        }
    }

    static async updateProfileImage (req, res, next) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No image provided' });
            }

            const imgurResponse = await uploadToImgur(req.file.buffer);

            const imageUrl = imgurResponse.data.link;
            const input = {
                id: req.loggedInUser.id,
                profile_image: imageUrl
            }
            const updateSuccess = await ProfileFactory.updateProfileImage(input)

            if (updateSuccess) {
                const profile = await ProfileFactory.findProfile(req.loggedInUser.email)
                res.status(200).json({
                    "status": 0,
                    "message": "Update Profile Image berhasil",
                    "data": {
                        email: profile.email,
                        first_name: profile.first_name,
                        last_name: profile.last_name,
                        profile_image: profile.profile_image
                    }
                })
            } else {
                throw { status: 500, message: 'Internal Error' }                
            }
        } catch (error) {
            console.log(error)
            console.error('Error uploading image to Imgur:', error.message);
            res.status(500).json({ error: 'Failed to upload image' });
        }    }    
}

module.exports = ProfileController