const jwt = require('jsonwebtoken')
const env = require('../config/env.js')

function generateToken(payload) {
    return jwt.sign(payload, env.jwt_secret, {
        expiresIn: env.expires,
      })
}

function verifyToken (token) {
    return jwt.verify(token, env.jwt_secret)
}

module.exports = {
    generateToken, verifyToken
}