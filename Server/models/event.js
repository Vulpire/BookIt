const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* old schema
const appointmentSchema = new Schema({
    title: {type: String, required: [true, 'cannot be empty']},
    startTime: {type: String, require: [true]},
    endTime: {type: String, require: [true]},
    date: {type: String, require: [true]},
    priority: {type: String, require: [true]},
    group: {type: String, require: [false]},
    purpose: {type: String, require: [true]},
    author: {type: String, require: [true]}
});
*/ 
const eventSchema = new Schema({
    title: {type: String, required: [true, 'cannot be empty']},
    start: {type: Date, required: [true, 'cannot be empty']},
    end: {type: Date, required: [true, 'cannot be empty']},
    group: {type: Schema.Types.ObjectId, ref: 'Group', required: [true, "Must be part of a group"]},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: [true, "Must have an author group"]},
    description: {type: String, required: [false]}
})

module.exports = mongoose.model('Event', eventSchema);