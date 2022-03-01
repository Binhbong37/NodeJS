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
            dayOff: { type: String, required: true },
            hourOff: { type: Number, required: true },
            reason: { type: String, required: true },
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

staffSchema.methods.addOnLeave = function (newOnLeave) {
    // update annualLeave
    let time = 0;
    this.onLeave.forEach((tim) => {
        return (time += tim.hourOff);
    });
    let addTime = time + +newOnLeave.hourOff;
    console.log('MODEL :', addTime);
    let timeChange = 0;
    if (this.annualLeave < addTime / 8) {
        timeChange = addTime / 8 - this.annualLeave;
        this.annualLeave = this.annualLeave;
    } else {
        this.annualLeave = this.annualLeave - addTime / 8;
    }
    console.log('annualLeave: ', this.annualLeave);

    // add onLeave
    if (this.onLeave.length < 0 || timeChange > 0) {
        return this.save();
    } else {
        const updatedOnLeave = [...this.onLeave];
        updatedOnLeave.push(newOnLeave);
        this.onLeave = updatedOnLeave;
        return this.save();
    }
};

module.exports = mongoose.model('Staff', staffSchema);
