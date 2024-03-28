const UserFactory = require('../models/factories/membership/UserGactory.js')

class Controller {
    static registerUser (req, res) {
        const input = {
            email : req.body.email,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            password : req.body.password,
        }
 
        UserFactory.register(input, (err,data) => {
            if (err) {
                res.send(err)
            } else {
                res.status(200).json(data)
            }
        })
    }

    static loginUser (req, res) {
        const id = req.params.id
        UserFactory.login(input, (err, data) => {
            if (err) {
                res.send(err)
            } else {
                res.status(200).json(data)
            }
        })
    }
}

module.exports = Controller