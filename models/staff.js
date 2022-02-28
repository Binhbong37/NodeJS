const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    doB: {
        type: Date,
        required: true,
    },
    salaryScale: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    annualLeave: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    workTimes: [
        {
            place: { type: String, required: true },
            status: { type: Boolean, default: true },
            startWork: { type: Date, default: new Date() },
            endWork: { type: Date },
        },
    ],
    onLeave: [
        {
            daysLeave: { type: String },
            timesLeave: { type: Number },
            reason: { type: String },
        },
    ],
});

staffSchema.methods.addCheckIn = function (NewWorkTime) {
    if (this.workTimes.length < 0) {
        return this.save();
    } else {
        const updateworkTimes = [...this.workTimes];
        updateworkTimes.push(NewWorkTime);
        this.workTimes = updateworkTimes;
        return this.save();
    }
};

staffSchema.methods.addCheckOut = function (checkOut) {
    if (this.workTimes[this.workTimes.length - 1].endWork === null) {
        const lastWorkTime = this.workTimes[this.workTimes.length - 1];
        lastWorkTime.status = checkOut.status;
        lastWorkTime.endWork = checkOut.endWork;
        return this.save();
    } else {
        return this.save();
    }
};

module.exports = mongoose.model('Staff', staffSchema);
