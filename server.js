const http = require('http');
const app = require('./app')
const env = require('./config/env')

const PORT = env.port

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log('server listening on port',PORT)
})
