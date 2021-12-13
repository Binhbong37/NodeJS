
const getDb = require("../util/database").getDb
const mongoDb = require("mongodb")
const ObjectId = mongoDb.ObjectId

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    // luu lai
    save() {
        const db = getDb()
        return db
        .collection('users').insertOne(this)
    }

    // Tao cart
    addToCard(product) {

        const updatedCart = {item: [{...product, quantity: 1}]};
        const db = getDb();
        return db
        .collection("users")
        .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: {cart: updatedCart} })
    }

    static findById(userId) {
        const db = getDb();
        return db
        .collection('users')
        .findOne({_id: new ObjectId(userId)})
        .then(result => {
            console.log('Ket qua cua USER: ', result)
            return result
        })
        .catch(err => console.log("Loi k tim dc User !!!"))
    }
}
module.exports = User 