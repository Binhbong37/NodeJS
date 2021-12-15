const User = require("../models/user")

  exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false
    });
  };
  
  exports.postLogin = (req, res, next) => {
    User.findById('61b8421fcb081c04a8a1846c')
      .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err => {
          console.log("Da luu vao het: ")
          res.redirect('/');
        })
      })
      .catch(err => console.log(err));
  };
  
  exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
      console.log("Da POST duoc LogOut",err);
      res.redirect('/');
    });
  };  