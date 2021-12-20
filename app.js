const express = require('express');
const bodyParser = require('body-parser');
const path = require("path")

const app = express();

const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/admin', adminRoutes);
app.use(shopRoutes);
// app.use(authRoutes);

const MONGODB_URI = "mongodb://localhost:27017/funix_njs_asm"

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    console.log("Ket noi voi MONGOOSE ASM !!!")
    app.listen(3737);
  })
  .catch(err => {
    console.log('Lỗi kết nối với Mongoose',err);
  });

