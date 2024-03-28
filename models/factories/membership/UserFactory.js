const pool = require('../config/connection.js')

const User = require('../../base/User.js')

class UserFactory {
    static register(input, cb) {
        let errors = UserFactory.validate(input)

        if (errors.length > 0) cb(errors)
        else {
            let query = `INSERT INTO "Users" ("email","first_name","last_name","password") VALUES ($1, $2, $3, $4);`
            let values = [input.email, input.first_name, input.last_name, input.password]

            pool.query(query, values)
                .then(res => { cb(null, true) })
                .catch(err => { cb(err, null) })
        }
    }

    static login (input, cb) {
        pool.query(`SELECT * FROM "Users" WHERE "email" = ${input.email} AND "password" = ${input.password} `)
            .then(res => {
                const data = res.rows
                const student = new User(data[0].id, data[0].email, data[0].password, data[0].first_name, data[0].last_name, data[0].profile_image)
                cb(null, student)
            })
            .catch(err => { cb(err, null) })
    }

}

module.exports = UserFactory