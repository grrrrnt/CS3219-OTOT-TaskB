let router = require('express').Router();

router.get('/', (req, res) => {
    res.json({
        status: 'API is working',
        message: 'Hi! I\'m here to remind you of whatever you want.'
    });
});

let controller = require('./controller');

router.route('/reminders')
    .get(controller.index)
    .post(controller.new);
router.route('/reminders/:reminder_id')
    .get(controller.view)
    .patch(controller.update)
    .put(controller.update)
    .delete(controller.delete);

// router.get('/api/hello', (req, res) => {
//     res.send({ express: "Hi! I'm here to remind you of whatever you want." });
// });
// router.post('/api/world', (req, res) => {
//     console.log(req.body);
//     res.send(
//         `I received your POST request. This is what you sent me: ${req.body.post}`,
//     );
// });

module.exports = router;