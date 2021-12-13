const mongodb = require("mongodb")

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb://localhost:27017')
    .then( client => {
        console.log("connected Mongo")
        callback(client)
    })
    .catch(err => console.log('Loi MongoDB'))
}

module.exports = mongoConnect