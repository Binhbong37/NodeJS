// Save to file
const fs = require("fs")
const path = require("path")
// tao duong dan global
const pa = path.join(path.dirname(require.main.filename),
'data',
'product.json'
)
const getProductsFromFile = cb => {
        fs.readFile(pa, (err, fileContent) => {
            if (err) {
                cb([]);
            } else {
                cb(JSON.parse(fileContent))
            }
        })
}
// Khá giống class com cần viết HOA chữ cái đầu
module.exports = class Product {
    constructor(title) {
        this.title = title
    }

    save() {
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(pa, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }
}