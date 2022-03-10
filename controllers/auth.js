const Staff = require('../models/staff');
const Manager = require('../models/manager');

exports.getLogin = (req, res) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Dang Nhap',
        isAuthen: req.session.isLoggedInStaff,
        isAuthen1: req.session.isLoggedInManager,
        errorMessage: message,
    });
};

exports.postLogin = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Staff.findOne({ username: username })
        .then((staff) => {
            if (!staff) {
                Manager.findOne({ username: username })
                    .then((manager) => {
                        if (!manager) {
                            req.flash(
                                'error',
                                'Người dùng hoặc mật khẩu không đúng'
                            );
                            return res.redirect('/login');
                        } else {
                            console.log('KET BAY. . . ');
                            req.session.manager = manager;
                            req.session.isLoggedInManager = true;
                            return req.session.save((err) => {
                                console.log(err);
                                res.redirect('/thong-tin-ca-nhan');
                            });
                        }
                    })
                    .catch((err) => console.log(err));
            } else {
                req.session.isLoggedInStaff = true;
                req.session.staff = staff;
                return req.session.save((err) => {
                    console.log(err);
                    res.redirect('/thong-tin-ca-nhan');
                });
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
