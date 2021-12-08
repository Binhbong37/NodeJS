
const express = require("express")
const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")
const app = express()

// Use EJS

app.set('view engine', 'ejs')
app.set('views', 'views')

// import file tu controller
const errorController = require("./controllers/error")
const bodyParser = require("body-parser")
const path = require("path");

app.use(bodyParser.urlencoded({extended: false}))
// Phan duoi link file CSS
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)
app.listen(3000)
