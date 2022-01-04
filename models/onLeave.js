const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const onLeaveSchema = new Schema({
    startDaysOff: { type: Date, required: true },
    endDaysOff: { type: Date, required: true },
    reason: { type: String, required: true },
    annualLeave: { type: Number, default: 12 },
    hourOff: { type: Number, required: true },
});

module.exports = mongoose.model('OnLeave', onLeaveSchema);
