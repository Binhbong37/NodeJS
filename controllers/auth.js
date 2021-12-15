const bcrypt = require("bcryptjs")

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMassage: req.flash('error')
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup'
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password
  User.findOne({email: email})
    .then(user => {
      if(!user) {
        req.flash("error", "Invalid email or password.")
        return res.redirect("/login")
      }
      bcrypt
      .compare(password, user.password)
      .then(doMatch => {
        if(doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            console.log("K co loi");
            res.redirect("/")
          });
        }
        res.redirect("/login")
        console.log("MAN RUA")
      })
      .catch(err => {
        console.log("Loi k so sanh dc mat khau Control: ")
        res.redirect("/login")
      })
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({email: email})
  .then( userDoc => {
    if(userDoc) {
      return res.redirect("/signup")
    }
    return bcrypt.hash(password, 12)
      .then( hashPass => {
        const user = new User({
          email: email,
          password: hashPass,
          cart: {items: []}
        })
        return user.save()
      })
      .then(result => {
        res.redirect("/login")
      })
  })
  .catch(err => {
    console.log("Co loi tu postSignUp: ")
  })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
