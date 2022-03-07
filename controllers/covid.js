const Staff = require('../models/staff');

exports.getCovid = (req, res, next) => {
    Staff.find()
        .then((result) => {
            let nhietDo = result[0].covidInfo.thong_tin_than_nhiet;
            let muiTiem = result[0].covidInfo.thong_tin_vacxin;
            let duongTinh = result[0].covidInfo.thong_tin_mac_covid;
            res.render('shop/covid', {
                path: '/thong-tin-covid',
                pageTitle: 'Thông tin Covid',
                nhietDo,
                muiTiem,
                duongTinh,
                name: result[0].name,
                isAuthen: req.session.isLoggedInStaff,
                isAuthen1: req.session.isLoggedInManager,
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
    const covidData = {
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
    };
    req.staff.addInfoCovid(covidData);
    res.redirect('/thong-tin-ca-nhan');
};
