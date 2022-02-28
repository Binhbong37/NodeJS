const TimeTable = require('../models/timeTable');
const Staff = require('../models/staff');
const moment = require('moment');

exports.getIndex = (req, res, next) => {
    const result = req.staff.workTimes.filter((re) => {
        return re.status === true;
    });
    let newData = [];
    if (result.length > 0) {
        newData = [
            {
                place: result[0].place,
                startTime: moment(result[0].startWork).format('LT'),
                status: result[0].status,
            },
        ];
    }

    res.render('worktime/index', {
        pageTitle: 'Điểm danh/kết thúc',
        path: '/',
        result: newData,
    });
};

exports.getConfirmCheckIn = (req, res, next) => {
    res.render('worktime/confirmName', {
        path: '/add-product',
        pageTitle: 'Xác nhận làm việc',
        active: true,
    });
};

exports.getConfirmCheckOut = (req, res, next) => {
    const result = req.staff.workTimes.filter((re) => {
        return re.status === true;
    });
    const timeNow = moment().format('LT');

    console.log('den chua: ', result[0], timeNow);
    res.render('worktime/confirmCheckout', {
        path: '/add-product',
        pageTitle: 'Xác nhận kết thúc',
        status: result,
        dateNow: timeNow,
    });
};

exports.postCheckIn = (req, res, next) => {
    const place = req.body.place;
    const newStart = {
        place,
        status: true,
        startWork: new Date(),
        endWork: null,
    };
    req.staff
        .addCheckIn(newStart)
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => console.log(err));
};

exports.getCheckout = (req, res) => {
    Staff.find()
        .then((result) => {
            result = result[0].workTimes.filter((re) => {
                const today = moment(new Date()).format('MMM Do YY');
                const checkToday = moment(re.startWork).format('MMM Do YY');
                return today === checkToday && re.status === false;
            });
            return result;
        })
        .then((result) => {
            let totalTime = 0;
            result = result.map((abc) => {
                const bc = new Date(abc.endWork);
                const ab = new Date(abc.startWork);
                const sumTime = Math.abs(bc - ab) / 36e5;
                const time = (Math.round(sumTime * 100) / 100).toFixed(2);
                const timeTotal = parseFloat(time);
                totalTime += timeTotal;
                return {
                    workDay: moment(abc.startWork).format('LL'),
                    startTime: moment(abc.startWork).format('LT'),
                    endTime: moment(abc.endWork).format('LT'),
                    place:
                        abc.place == 1
                            ? 'Công ty'
                            : abc.place == 2
                            ? 'Ở nhà'
                            : 'Làm việc ngoài',
                    total: time,
                };
            });
            console.log('getCheckout1: ', result);
            res.render('worktime/ketthuclam', {
                path: '',
                pageTitle: 'Thông tin giờ làm hôm nay',
                result: result,
                totalTime: Math.round(totalTime * 100) / 100,
            });
        })
        .catch((err) => console.log(err));
};

exports.postCheckOut = (req, res) => {
    const newEndWork = {
        status: false,
        endWork: new Date(),
    };
    req.staff
        .addCheckOut(newEndWork)
        .then((re) => {
            console.log('Post CHECKOUT !');
            res.redirect('/');
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
    const id = req.staff._id;
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
