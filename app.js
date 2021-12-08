
const express = require("express")
const adminData = require("./routes/admin")
const shopRoutes = require("./routes/shop")
const app = express()
const bodyParser = require("body-parser")
const path = require("path");

app.use(bodyParser.urlencoded({extended: false}))
// Phan duoi link file CSS
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminData.router)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})
app.listen(3000)
