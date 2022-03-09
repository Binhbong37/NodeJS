exports.getOnLeave = (req, res) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('shop/nghiphep', {
        path: '',
        pageTitle: 'Xin nghỉ phép',
        staff: req.staff,
        isAuthen: req.session.isLoggedInStaff,
        isAuthen1: req.session.isLoggedInManager,
        errorMessage: message,
    });
};

exports.postOnLeave = (req, res) => {
    const dayOff = req.body.dayOff;
    const reason = req.body.reason;
    const hourOff = req.body.hourOff;
    const annuaLeave = req.staff.annualLeave;
    let sumHourOff = 0;

    // Check valid input
    if (!dayOff || !reason || !hourOff) {
        req.flash('error', 'Các ô không được trống!!');
        return res.redirect('/xin-nghi-phep');
    }
    // Lấy tổng số giờ nghỉ đã đăng ký
    if (req.staff.onLeave.length > 0) {
        req.staff.onLeave.forEach((time) => {
            sumHourOff += time.hourOff;
        });
    }
    // So sánh nếu số giờ đăng ký lớn hơn thì không cho
    if (sumHourOff > annuaLeave * 8) {
        req.flash('error', 'Số ngày còn lại không đủ để đăng ký');
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
