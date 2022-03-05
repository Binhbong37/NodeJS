const Covid = require('../models/covid');

exports.getCovid = (req, res, next) => {
    Covid.find()
        // // .populate()
        // .execPopulate()
        .then((result) => {
            console.log(result);
            let nhietDo = result[0].thong_tin_than_nhiet;
            res.render('shop/covid', {
                path: '/thong-tin-covid',
                pageTitle: 'Thông tin Covid',
                nhietDo,
                isAuthen: req.session.isLoggedInStaff,
                isAuthen1: req.session.isLoggedInOnLeave,
            });
        })

        .catch((err) => console.log(err));
};

exports.postCovid = (req, res) => {
    const nhietdo = req.body.nhietdo;
    const giodonhietdo = req.body.giodonhietdo;
    const ngaydonhietdo = req.body.ngaydonhietdo;
    const mui1 = req.body.mui1;
    const ngaytiem1 = req.body.ngaytiem1;
    const mui2 = req.body.mui2;
    const ngaytiem2 = req.body.ngaytiem2;
    const duongtinh = req.body.duongtinh;
    const amtinh = req.body.amtinh;
    const covidData = new Covid({
        thong_tin_than_nhiet: [
            {
                ngay_do: ngaydonhietdo,
                nhiet_do: nhietdo,
                gio_do: giodonhietdo,
            },
        ],
        thong_tin_vacxin: [
            {
                mui_1: mui1,
                ngay_tiem_mui_1: ngaytiem1,
                mui_2: mui2,
                ngay_tiem_mui_2: ngaytiem2,
            },
        ],
        thong_tin_mac_covid: [
            {
                duong_tinh: duongtinh,
                am_tinh: amtinh,
            },
        ],
        staffId: req.user,
    });
    covidData
        .save()
        .then((result) => {
            console.log('Created Data');
            res.redirect('/thong-tin-ca-nhan');
        })
        .catch((err) => console.log(err));
};
