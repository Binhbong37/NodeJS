const getDb = require("../util/database").getDb

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl
  }
// Create products
  save() {
    const db = getDb()
    return db.collection("products").insertOne(this)
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log("Loi tu product DB")
    })
  }

  // GET products
  static fetchAll() {
    const db = getDb()
    return db.collection('products')
    .find()
    .toArray()
    .then(products => {
      console.log(products)
      return products
    })
    .catch(err => {
      console.log("Loi tu productModels")
    })
  }
}

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// })

module.exports = Product