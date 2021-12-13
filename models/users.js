
const getDb = require("../util/database").getDb
const mongoDb = require("mongodb")
const ObjectId = mongoDb.ObjectId

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email
    }

    // luu lai
    save() {
        const db = getDb()
        return db
        .collection('users').insertOne(this)
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