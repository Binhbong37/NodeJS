const Staff = require('../models/staff');
const moment = require('moment');

exports.getTongHopGioLam = (req, res, next) => {
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
            });
        });
};

exports.getOnleave = (req, res) => {
    res.render('shop/tonghopgiolam', {
        path: '/thong-tin-gio-lam',
        pageTitle: 'Tra cứu thông tin giờ làm',
        inff: 'KET QUA',
    });
};
