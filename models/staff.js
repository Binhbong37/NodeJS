const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: { type: String, default: 'Staff' },
    password: { type: String, default: '1234567' },
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
    covidInfo: {
        thong_tin_than_nhiet: [
            {
                ngay_do: { type: Date, required: true },
                nhiet_do: { type: Number, required: true },
                gio_do: { type: String, required: true },
            },
        ],
        thong_tin_vacxin: [
            {
                mui_1: { type: String, required: true },
                ngay_tiem_mui_1: { type: Date, required: true },
                mui_2: { type: String, required: true },
                ngay_tiem_mui_2: { type: Date, required: true },
            },
        ],
        thong_tin_mac_covid: [
            {
                ngay_nhiem: { type: Date },
                ngay_khoi: { type: Date },
            },
        ],
    },
    managerId: { type: Schema.Types.ObjectId, ref: 'Manager', required: true },
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

staffSchema.methods.addInfoCovid = function (dataCovid) {
    this.covidInfo = dataCovid;
    return this.save();
};

module.exports = mongoose.model('Staff', staffSchema);
