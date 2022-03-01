const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', 'views');

const errorController = require('./controllers/error');

const Staff = require('./models/staff');

const shopRoutes = require('./routes/shop');
const onLeaveRoutes = require('./routes/onLeave');
const gioLamRoutes = require('./routes/tonghopgiolam');
const covidRoutes = require('./routes/covid');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    Staff.findById('621d8b049463382dd4afc36c')
        .then((user) => {
            req.staff = user;
            next();
        })
        .catch((err) => console.log('k tim dc id nguoi dung'));
});

app.use(shopRoutes);
app.use(onLeaveRoutes);
app.use(gioLamRoutes);
app.use(covidRoutes);

app.use(errorController.get404);

const MONGODB_URI = 'mongodb://localhost:27017/funix_njs_asm';

mongoose
    .connect(MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then((result) => {
        Staff.findOne().then((user) => {
            if (!user) {
                const newUser = new Staff({
                    name: 'Nguyễn văn A',
                    doB: '2001-10-21',
                    salaryScale: 3,
                    startDate: '2022-01-20',
                    department: 'IT',
                    annualLeave: 12,
                    imageUrl:
                        'https://scontent-sin6-4.xx.fbcdn.net/v/t1.6435-9/118581074_364340657905109_6856843790228428460_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=aqjb3DlZp_IAX9d71mN&tn=FZVDBoNex-r8p6Mb&_nc_ht=scontent-sin6-4.xx&oh=00_AT8257eV1XFdR1rL-H7bcFJs-Np6123TQ2cRuSTqefP5tg&oe=61F8CBB4',
                    workTimes: [],
                    onLeave: [],
                });
                newUser.save();
            }
        });
    })
    .then(() => {
        console.log('Ket noi voi MONGOOSE ASM !!!');
        app.listen(3737);
    })
    .catch((err) => {
        console.log('Lỗi kết nối với Mongoose', err);
    });
