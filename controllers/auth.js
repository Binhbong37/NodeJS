exports.getLogin = (req, res) => {
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Dang Nhap',
        isAuthen: req.session.isLoggedInStaff,
    });
};

exports.postLogin = (req, res) => {
    req.session.isLoggedInStaff = true;
    res.redirect('/');
};

exports.postLogout = (req, res) => {
    console.log('delete');
    req.session.destroy(() => {
        res.redirect('/login');
    });
};
