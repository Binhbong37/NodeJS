const getAddProduct = (req, res, next) => {
    
    res.render('add-product', {
        pageTitle: "Add Product",
        path:'/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}
const products = []
const postAddProduct =  (req, res, next) => {
    // console.log(req.body)
    products.push({title: req.body.title})
    res.redirect("/")
}
// tu file SHOP cut qua
const getProducts =  (req, res, next) => {
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