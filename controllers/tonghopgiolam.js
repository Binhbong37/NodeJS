const TimeTable = require('../models/timeTable');
const moment = require('moment');

exports.getTongHopGioLam = (req, res, next) => {
    TimeTable.find().then((result) => {
        result = result.map((inf) => {
            const overTime = (inf.updatedAt - inf.createdAt) / 36e5;
            let timeOver = 0;
            if (overTime > 8) {
                timeOver = overTime - 8;
            }
            return {
                dayWork: moment(inf.createdAt).format('ll'),
                startDate: moment(inf.createdAt).format('lll'),
                endDate: moment(inf.updatedAt).format('lll'),
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
        });
    });
};
