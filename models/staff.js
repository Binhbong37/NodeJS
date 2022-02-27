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
    workTime: [
        {
            place: { type: String },
            status: { type: Boolean, default: true },
            startWork: { type: Date, default: new Date() },
            endWordk: { type: Date },
        },
    ],
    onLeave: [
        {
            startDaysOff: { type: Date },
            reason: { type: String },
            hourOff: { type: Number },
        },
    ],
});

staffSchema.methods.addCheckIn = function (NewWorkTime) {
    if (this.workTime.length < 0) {
        return this.save();
    } else {
        const updateworkTimes = [...this.workTime];
        updateworkTimes.push(NewWorkTime);
        this.workTime = updateworkTimes;
        return this.save();
    }
};

staffSchema.methods.addCheckOut = function (checkOut) {
    // console.log('Model: ', checkOut);
    // const abc = this.workTime[this.workTime.length - 1].endWordk;
    // console.log(abc);
    if (this.workTime[this.workTime.length - 1].endWordk === undefined) {
        const lastWorkTime = this.workTime[this.workTime.length - 1];
        const updateWorkTime = (lastWorkTime.endWordk = checkOut.endWordk);
        lastWorkTime.status = checkOut.status;
        lastWorkTime.endWordk = updateWorkTime;

        this.workTime = [lastWorkTime];
        return this.save();
    } else {
        return this.save();
    }
};

module.exports = mongoose.model('Staff', staffSchema);
