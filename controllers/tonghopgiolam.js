const Staff = require('../models/staff');
const moment = require('moment');
const Methods = require('../util/salary');

exports.getTongHopGioLam = (req, res, next) => {
    const salary = Methods.getSalary(req.body.month, req.staff);
    Staff.find()
        .then((result) => {
            const result1 = result[0].workTimes.filter((re) => {
                return re.status === false;
            });
            return result1;
        })
        .then((result) => {
            result = result.map((inf) => {
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
        });
};

exports.getTongHop = (req, res) => {
    const checkQ = req.query.nv;
    const salary = Methods.getSalary(req.body.month, req.staff);
    Staff.find()
        .then((result) => {
            const result1 = result[0].workTimes.filter((re) => {
                return re.status === false;
            });
            return result1;
        })
        .then((result) => {
            result = result.map((inf) => {
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
            res.render('shop/cart', {
                path: '/tong-hop-gio-lam',
                pageTitle: 'Tra cứu thông tin giờ làm',
                inf: result,
                user: req.staff,
                salary: salary,
                checkStaff: checkQ,
                isAuthen: req.session.isLoggedInStaff,
                isAuthen1: req.session.isLoggedInManager,
            });
        });
};

exports.postManager = (req, res) => {
    res.redirect('/');
};
