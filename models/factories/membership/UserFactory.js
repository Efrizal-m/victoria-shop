const pool = require('../../../config/connection.js')
const User = require('../../base/User.js')

class UserFactory {
    static async register(input) {
        let errors = UserFactory.validateRegistration(input)

        if (errors.length > 0) {
            throw errors
        }

        let query = `INSERT INTO "Users" ("email","first_name","last_name","password") VALUES ($1, $2, $3, $4);`
        let values = [input.email, input.first_name, input.last_name, input.password]

        await pool.query(query, values);
        return true
    }

    static async login (input) {
        let errors = UserFactory.validateLogin(input)

        if (errors.length > 0) {
            throw errors
        }
        let query = `SELECT * FROM "Users" WHERE "email" = $1 AND "password" = $2;`
        let values = [input.email, input.password]

        const data = await pool.query(query, values);
        if (data.rows.length > 0) {
            const user = new User(data.rows[0]._id, data.rows[0].email, data.rows[0].password, data.rows[0].first_name, data.rows[0].last_name, data.rows[0].profile_image)
            return user
        } else {
            return null
        }
    }

    static async checkById (id) {
        let errors = UserFactory.validateGetter(id)
        if (errors.length > 0) {
            throw errors
        }
        let query = `SELECT * FROM "Users" WHERE "_id" = $1;`
        let values = [id]

        const data = await pool.query(query, values);
        if (data.rows.length > 0) {
            return true
        } else {
            return false
        }
    }

    // validation
    static validateRegistration (input) {
        let errors = []
        if (input.email === '' || input.email.trim() === '' || input.email === undefined) {
            errors.push('Parameter email harus di isi')
        }
        if (input.first_name === '' || input.first_name.trim() === '' || input.first_name === undefined) {
            errors.push('Parameter first harus di isi')
        }
        if (input.last_name === '' || input.last_name.trim() === '' || input.last_name === undefined) {
            errors.push('Parameter last_name harus di isi')
        }
        if (input.password === '' || input.password.trim() === '' || input.password === undefined) {
            errors.push('Parameter password harus di isi')
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.email)) {
            errors.push('Paramter email tidak sesuai format')            
        }
        if (input.password.length < 8) {
            errors.push('Parameter password minimal 8 karakter')
        }

        return errors;
    }

    static validateLogin (input) {
        let errors = []
        if (input.email === '' || input.email.trim() === '' || input.email === undefined) {
            errors.push('Parameter email harus di isi')
        }
        if (input.password === '' || input.password.trim() === '' || input.password === undefined) {
            errors.push('Parameter password harus di isi')
        }    
        return errors;
    }

    static validateGetter (id) {
        let errors = []
        if (typeof(id) !== "number") {
            errors.push('id not valid at user getter')
        }    
        return errors;
    }
}

module.exports = UserFactory