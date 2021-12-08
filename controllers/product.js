// import from models not UPPERCASE
const Product = require("../models/product")

const getAddProduct = (req, res, next) => {
    
    res.render('add-product', {
        pageTitle: "Add Product",
        path:'/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}
const postAddProduct =  (req, res, next) => {
    const product = new Product(req.body.title)
    product.save()
    res.redirect("/")
}
// tu file SHOP cut qua
const getProducts =  (req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop',{
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
    })
}
module.exports = {
    getAddProduct: getAddProduct,
    postAddProduct: postAddProduct,
    getProducts: getProducts
}