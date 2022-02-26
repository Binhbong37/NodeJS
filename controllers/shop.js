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
            let getResult;
            if (result.length <= 0) {
                getResult = result;
            } else {
                getResult = [
                    {
                        place: result[0].place,
                        dateNow: moment(new Date()).format('LT'),
                    },
                ];
            }

            console.log('den chua: ', getResult);
            res.render('shop/confirmCheckout', {
                path: '/add-product',
                pageTitle: 'Xác nhận kết thúc',
                status: getResult,
            });
        })
        .catch((err) => console.log('k tim dc checkIn: ', err));
};

exports.postCheckIn = (req, res, next) => {
    const place = req.body.place;
    TimeTable.findOne({ status: true })
        .then((haveCheckIn) => {
            console.log(haveCheckIn);
            if (!haveCheckIn) {
                const checkIn = new TimeTable({
                    status: true,
                    place: place,
                    staffId: req.user,
                });
                checkIn.save();
            }
        })
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
                const bc = new Date(abc.updatedAt);
                const ab = new Date(abc.createdAt);
                const sumTime = Math.abs(bc - ab) / 36e5;
                const time = (Math.round(sumTime * 100) / 100).toFixed(2);
                return {
                    workDay: moment(abc.createdAt).format('LL'),
                    startTime: moment(abc.createdAt).format('LT'),
                    endTime: moment(abc.updatedAt).format('LT'),
                    place:
                        abc.place == 1
                            ? 'Công ty'
                            : abc.place == 2
                            ? 'Ở nhà'
                            : 'Làm việc ngoài',
                    total: time,
                };
            });
            res.render('shop/thongtingiolam', {
                path: '',
                pageTitle: 'Thông tin giờ làm',
                result: result,
            });
        })
        .catch((err) => console.log('NOT GET CHECK OUT !!!'));
};

exports.postCheckOut = (req, res) => {
    TimeTable.findOne({ status: true })
        .then((result) => {
            result.status = false;

            return result.save();
        })
        .then(() => {
            console.log('GET CHECKOUT !');
            res.redirect('/check-out');
        })
        .catch((err) => console.log(err));
};

exports.getInfStaff = (req, res, next) => {
    Staff.find()
        .then((user) => {
            const staff = {
                name: user[0].name,
                doB: moment(user[0].doB).format('LL'),
                salaryScale: user[0].salaryScale,
                startDate: moment(user[0].startDate).format('LL'),
                department: user[0].department,
                annualLeave: user[0].annualLeave,
                imageUrl: user[0].imageUrl,
            };
            res.render('shop/infoStaff', {
                path: '/thong-tin-ca-nhan',
                pageTitle: 'Thông tin cá nhân',
                staff: [staff],
            });
        })
        .catch((err) => console.log('K lay dc Staff controller'));
};

exports.getEditStaff = (req, res) => {
    Staff.find().then((user) => {
        const staff = {
            name: user[0].name,
            doB: moment(user[0].doB).format('LL'),
            salaryScale: user[0].salaryScale,
            startDate: moment(user[0].startDate).format('LL'),
            department: user[0].department,
            annualLeave: user[0].annualLeave,
            imageUrl: user[0].imageUrl,
        };
        res.render('shop/editInfo', {
            path: '',
            pageTitle: 'Chỉnh sửa thông tin',
            staff: [staff],
        });
    });
};

exports.postEditStaff = (req, res) => {
    const imageUrl = req.body.imageUrl;
    const id = req.user._id;
    Staff.findById(id)
        .then((staff) => {
            staff.imageUrl = imageUrl;
            return staff.save();
        })
        .then(() => {
            console.log('ImageUrl UPDATED SUCCESS !');
            res.redirect('/thong-tin-ca-nhan');
        });
};
