const Staff = require('../models/staff');
const Manager = require('../models/manager');
const moment = require('moment');
const Methods = require('../util/salary');
const fileHelper = require('../util/file');

exports.getIndex = (req, res, next) => {
    if (req.session.staff) {
        Staff.find()
            .then((staff) => {
                let newData = [];

                let staffData = staff[0].workTimes.filter((re) => {
                    return re.status === true;
                });
                let isCheck = staff[0].managerConfirm.filter((result) => {
                    return result.isManagerCheck === true;
                });
                let isManageConfirm = false;
                if (isCheck.length > 0) {
                    isManageConfirm = isCheck[0].isManagerCheck;
                }

                if (staffData.length > 0) {
                    newData = [
                        {
                            place: staffData[0].place,
                            startTime: moment(staffData[0].startWork).format(
                                'LT'
                            ),
                            status: staffData[0].status,
                        },
                    ];
                }
                res.render('worktime/index', {
                    pageTitle: 'Điểm danh/kết thúc',
                    path: '/',
                    result: newData,
                    checkConfirm: isManageConfirm,
                    isAuthen: req.session.isLoggedInStaff,
                    isAuthen1: req.session.isLoggedInManager,
                    csrfToken: req.csrfToken(),
                });
            })
            .catch((err) => console.log(err));
    } else {
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
            isAuthen: req.session.isLoggedInStaff,
            isAuthen1: req.session.isLoggedInManager,
            csrfToken: req.csrfToken(),
        });
    }
};

exports.getConfirmCheckIn = (req, res, next) => {
    res.render('worktime/confirmName', {
        path: '/add-product',
        pageTitle: 'Xác nhận làm việc',
        active: true,
        isAuthen: req.session.isLoggedInStaff,
        isAuthen1: req.session.isLoggedInManager,
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
        isAuthen: req.session.isLoggedInStaff,
        isAuthen1: req.session.isLoggedInManager,
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
    const dayOff = Methods.getdayLeave(req.staff);
    console.log(dayOff);
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
                today = new Date(abc.startWork).getDate();
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

            res.render('worktime/ketthuclam', {
                path: '',
                pageTitle: 'Thông tin giờ làm hôm nay',
                result: result,
                totalTime: dayOff + Math.round(totalTime * 100) / 100,
                annualLeave: dayOff,
                isAuthen: req.session.isLoggedInStaff,
                isAuthen1: req.session.isLoggedInManager,
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
            res.redirect('/check-out');
        })
        .catch((err) => console.log(err));
};

exports.getInfStaff = (req, res, next) => {
    const staff = {
        name: req.staff.name,
        doB: moment(req.staff.doB).format('LL'),
        salaryScale: req.staff.salaryScale,
        startDate: moment(req.staff.startDate).format('LL'),
        department: req.staff.department,
        annualLeave: req.staff.annualLeave,
        imageUrl: req.staff.imageUrl,
    };
    res.render('shop/infoStaff', {
        path: '/thong-tin-ca-nhan',
        pageTitle: 'Thông tin cá nhân',
        staff: [staff],
        isAuthen: req.session.isLoggedInStaff,
        isAuthen1: req.session.isLoggedInManager,
    });
};

exports.getEditStaff = (req, res) => {
    const staff = {
        name: req.staff.name,
        doB: moment(req.staff.doB).format('LL'),
        salaryScale: req.staff.salaryScale,
        startDate: moment(req.staff.startDate).format('LL'),
        department: req.staff.department,
        annualLeave: req.staff.annualLeave,
        imageUrl: req.staff.imageUrl,
    };
    res.render('shop/editInfo', {
        path: '',
        pageTitle: 'Chỉnh sửa thông tin',
        staff: [staff],
        isAuthen: req.session.isLoggedInStaff,
        isAuthen1: req.session.isLoggedInManager,
    });
};

exports.postEditStaff = (req, res) => {
    const image = req.file;
    const id = req.staff._id;
    if (req.session.staff) {
        Staff.findById(id)
            .then((staff) => {
                if (image) {
                    fileHelper.deleteFile(staff.imageUrl);
                    staff.imageUrl = image.path;
                }
                return staff.save();
            })
            .then(() => {
                console.log('ImageUrl UPDATED SUCCESS !');
                res.redirect('/thong-tin-ca-nhan');
            });
    } else {
        Manager.findById(id)
            .then((staff) => {
                if (image) {
                    fileHelper.deleteFile(staff.imageUrl);
                    staff.imageUrl = image.path;
                }
                return staff.save();
            })
            .then(() => {
                console.log('ImageUrl UPDATED SUCCESS !');
                res.redirect('/thong-tin-ca-nhan');
            });
    }
};
