const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
mongoose.Promise = global.Promise;
require('dotenv/config');

//require('dotenv/config');
let publisherService = require('./services/publisher-services');
app.use(bodyParser.json());
app.use('/service', publisherService);
app.get('/', (req, res) => {
    res.send('I am here');
});

app.listen(8083);

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {
        console.log('connected to db')
    });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("database opened ...");
});

