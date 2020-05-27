let mqtt = require('mqtt')
options = {
    port: 1883
}
client = mqtt.connect('mqtt://127.0.0.1', options);
client.subscribe('presence');
client.on('message', function (topic, message) {
    console.log(message.toString());
});
console.log('Client started...');