const { Pool } = require('pg')

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'vs4',
    password:'postgres',
    port:5432,
})

module.exports = pool