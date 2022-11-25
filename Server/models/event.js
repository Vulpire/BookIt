const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    Subject: {type: String, required: [true, 'cannot be empty']},
    Location: {type: String, required: [true, 'cannot be empty']},
    start: {type: Date, required: [true, 'cannot be empty']},
    end: {type: Date, required: [true, 'cannot be empty']}
})

module.exports = mongoose.model('Event', eventSchema);