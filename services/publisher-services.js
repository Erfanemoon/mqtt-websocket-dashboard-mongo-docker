const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const SubscriberSchema = require('../models/mqtt-subscriber');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(express.json());
router.use(express.urlencoded());

router.get('/subscribers/list', async (req, res) => {
    SubscriberSchema.find({isConnected: 1}, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({message: err});
        }
        if (result !== null) {
            res.status(200).send(result);
        }
    });
});

// router.get('/sensors/list', (req, res) => {
//     try {
//         res.status(200).send([temperature_2, temperature_5]);
//     } catch (e) {
//         res.status(500).send({message: e})
//     }
// });

module.exports = router;


// mqttData.findOne({}, {}, {sort: {createdAt: -1}}, (err, result) => {
//     if (result === null) {
//         data.save().then(data => {
//             res.status(200).send(data);
//         }).catch(err => {
//             res.status(500).json(err);
//         });
//     } else {
//         if (result.topic !== req.body.topic || result.message !== req.body.message) {
//             mqttData.deleteOne({}, {sort: {_id: -1}});
//             result.topic = req.body.topic;
//             result.message = req.body.message;
//             result.save();
//             res.status(200).send({message: result.message, topic: result.topic});
//         } else {
//             res.send(result.topic);
//         }
//     }
// });