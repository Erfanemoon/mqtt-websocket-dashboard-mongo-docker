// const mqtt = require('mqtt');
// const mongoose = require('mongoose');
// const Schema = require('./models/mqtt-data');
// mongoose.Promise = global.Promise;
// require('dotenv/config');
//
// const temperature_2 = require('./models/temperature_data').temperature2;
// const temperature_5 = require('./models/temperature_data').temperature5;
// let mqttClient = null;
// let settings = {
//     port: 1883
// }
// module.exports = {
//     getMqttInfo() {
//         let topic, msg;
//         return new Promise((resolve, reject) => {
//             mongoose.connect(process.env.DB_CONNECTION,
//                 {useNewUrlParser: true},
//                 () => {
//                     console.log('connected to db')
//                 });
//
//             let db = mongoose.connection;
//             db.on('error', console.error.bind(console, 'connection error:'));
//             db.once('open', function callback() {
//                 console.log("database opened ...");
//             });
//             Schema.findOne({}, {}, {sort: {'createdAt': -1}}, function (err, result) {
//                 console.log(result.toObject().topic);
//                 topic = result.toObject().topic;
//                 msg = result.toObject().message;
//             });
//             resolve(topic, msg);
//         })
//     },
//     mqttConnection(publisher, topic) {
//         if (publisher) {
//             mqttClient = mqtt.connect('mqtt://127.0.0.1', settings);
//             console.log('publisher connected');
//             mqttClient.publish(topic, msg);
//             console.log(topic + '   this is topic ***********');
//             console.log('publisher published to server');
//             mqttClient.on('message', (topic, message) => {
//                 let topic_room2_regex = '/temperature/' + /^2\/.*/;
//                 let topic_room5_regex = '/temperature/' + /^5\/.*/;
//                 let topic_all_rooms = '/temperature/' + /.*/;
//
//                 if (topic.match(topic_room2_regex)) {
//                     message = temperature_2;
//                     //msg = temperature_2;
//                 } else if (topic.match(topic_room5_regex)) {
//                     message = temperature_5;
//                     //msg = temperature_5;
//                 } else if (topic.match(topic_all_rooms)) {
//                     message = [temperature_2, temperature_5];
//                     //msg = [temperature_2, temperature_5];
//                 }
//             });
//         }
//     }
// }
//
//
//
//

// SubscriberSchema.findOne({}, {}, {sort: {'createdAt': -1}}, function (err, result) {
//     console.log(result.toObject().topic);
//     topic = result.toObject().topic;
//     msg = result.toObject().message;
// });