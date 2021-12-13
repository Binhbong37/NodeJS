const getDb = require("../util/database").getDb
const mongoDb = require("mongodb")

class Product {
  constructor(title, price, description, imageUrl, id) {
    this._id = new mongoDb.ObjectId(id);
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl
  }
// Create products
  save() {
    const db = getDb()
    let dbOp;
    if(this._id) {
      dbOp = db
      .collection('products')
      .updateOne({ _id: this._id }, { $set: this } )
    } else {
      dbOp = db
      .collection("products")
      .insertOne(this)
    }
    
    return dbOp
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
      // console.log(products)
      return products
    })
    .catch(err => {
      console.log("Loi tu productModels")
    })
  }

  // Lay id san pham = id
  static findById(prodId) {
    const db = getDb()
    return db
    .collection('products')
    .find({_id: new mongoDb.ObjectId(prodId)})
    .next()
    .then(product => {
      console.log("Lay id sp: ", product)
      return product
    })
    .catch(err => {
      console.log('Loi k lay dc id productModel')
    })
  }
}


module.exports = Product