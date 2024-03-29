const { Pool } = require('pg')
const env = require('../config/env.js')

const pool = new Pool({
    user: env.user,
    host:env.host,
    database:env.database,
    password:env.password,
    port:env.dbport,
})

module.exports = pool