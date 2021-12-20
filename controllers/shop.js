
const information = require('../models/information');
const Information = require('../models/information');
// const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Information.find()
  .then( information => {
    console.log(information)
    res.render('shop/product-list', {
      pageTitle: 'Xem/Sửa thông tin',
      path: '/thong-tin-ca-nhan',
      information: information
    });
    
  })
  .catch(err => console.log("Loi k in ra dc JSON"))
  
};

exports.getIndex = (req, res, next) => {
      res.render('shop/index', {
        pageTitle: 'Điểm danh/kết thúc',
        path: '/'
      });
};

exports.getCart = (req, res, next) => {
     
      res.render('shop/cart', {
        path: '/thong-tin-gio-lam',
        pageTitle: 'Tra cứu thông tin giờ làm',
      });
};


exports.getOrders = (req, res, next) => {
      res.render('shop/orders', {
        path: '/thong-tin-covid',
        pageTitle: 'Thông tin Covid',
      });
   
};

exports.confirmName = (req, res, next) => {
  Information.find()
  .then(information => {
    res.render('shop/confirmName', {
      path: '/add-product',
      pageTitle: 'Xác nhận làm việc',
      information: information
    })
  })
  .catch(err => console.log("Loi o xa nhan nhan vien controller"))
 
}

exports.nghiPhep = (req, res, next) => {
  res.render('shop/nghiphep', {
    path: '/add-product',
    pageTitle: 'Xác nhận xin nghỉ'
  })
}
