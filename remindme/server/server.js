const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
let apiRoutes = require("./api-routes")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/remindme', { useNewUrlParser: true});
const db = mongoose.connection;
if (!db) {
    console.log("Error connecting db")
} else {
    console.log("Db connected successfully")
}

const port = process.env.PORT || 5000;
app.get('/', (req, res) => res.send('Hello World with Express'));

app.use('/api', apiRoutes)
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;