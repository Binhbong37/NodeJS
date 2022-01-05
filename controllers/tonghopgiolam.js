const TimeTable = require('../models/timeTable');
const moment = require('moment');

exports.getTongHopGioLam = (req, res, next) => {
    TimeTable.find().then((result) => {
        result = result.map((inf) => {
            return {
                dayWork: moment(inf.createdAt).format('ll'),
                startDate: moment(inf.createdAt).format('LT'),
                endDate: moment(inf.updatedAt).format('LT'),
                place: inf.place,
            };
        });
        res.render('shop/tonghopgiolam', {
            path: '/thong-tin-gio-lam',
            pageTitle: 'Tra cứu thông tin giờ làm',
            inf: result,
        });
    });
};
