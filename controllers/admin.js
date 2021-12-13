
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
   
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, description, imageUrl);
  product
  .save()
  .then((result) => {
    res.redirect('/admin/products')
  })
  .catch(err => console.log('Loi tu admin Controller: ', err))
};

// Edit Product
// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if(!editMode) {
//     return res.redirect("/")
//   }

//   const prodId = req.params.productId;
//   // Product.findById(prodId)
//   req.user.getProducts({where: {id: prodId}})
//   .then((product) => {
//     const prod = product[0]
//       if(!prod) {
//         return res.redirect('/')
//       }
//       res.render('admin/edit-product', {
//         pageTitle: 'Edit Product',
//         path: '/admin/edit-product',
//         editing: editMode,
//         product: prod
//       });
//   })
//   .catch(err => console.log('loi tu Edit'))

// };

// // postEditProduct
// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedPrice = req.body.price;
//   const updatedDesc = req.body.description;

//   Product.findById(prodId)
//   .then((product) => {
//     product.title = updatedTitle
//     product.imageUrl = updatedImageUrl
//     product.price = updatedPrice
//     product.description = updatedDesc
//     return product.save()
//   })
//   .then((result) => {
//     console.log('UPDATED')
//     res.redirect('/admin/products')
//   })
//   .catch(err => console.log('Loi k EDIT duoc !!!'))

  
// }

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  // req.user.getProducts()
  .then((products) => {
    console.log(products)
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log('Loi k truy cap dc Admin'))
};

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findById(prodId)
//   .then((product) => {
//    return product.destroy()
//   })
//   .then(result => {
//     console.log('DELETED')
//     res.redirect('/admin/products')
//   })
//   .catch(err => console.log("Loi k xoa dc !!"))
 
// }