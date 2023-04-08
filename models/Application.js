const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'job',
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    gh: {
        type: String,
        required: true
    },
    lc: {
        type: String,
        required: true
    },
    cf: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
});

module.exports = Application = mongoose.model('application', ApplicationSchema);