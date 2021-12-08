
const express = require("express")
const adminData = require("./routes/admin")
const shopRoutes = require("./routes/shop")
const app = express()

app.set('view engine', 'pug')
app.set('views', 'views')

const bodyParser = require("body-parser")
const path = require("path");

app.use(bodyParser.urlencoded({extended: false}))
// Phan duoi link file CSS
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin',adminData.router)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: "Not Found"})
})
app.listen(3000)
