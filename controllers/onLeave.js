const OnLeave = require('../models/onLeave');

exports.getOnLeave = (req, res) => {
    res.render('shop/nghiphep', {
        path: '',
        pageTitle: 'Xin nghỉ phép',
        staff: req.staff,
        isAuthen: req.session.isLoggedInStaff,
        isAuthen1: req.session.isLoggedInManager,
    });
};

exports.postOnLeave = (req, res) => {
    const dayOff = req.body.dayOff;
    const reason = req.body.reason;
    const hourOff = req.body.hourOff;
    if (!dayOff || !reason || !hourOff) {
        return res.redirect('/xin-nghi-phep');
    }
    const newOnLeave = {
        dayOff,
        reason,
        hourOff,
    };
    req.staff
        .addOnLeave(newOnLeave)
        .then(() => {
            res.redirect('/thong-tin-ca-nhan');
        })
        .catch((err) => console.log(err));
};
