const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const covidSchema = new Schema({
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
    staffId: { type: Schema.Types.ObjectId, ref: 'Staff', required: true },
});

module.exports = mongoose.model('CovidData', covidSchema);
