const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const mongoConnect = require("./util/database").mongoConnect
const User = require("./models/users")

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const req = require('express/lib/request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("61b73ef7dd71a5b42373662e")
    .then(user => {
        req.user = new User(user.name, user.email, user.cart, user._id)
        next()
    })
    .catch(err => console.log("Loi tai USER tai file app"))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000)
})