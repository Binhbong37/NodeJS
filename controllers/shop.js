const Product = require('../models/product');
const Cart = require("../models/cart")
const Order = require("../models/order")

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then( (products) => {
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
  Product.findAll()
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
  req.user.getCart()
  .then(cart => {
    return cart.getProducts()
    .then(product => {
      res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: product 
        });
    })
    .catch(err => console.log("Post ben trong"))
  })
  .catch(err => console.log('Loi tu get card'))
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId
  let fetchCart;
  let newQuantity = 1
  req.user.getCart()
  .then( cart => {
      fetchCart = cart
      return cart.getProducts({where: {id: prodId}})
    })
    .then( products => {
      let product;
      if(products.length > 0) {
        product = products[0]
      }
      
      if(product) {
        const oldQuantity = product.cartItem.quantity
        newQuantity = oldQuantity + 1
        return product
      }
      return Product.findById(prodId)
  })
  .then(product => {
    return fetchCart.addProduct(product, {
      through: { quantity: newQuantity}
    })
  })
  .then(() => {
    res.redirect("/cart")
  })
  .catch(err => console.log('Loi tu post Cart'))
}

exports.postDeleteCart = (req, res, next) => {
  const prodId = req.body.productId
  req.user.getCart()
  .then( cart => {
    return cart.getProducts ({where: {id: prodId}})
  })
  .then(prods => {
    const product = prods[0]
    return product.cartItem.destroy()
  })
  .then( result => {
    res.redirect('/cart')
  })
  .catch(err => console.log('Loi xoa sp'))
}

exports.postOrder = (req, res, next) => {
  req.user.getCart()
  .then( cart => {
      return cart.getProducts()
    })
    .then( products => {
      req.user.createOrder()
      .then( order => {
        return order.addProducts(
          products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity};
            return product
          })
        )
      })
      .catch(err => console.log('Loi ORDER'))
    })
    .then(result => {
      res.redirect("/orders")
    })
    .catch(err => console.log("Loi tu ORders"))
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
