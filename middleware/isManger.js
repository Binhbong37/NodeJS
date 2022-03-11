module.exports = (req, res, next) => {
    if (req.session.isLoggedInManager) {
        next();
    }
    return res.redirect('/login');
};
