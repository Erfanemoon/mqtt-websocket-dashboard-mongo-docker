const mosca = require('mosca');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv/config');
const SubscriberSchema = require('./models/mqtt-subscriber');
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

let settings = {
    port: 1883,
    persistence: mosca.persistence.Memory,
    http: {port: 3000, bundle: true, static: './'}
};

// here we start mosca
let server = new mosca.Server(settings, function () {
    console.log('mosca server running');
});
// fired when the mqtt server is ready
server.on('ready', function () {
    console.log(Date() + ' Mosca server is up and running');
    db.dropCollection('subscribers');
});

// fired when a client is connected
server.on('clientConnected', function (client) {
    console.log('Client Connected: ', client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
    console.log('Published : ', packet.payload.toString());
});

// fired when a client subscribes to a topic
server.on('subscribed', function (topic, client) {
    console.log('Subscribed : ', topic, " from : ", client.id);
    let subscriberType = '';
    if (client.id.includes('ClientId-')) {
        subscriberType = 'Subscriber';
    } else
        subscriberType = 'publisher';
    let data = new SubscriberSchema({
        clientId: client.id,
        topic: topic,
        isConnected: 1,
        type: subscriberType
    })
    SubscriberSchema.findOne({clientId: client.id}, (err, result) => {
        if (result === null) {
            data.save().then((err) => {
                console.log(err);
            })
        } else {
            SubscriberSchema.deleteOne({clientId: client.id});
            result.clientId = client.id;
            result.topic = topic;
            result.isConnected = 1;
            result.type = subscriberType;
            result.save();
        }
    });
});

// fired when a client subscribes to a topic
server.on('unsubscribed', function (topic, client) {
    console.log('Unsubscribed : ', topic, " from : ", client.id);
    SubscriberSchema.findOne({clientId: client.id}, (err, result) => {
        if (result !== null) {
            SubscriberSchema.deleteOne({clientId: client.id});
            result.clientId = client.id;
            result.topic = topic;
            result.isConnected = 0;
            result.save();
        }
    })
});

// fired when a client is disconnected
server.on('clientDisconnected', function (client) {
    console.log('Client Disconnected : ', client.id);
});


