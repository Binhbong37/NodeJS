const TimeTable = require('../models/timeTable');
const Staff = require('../models/staff');
const moment = require('moment');

exports.getIndex = (req, res, next) => {
    Staff.findOne()
        .then((result) => {
            console.log(result.workTime);
            let resultStaff = [];
            if (result.length > 0) {
                resultStaff = result[0].workTime;
            }

            resultStaff = resultStaff.filter((st) => {
                return st.status === true;
            });
            return resultStaff;
        })
        .then((result1) => {
            result1 = result1.map((abc) => {
                return {
                    startTime: moment(abc.startWork).format('LT'),
                    place:
                        abc.place === '1'
                            ? 'Công ty'
                            : abc.place === '2'
                            ? 'Ở nhà'
                            : 'KH',
                    status: abc.status,
                };
            });
            res.render('worktime/index', {
                pageTitle: 'Điểm danh/kết thúc',
                path: '/',
                result: result1,
            });
        })
        .catch((err) => console.log('K tim dc nguoi dung: ', err));
};

exports.getConfirmCheckIn = (req, res, next) => {
    res.render('worktime/confirmName', {
        path: '/add-product',
        pageTitle: 'Xác nhận làm việc',
        active: true,
    });
};

exports.getConfirmCheckOut = (req, res, next) => {
    Staff.find()
        .then((result) => {
            let resultStaff = [result[0].workTime[0]];
            resultStaff = resultStaff.filter((st) => {
                return st.status === true;
            });
            return resultStaff;
        })
        .then((result) => {
            console.log(result);
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
            res.render('worktime/confirmCheckout', {
                path: '/add-product',
                pageTitle: 'Xác nhận kết thúc',
                status: getResult,
            });
        })
        .catch((err) => console.log('k tim dc checkIn: ', err));
};

exports.postCheckIn = (req, res, next) => {
    const place = req.body.place;
    const newStart = {
        place,
        status: true,
        startWork: new Date(),
    };
    console.log(place);
    req.staff
        .addCheckIn(newStart)
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => console.log(err));
};

exports.getCheckout = (req, res) => {
    TimeTable.find()
        .then((result) => {
            result = result.filter((res) => {
                const today = moment(new Date()).format('MMM Do YY');
                const checkToday = moment(res.createdAt).format('MMM Do YY');
                return today === checkToday;
            });
            return result;
        })
        .then((result) => {
            let totalTime = 0;
            result = result.map((abc) => {
                const bc = new Date(abc.updatedAt);
                const ab = new Date(abc.createdAt);
                const sumTime = Math.abs(bc - ab) / 36e5;
                const time = (Math.round(sumTime * 100) / 100).toFixed(2);
                const timeTotal = parseFloat(time);
                totalTime += timeTotal;
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
            res.render('worktime/ketthuclam', {
                path: '',
                pageTitle: 'Thông tin giờ làm hôm nay',
                result: result,
                totalTime: Math.round(totalTime * 100) / 100,
            });
        })
        .catch((err) => console.log('NOT GET CHECK OUT !!!'));
};

exports.postCheckOut = (req, res) => {
    const newEndWork = {
        status: false,
        endWordk: new Date(),
    };
    req.staff
        .addCheckOut(newEndWork)
        .then((re) => {
            console.log('Post CHECKOUT !');
            // res.redirect('/check-out');
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
            _id: req.staff._id,
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
