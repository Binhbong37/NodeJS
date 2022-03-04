const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const managerSchema = new Schema({
    urlImage: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, require: true },
});

module.exports = mongoose.model('Manager', managerSchema);
