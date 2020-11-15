Reminder = require('./model');

exports.index = (req, res) => {
    Reminder.get(function (err, reminders) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Reminders retrieved successfully",
            data: reminders
        });
    });
};

exports.new = (req, res) => {
    let reminder = new Reminder();
    reminder.reminder = req.body.reminder ? req.body.reminder : reminder.name;
    reminder.details = req.body.details;
    reminder.remind_when = req.body.remind_when;

    reminder.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New reminder created!',
            data: reminder
        });
    });
};

exports.view = (req, res) => {
    Reminder.findById(req.params.reminder_id, (err, reminder) => {
        if (err)
            res.send(err);
        res.json({
            message: 'Reminder details loading..',
            data: reminder
        });
    });
};

exports.update = (req, res) => {
    Reminder.findById(req.params.reminder_id, (err, reminder) => {
        if (err)
            res.send(err);
        reminder.reminder = req.body.reminder ? req.body.reminder : reminder.name;
        reminder.details = req.body.details;
        reminder.remind_when = req.body.remind_when;

        reminder.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Reminder updated',
                data: reminder
            });
        });
    });
};

exports.delete = (req, res) => {
    Reminder.remove({
        _id: req.params.reminder_id
    }, (err, reminder) => {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Reminder deleted'
        });
    });
};