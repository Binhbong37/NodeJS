const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', 'views');

const errorController = require('./controllers/error');

const shopRoutes = require('./routes/shop');
const onLeaveRoutes = require('./routes/onLeave');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     User.findById('61bfeb4a3116f15c65cc7cee')
//         .then((user) => {
//             req.user = user;
//             next();
//         })
//         .catch((err) => console.log('k tim dc id nguoi dung'));
// });

app.use(shopRoutes);
app.use(onLeaveRoutes);

app.use(errorController.get404);

const MONGODB_URI = 'mongodb://localhost:27017/funix_njs_asm';

mongoose
    .connect(MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        console.log('Ket noi voi MONGOOSE ASM !!!');
        app.listen(3737);
    })
    .catch((err) => {
        console.log('Lỗi kết nối với Mongoose', err);
    });
