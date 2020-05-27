const mongoose = require('mongoose');

let MQTTSchema = mongoose.Schema({
    topic: String,
    message: String,
})

module.exports = mongoose.model('mqtts', MQTTSchema);
