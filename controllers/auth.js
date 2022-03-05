const Staff = require('../models/staff');
const OnLeave = require('../models/onLeave');

exports.getLogin = (req, res) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Dang Nhap',
        isAuthen: req.session.isLoggedInStaff,
        isAuthen1: req.session.isLoggedInOnLeave,
    });
};

exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Staff.findOne({ name: email })
        .then((staff) => {
            if (!staff) {
                OnLeave.findOne({ reason: email })
                    .then((result) => {
                        if (!result) {
                            return res.redirect('/login');
                        } else {
                            console.log('KET BAY. . . ');
                            req.session.isLoggedInOnLeave = true;
                            return res.redirect('/');
                        }
                    })
                    .catch((err) => console.log(err));
            } else {
                req.session.isLoggedInStaff = true;
                console.log('Staff');
                return res.redirect('/');
            }
        })
        .catch((err) => console.log(err));
};

exports.postLogout = (req, res) => {
    console.log('delete');
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
