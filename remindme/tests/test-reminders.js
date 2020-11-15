let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
let server = require('../server/server');
let Reminder = require("../server/model");

describe('Reminders', () => {
    beforeEach((done) => {
        Reminder.remove({}, (err) => {
            done();
        });
    });

    describe('/GET reminder(s)', () => {
        it('should GET all reminders', (done) => {
            chai.request(server)
                .get('/api/reminders')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('should GET a single reminder by the given id', (done) => {
            let reminder = new Reminder({
                reminder: "Clean up my room!",
                details: "Better do this before dad gets angry...",
                remind_when: "Tonight"
            });
            reminder.save((err, reminder) => {
                chai.request(server)
                    .get('/api/reminders/' + reminder.id)
                    .send(reminder)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.data.should.have.property('reminder');
                        res.body.data.should.have.property('details');
                        res.body.data.should.have.property('create_date');
                        res.body.data.should.have.property('remind_when');
                        res.body.data.should.have.property('_id').eql(reminder.id);
                        done();
                    });
            });
        });
    });

    describe('/POST reminder', () => {
        it('should POST a single reminder', (done) => {
            let reminder = {
                reminder: "Wash my clothes!",
                details: "Better do this before mum gets angry...",
                remind_when: "This afternoon"
            }
            chai.request(server)
                .post('/api/reminders')
                .send(reminder)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.reminder.should.be.eql("Wash my clothes!");
                    res.body.data.details.should.be.eql("Better do this before mum gets angry...");
                    res.body.data.remind_when.should.be.eql("This afternoon");
                    done();
                });
        });

        it('should not POST a reminder without reminder field', (done) => {
            let reminder = {
                details: "Better do this before mum gets angry..."
            }
            chai.request(server)
                .post('/api/reminders')
                .send(reminder)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('reminder');
                    res.body.errors.reminder.should.have.property('kind').eql('required');
                    done();
                });
        });
    });

    describe('/PUT/:id reminder', () => {
        it('should UPDATE a book given the id', (done) => {
            let reminder = new Reminder({
                reminder: "Register for national service!",
                details: "Better do this before the government gets angry...",
                remind_when: "End of the month"
            });
            reminder.save((err, reminder) => {
                chai.request(server)
                    .put('/api/reminders/' + reminder.id)
                    .send({
                            reminder: "Register for national service!",
                            details: "Better do this before MY ENCIK gets angry...",
                            remind_when: "End of the month"
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Reminder updated');
                        res.body.data.should.have.property('details').eql("Better do this before MY ENCIK gets angry...");
                        done();
                    });
            });
        });
    });

    describe('/DELETE/:id reminder', () => {
        it('should DELETE a reminder given the id', (done) => {
            let reminder = new Reminder({
                reminder: "Upload my original music on Spotify!",
                details: "Better do this for my career...",
                remind_when: "End of the year"
            });
            reminder.save((err, reminder) => {
                chai.request(server)
                    .delete('/api/reminders/' + reminder.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status').eql('success');
                        res.body.should.have.property('message').eql('Reminder deleted');
                        done();
                    });
            });
        });
    });
});




// const test_reminders = [
//     {
//         _id: "5fb0d0d2dcd14243c8cda4cb",
//         create_date: "2020-11-15T06:55:14.845Z",
//         reminder: "Wash my clothes!",
//         details: "Better do this before mum gets angry...",
//         __v: 0
//     },
//     {
//         _id: "5fb0d10d2941924d3829fc7e",
//         create_date: "2020-11-15T06:56:13.719Z",
//         reminder: "Clean up my room!",
//         details: "Better do this before dad gets angry...",
//         __v: 0
//     },
//     {
//         _id: "5fb0d1363b47eb46687b32d0",
//         create_date: "2020-11-15T06:56:54.962Z",
//         reminder: "Register for national service!",
//         details: "Better do this before the government gets angry...",
//         __v: 0
//     }
// ];
//
// export default test_reminders;