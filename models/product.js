// Save to file
const fs = require("fs")
const path = require("path")

// Khá giống class com cần viết HOA chữ cái đầu
module.exports = class Product {
    constructor(title) {
        this.title = title
    }

    save() {
        const pa = path.join(path.dirname(require.main.filename),
        'data',
        'product.json'
        )
        fs.readFile(pa, (err, fileContent) => {
            let products = []
            if (!err) {
                products = JSON.parse(fileContent)
            }
            products.push(this)
            fs.writeFile(pa, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })

    }

    static fetchAll(cb) {
        const pa = path.join(path.dirname(require.main.filename),
        'data',
        'product.json'
        )
        fs.readFile(pa, (err, fileContent) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(fileContent))
        })
    }
}