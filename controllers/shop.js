// const Product = require('../models/product');
// const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
      res.render('shop/product-list', {
        pageTitle: 'Xem/Sửa thông tin',
        path: '/thong-tin-ca-nhan'
      });
};

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//     .then(product => {
//       res.render('shop/product-detail', {
//         product: product,
//         pageTitle: product.title,
//         path: '/products'
//       });
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

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

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId)
//     .then(product => {
//       return req.user.addToCart(product);
//     })
//     .then(result => {
//       console.log(result);
//       res.redirect('/cart');
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   req.user
//     .removeFromCart(prodId)
//     .then(result => {
//       res.redirect('/cart');
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

// exports.postOrder = (req, res, next) => {
//   req.user
//     .populate('cart.items.productId')
//     .execPopulate()
//     .then(user => {
//       const products = user.cart.items.map(i => {
//         return { quantity: i.quantity, product: { ...i.productId._doc } };
//       });
//       const order = new Order({
//         user: {
//           email: req.user.email,
//           userId: req.user
//         },
//         products: products
//       });
//       return order.save();
//     })
//     .then(result => {
//       return req.user.clearCart();
//     })
//     .then(() => {
//       res.redirect('/orders');
//     })
//     .catch(err => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       return next(error);
//     });
// };

exports.getOrders = (req, res, next) => {
      res.render('shop/orders', {
        path: '/thong-tin-covid',
        pageTitle: 'Thông tin Covid',
      });
   
};

exports.confirmName = (req, res, next) => {
  res.render('shop/confirmName', {
    path: '/add-product',
    pageTitle: 'Xác nhận làm việc'
  })
}

exports.nghiPhep = (req, res, next) => {
  res.render('shop/nghiphep', {
    path: '/add-product',
    pageTitle: 'Xác nhận xin nghỉ'
  })
}
