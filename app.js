
const express = require("express")
const app = express()

// Luon chay
app.use('/', (req, res, next) => {
    console.log("This always runs!")
    next()
})
// Middleware 1
app.use('/add-product', (req, res, next) => {
    console.log('In another middleware');
    res.send("<h1>The Add product page</h1>")
})
// Middleware 2
app.use('/', (req, res, next) => {
    console.log('In another middleware');
    res.send("<h1>Hello from Express</h1>")
})

app.listen(3000)
