const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const onLeaveSchema = new Schema({
    daysOff: { type: Date, required: true },
    reason: { type: String, required: true },
    annualLeave: { type: Number, default: 12 },
    hoursOff: { type: Date, required: true },
});

module.exports = mongoose.model('OnLeave', onLeaveSchema);
