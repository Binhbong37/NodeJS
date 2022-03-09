const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const app = express();
const MONGODB_URI = 'mongodb://localhost:27017/funix_njs_asm';
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions',
});

const csrfProtection = csrf();
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, Math.random() + '-' + file.originalname);
    },
});
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', 'views');

const errorController = require('./controllers/error');

const Staff = require('./models/staff');
const Manager = require('./models/manager');

const shopRoutes = require('./routes/shop');
const onLeaveRoutes = require('./routes/onLeave');
const gioLamRoutes = require('./routes/tonghopgiolam');
const covidRoutes = require('./routes/covid');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);
app.use(csrfProtection);

app.use((req, res, next) => {
    if (!req.session.staff && !req.session.manager) {
        return next();
    } else if (req.session.staff) {
        Staff.findById(req.session.staff._id)
            .then((user) => {
                req.staff = user;
                next();
            })
            .catch((err) => console.log('k tim dc id nguoi dung'));
    } else {
        Manager.findById(req.session.manager)
            .then((manager) => {
                req.staff = manager;
                next();
            })
            .catch((err) => console.log(err));
    }
});

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(shopRoutes);
app.use(onLeaveRoutes);
app.use(gioLamRoutes);
app.use(covidRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
    .connect(MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then((result) => {
        Staff.findOne().then((user) => {
            if (!user) {
                const newUser = new Staff({
                    name: 'Hoang Van Binh',
                    doB: '1996-06-17',
                    salaryScale: 3,
                    startDate: '2022-02-20',
                    department: 'IT',
                    annualLeave: 12,
                    imageUrl:
                        'https://st.quantrimang.com/photos/image/2021/08/27/hinh-anh-cam-on-4.jpg',
                    workTimes: [],
                    onLeave: [],
                    covidInfo: {
                        thong_tin_than_nhiet: [],
                        thong_tin_vacxin: [],
                        thong_tin_mac_covid: [],
                    },
                    managerId: '622329d619a7ff40e036bfd7',
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
