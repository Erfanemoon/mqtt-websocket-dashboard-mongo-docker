let mqtt = require('mqtt')
let temperature_2 = require('./models/temperature_data').temperature2;
let temperature_5 = require('./models/temperature_data').temperature5;
options = {
    port: 1883
}
client = mqtt.connect('mqtt://127.0.0.1', options);
client.subscribe('/temperature');
console.log('Client publishing.. ');
client.publish('/temperature/2/254', JSON.stringify(temperature_2));
client.publish('/temperature/5/512', JSON.stringify(temperature_5));