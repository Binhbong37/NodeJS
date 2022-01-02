const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const timeTableSchema = new Schema(
    {
        place: { type: String, required: true },
        status: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('TimeTable', timeTableSchema);
