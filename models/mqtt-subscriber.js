const mongoose = require('mongoose');
let SubscriberSchema = mongoose.Schema({
    clientId: String,
    topic: String,
    isConnected: Number,
    type:String
})

module.exports = mongoose.model('subscribers', SubscriberSchema);