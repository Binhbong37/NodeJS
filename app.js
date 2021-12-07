
const http = require('http')
const express = require("express")
const app = express()
// Video 60:
app.use((req, res, next) => {
    console.log('In the middleware');
    next()
})
app.use((req, res, next) => {
    console.log('In another middleware')
})
const server = http.createServer(app)

server.listen(3000)
