module.exports = (req, res, next) => {
    if (!req.session.isLoggedInManager && !req.session.isLoggedInStaff) {
        return res.redirect('/login');
    }
    next();
};
