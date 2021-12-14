const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
  Product.find()
  .then((products) => {
    console.log(products)
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => {console.log('Loi k ra: ', err)})
};

// Phần sẽ lấy id sản phẩm
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.findById(prodId)
  .then((product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path:'/products'
    })
  })
  .catch((err) => {
    console.log('loi lay id sp: ', err)
  })
}

exports.getIndex = (req, res, next) => {
  Product.find()
  .then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => {
    console.log('Loi tu shopcontroller: ', err)
  })
};

exports.getCart = (req, res, next) => {
  req.user
  .getCart()
  .then(product => {
    console.log(product)
      res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: product 
        });
  })
  .catch(err => console.log('Loi tu get card controller: ', err))
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
  .then( product => {
    return req.user.addToCart(product)
  })
  .then( result => {
    console.log("Ket qua cua POST CART: ", result)
    res.redirect("/cart")
  })

}

exports.postDeleteCart = (req, res, next) => {
  const prodId = req.body.productId
  req.user
  .deleteFromCart(prodId)
  .then( result => {
    res.redirect('/cart')
  })
  .catch(err => console.log('Loi xoa sp'))
}

exports.postOrder = (req, res, next) => {
  req.user
    .addOrders()
    .then( result => {
        res.redirect("/orders")
      })
    .catch(err => console.log("Loi tu ORders"))
}

exports.getOrders = (req, res, next) => {
  req.user
  .getOrder()
  .then(orders => {
    console.log("KET QUA ORDER: ", orders)
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })
  .catch(err => console.log("Loi tu ORDER"))
};
