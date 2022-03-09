const Staff = require('../models/staff');
const moment = require('moment');
const Methods = require('../util/salary');

exports.getTongHopGioLam = (req, res, next) => {
    if (req.session.staff) {
        Staff.find()
            .populate('managerId')
            // .execPopulate()
            .then((staff) => {
                const idAdmin = staff[0].managerId._id;
                const nameAdmin = staff[0].managerId.name;
                const result1 = staff[0].workTimes.filter((re) => {
                    return re.status === false;
                });
                return { idAdmin, nameAdmin, result1 };
            })
            .then((result) => {
                const salary1 = Methods.getSalary(req.body.month, req.staff);
                const salary = Math.round(salary1 * 100) / 100;
                const result2 = result.result1.map((inf) => {
                    const overTime = (inf.endWork - inf.startWork) / 36e5;
                    let timeOver = 0;
                    if (overTime > 8) {
                        timeOver = overTime - 8;
                    }
                    return {
                        dayWork: moment(inf.startWork).format('ll'),
                        startDate: moment(inf.startWork).format('lll'),
                        endDate: moment(inf.endWork).format('lll'),
                        overTime: Math.round(timeOver * 100) / 100,
                        place:
                            inf.place === '1'
                                ? 'Công ty'
                                : inf.place === '2'
                                ? 'Ở nhà'
                                : 'KH',
                    };
                });
                const check = req.query.row;
                if (check === '2') {
                    result2.splice('2');
                } else if (check === '4') {
                    result2.splice('4');
                }
                res.render('shop/tonghopgiolam', {
                    path: '/thong-tin-gio-lam',
                    pageTitle: 'Tra cứu thông tin giờ làm',
                    inf: result2,
                    user: req.staff,
                    salary: salary,
                    nameAdmin: result.nameAdmin,
                    idAdmin: result.idAdmin,
                    isAuthen: req.session.isLoggedInStaff,
                    isAuthen1: req.session.isLoggedInManager,
                });
            })
            .catch((err) => console.log(err));
    } else {
        const salary = Methods.getSalary(req.body.month, req.staff);
        const result1 = req.staff.workTimes.filter((re) => {
            return re.status === false;
        });

        const result = result1.map((inf) => {
            const overTime = (inf.endWork - inf.startWork) / 36e5;
            let timeOver = 0;
            if (overTime > 8) {
                timeOver = overTime - 8;
            }
            return {
                dayWork: moment(inf.startWork).format('ll'),
                startDate: moment(inf.startWork).format('lll'),
                endDate: moment(inf.endWork).format('lll'),
                overTime: Math.round(timeOver * 100) / 100,
                place:
                    inf.place === '1'
                        ? 'Công ty'
                        : inf.place === '2'
                        ? 'Ở nhà'
                        : 'KH',
            };
        });
        res.render('shop/tonghopgiolam', {
            path: '/thong-tin-gio-lam',
            pageTitle: 'Tra cứu thông tin giờ làm',
            inf: result,
            user: req.staff,
            salary: salary,
            isAuthen: req.session.isLoggedInStaff,
            isAuthen1: req.session.isLoggedInManager,
        });
    }
};

exports.getTongHop = (req, res) => {
    const checkQ = req.query.nv;

    Staff.find()
        .then((result) => {
            const result1 = result[0].workTimes.filter((re) => {
                return re.status === false && re.softDelete === false;
            });
            let dayLeave = 0;
            const result2 = result[0].onLeave.forEach((re) => {
                dayLeave += re.hourOff;
                return re;
            });
            return {
                result1,
                name: result[0].name,
                _id: result[0]._id,
                dayLeave: dayLeave,
            };
        })
        .then((result) => {
            let result2 = result.result1.map((inf) => {
                const overTime = (inf.endWork - inf.startWork) / 36e5;
                let timeOver = 0;
                if (overTime > 8) {
                    timeOver = overTime - 8;
                }
                return {
                    _id: inf._id,
                    dayWork: moment(inf.startWork).format('ll'),
                    startDate: moment(inf.startWork).format('lll'),
                    endDate: moment(inf.endWork).format('lll'),
                    overTime: Math.round(timeOver * 100) / 100,
                    place:
                        inf.place === '1'
                            ? 'Công ty'
                            : inf.place === '2'
                            ? 'Ở nhà'
                            : 'KH',
                };
            });
            res.render('shop/cart', {
                path: '/tong-hop-gio-lam',
                pageTitle: 'Tra cứu thông tin giờ làm',
                inf: result2,
                name: result.name,
                staffId: result._id,
                dayLeave: result.dayLeave,
                checkStaff: checkQ,
                isAuthen: req.session.isLoggedInStaff,
                isAuthen1: req.session.isLoggedInManager,
            });
        });
};

exports.postDeleteWorkTime = (req, res) => {
    const workTimeId = req.body.workTimeId;
    Staff.updateOne(
        { 'workTimes._id': workTimeId },
        {
            $set: { 'workTimes.$.softDelete': true },
        }
    )
        .then((result) => {
            console.log('Set softDelete: true');
            res.redirect('/tong-hop-gio-lam/?nv=true');
        })
        .catch((err) => console.log(err));
};

exports.postDeleteWorkTimes = (req, res) => {
    console.log('Xoa tu DB');
    res.redirect('/');
};
