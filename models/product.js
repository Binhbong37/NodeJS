const products = []

// Khá giống class com cần viết HOA chữ cái đầu
module.exports = class Product {
    constructor(title) {
        this.title = title
    }

    save() {
        products.push(this)
    }

    static fetchAll() {
        return products
    }
}