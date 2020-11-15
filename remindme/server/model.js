let mongoose = require('mongoose');

let reminderSchema = mongoose.Schema({
    reminder: {
        type: String,
        required: true
    },
    details: String,
    remind_when: {
        type: Date,
        default: Date.now
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

let Reminder = module.exports = mongoose.model('reminder', reminderSchema);

module.exports.get = (callback, limit) => {
    Reminder.find(callback).limit(limit);
}