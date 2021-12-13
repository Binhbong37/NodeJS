const mongodb = require("mongodb")

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb://localhost:27017')
    .then( client => {
        console.log("connected Mongo")
        _db = client.db()
        callback()
    })
    .catch(err => {
        console.log('Loi MongoDB')
        throw err
    })
}
const getDb = () => {
    if(_db) {
        return _db
    }
    throw 'No data found !!!'
}

module.exports = {
    mongoConnect,
    getDb
}