const Staff = require('../models/staff');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

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
                _id: result[0]._id,
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

exports.getCovidDetail = (req, res, next) => {
    const staffId = req.params.staffId;
    Staff.findById(staffId)
        .then((staff) => {
            if (!staff) {
                return next(new Error('Not found staff'));
            }
            const invoiceName = 'invoice-' + staffId + '.pdf';
            const invoicePath = path.join('data', 'invoices', invoiceName);
            const PDFDoc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader(
                'Content-Disposition',
                'inline; filename ="' + invoiceName + '"'
            );
            PDFDoc.pipe(fs.createWriteStream(invoicePath));
            PDFDoc.pipe(res);
            PDFDoc.fontSize(26).text('Name: ' + staff.name);

            PDFDoc.text('- - - - - - - - - - - - - - - -');
            staff.covidInfo.thong_tin_than_nhiet.forEach((t) => {
                PDFDoc.text('Nhiet do: ' + t.nhiet_do + ' C');
                PDFDoc.text('Gio do: ' + t.gio_do);
            });
            PDFDoc.text('- - - - - - - - - - - - - - - -');
            staff.covidInfo.thong_tin_vacxin.forEach((v) => {
                PDFDoc.text('Mui 1: ' + v.mui_1);
                PDFDoc.text('Mui 2: ' + v.mui_2);
            });

            PDFDoc.end();
        })
        .catch((err) => console.log(err));
};
