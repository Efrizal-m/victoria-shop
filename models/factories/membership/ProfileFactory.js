const pool = require('../../../config/connection.js')
const User = require('../../base/User.js')

class UserFactory {
    static async getProfile (email) {
        let errors = UserFactory.validateEmail(email)

        if (errors.length > 0) {
            throw errors
        }
        let query = `SELECT * FROM "Users" WHERE "email" = $1;`
        let values = [email]

        const data = await pool.query(query, values);
        if (data.rows.length > 0) {
            const user = new User(data.rows[0]._id, data.rows[0].email, data.rows[0].password, data.rows[0].first_name, data.rows[0].last_name, data.rows[0].profile_image)
            return user
        } else {
            return null
        }
    }

    static async updateProfile (input) {
        let errors = UserFactory.validate_u(input)

        if (errors.length > 0) {
            throw errors
        }
        let query = `UPDATE "Users"
        SET
            "first_name" = $1,
            "last_name" = $2
        WHERE 
            "_id" = $3;`
        let values = [input.first_name, input.last_name, input.id]
        const data = await pool.query(query, values);
        if (data.rowCount > 0) {
            return true
        } else {
            return false
        }
    }


    static validateEmail (email) {
        let errors = []
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Paramter email tidak sesuai format')            
        }
        return errors;
    }

    static validate_u (input) {
        let errors = []
        if (input.first_name === '' || input.first_name.trim() === '' || input.first_name === undefined) {
            errors.push('Parameter first_name harus di isi')
        }
        if (input.last_name === '' || input.last_name.trim() === '' || input.last_name === undefined) {
            errors.push('Parameter last_name harus di isi')
        }
        if (typeof(input.id) !== "number") {
            errors.push('id not valid at user getter')
        }
        return errors;
    }

}

module.exports = UserFactory