const TimeTable = require('../models/timeTable');
const Staff = require('../models/staff');
const moment = require('moment');

exports.getIndex = (req, res, next) => {
    TimeTable.find()
        .then((result) => {
            result = result.map((abc) => {
                return {
                    startTime: moment(abc.createdAt).format('LT'),
                    place: abc.place,
                    status: abc.status,
                    id: abc._id,
                };
            });
            res.render('shop/index', {
                pageTitle: 'Điểm danh/kết thúc',
                path: '/',
                result: result,
            });
        })
        .catch((err) => console.log('K tim dc nguoi dung'));
};

exports.getConfirmCheckIn = (req, res, next) => {
    res.render('shop/confirmName', {
        path: '/add-product',
        pageTitle: 'Xác nhận làm việc',
        active: true,
    });
};

exports.getConfirmCheckOut = (req, res, next) => {
    TimeTable.find({ status: true })
        .then((result) => {
            res.render('shop/confirmName', {
                path: '/add-product',
                pageTitle: 'Xác nhận kết thúc',
                active: false,
                status: result[0],
            });
        })
        .catch((err) => console.log('k tim dc checkIn'));
};

exports.postCheckIn = (req, res, next) => {
    const place = req.body.place;
    const checkIn = new TimeTable({
        status: true,
        place: place,
        staffId: req.user,
    });

    checkIn
        .save()
        .then(() => {
            console.log('tao dc checkIn');
            res.redirect('/');
        })
        .catch((err) => console.log('Tao checkIn that bai'));
};

exports.getCheckout = (req, res) => {
    TimeTable.find()
        .then((result) => {
            result = result.map((abc) => {
                return {
                    startTime: moment(abc.createdAt).format('LT'),
                    endTime: moment(abc.updatedAt).format('LT'),
                    place: abc.place,
                    total:
                        parseInt(moment(abc.updatedAt).format('LT')) -
                        parseInt(moment(abc.createdAt).format('LT')),
                };
            });
            res.render('shop/thongtingiolam', {
                path: '/thong-tin-gio-lam',
                pageTitle: ' thông tin giờ làm',
                result: result,
            });
        })
        .catch((err) => console.log('NOT GET CHECK OUT !!!'));
};

exports.postCheckOut = (req, res) => {
    const id = req.body.idCh;
    const status = false;
    TimeTable.findById(id)
        .then((result) => {
            result.status = status;

            return result.save();
        })
        .then(() => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/check-out');
        })
        .catch((err) => console.log(err));
};

exports.getInfStaff = (req, res, next) => {
    Staff.find()
        .then((user) => {
            console.log(user);
            res.render('shop/infoStaff', {
                path: '/thong-tin-ca-nhan',
                pageTitle: 'Thông tin cá nhân',
                staff: user,
            });
        })
        .catch((err) => console.log('K lay dc Staff controller'));
};
// exports.getCart = (req, res, next) => {

//       res.render('shop/cart', {
//         path: '/thong-tin-gio-lam',
//         pageTitle: 'Tra cứu thông tin giờ làm',
//       });
// };

// exports.getOrders = (req, res, next) => {
//       res.render('shop/orders', {
//         path: '/thong-tin-covid',
//         pageTitle: 'Thông tin Covid',
//       });

// };
