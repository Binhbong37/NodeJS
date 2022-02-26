const OnLeave = require('../models/onLeave');

exports.getOnLeave = (req, res) => {
    res.render('shop/nghiphep', {
        path: '',
        pageTitle: 'Xin nghỉ phép',
    });
};

exports.postOnLeave = (req, res) => {
    const startDaysOff = req.body.startDaysOff;
    const endDaysOff = req.body.endDaysOff;
    const reason = req.body.reason;
    const hourOff = req.body.hourOff;

    const onLeave = new OnLeave({
        startDaysOff,
        endDaysOff,
        reason,
        hourOff,
    });
    onLeave
        .save()
        .then(() => {
            console.log('Tao ngay nghi');
            res.redirect('/');
        })
        .catch((err) => console.log('TAO NGAY NGHI THAT BAI'));
};
