const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JobSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    jobDescription: {
        type: Schema.Types.String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
});

module.exports = Job = mongoose.model('job', JobSchema);