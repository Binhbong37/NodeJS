
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
  const product = new Product({
    title: title,
    price: price,
    description:
    description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
  .save()
  .then((result) => {
    console.log('TAO SP THANH CONG!!')
    res.redirect('/admin/products')
  })
  .catch(err => console.log('Loi tu admin Controller: ', err))
};

// Trang ADMIN

exports.getProducts = (req, res, next) => {
  Product.find()
  // req.user.getProducts()
  // .select("title price")
  // .populate("userId", "name")
  .then((products) => {
    console.log('Lay cai gi: ',products)
    console.log(products)
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log('Loi k truy cap dc Admin'))
};

// Edit Product
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect("/")
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
  // req.user.getProducts({where: {id: prodId}})
  .then((product) => {
      if(!product) {
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
  })
  .catch(err => console.log('loi tu Edit'))
};

// // postEditProduct
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
  .then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;
    return product
    .save()
  })
    .then((result) => {
      console.log('UPDATED')
      res.redirect('/admin/products')
    })
    .catch(err => console.log('Loi k EDIT duoc !!!'))
}

// XOA SAN PHAM

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
  .then(result => {
    console.log('DELETED')
    res.redirect('/admin/products')
  })
  .catch(err => console.log("Loi k xoa dc controller !!"))
 
}