
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  doB: {
    type: String,
    required: true
  },
  salaryScale: {
    type: Number,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  annualLeave: {
    type: Number,
    required: true
  },
  Image: {
    type: String,
    required: true
  },
  checkInId: {
    type: Schema.Types.ObjectId, ref: 'Checkin', required: true
  }
});

module.exports = mongoose.model('Profile', productSchema);

