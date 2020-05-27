function startConnect() {
    let topic = document.getElementById('topic').value;
    let host = document.getElementById('host').value;
    let port = document.getElementById('port').value;
    let clientId = 'ClientId-' + Math.random() * 100;
    client = new Paho.MQTT.Client(host, Number(port), topic, clientId);

    document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
    document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientId + '</span><br/>';

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    client.connect({
        timeout: 3,
        onSuccess: onConnect
    })
}

function onConnect() {
    topic = document.getElementById("topic").value;
    document.getElementById('messages').innerHTML += '<span>Subscribed to: ' + topic + '</span><br/>';
    client.subscribe(topic);
}

function onConnectionLost(responseObject) {
    console.log('onConnectionLost : connection lost');
    if (responseObject.errorCode !== 0) {
        console.log('error msg : ' + responseObject.errorMessage);
    }
}

function onMessageArrived(message) {
    console.log('onMessageArrived : ' + message.payloadString);
    document.getElementById("payload_messages").innerHTML += '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
    updateScroll();
}

function updateScroll() {
    let element = document.getElementById("messages");
    let payload_element = document.getElementById("payload_messages");
    element.scrollTop = element.scrollHeight;
    payload_element.scrollTop = payload_element.scrollHeight;
}

function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
    updateScroll(); // Scroll to bottom of window
}

function send_message() {
    document.getElementById("payload_messages").innerHTML = "";
    let msg = document.forms["smessage"]["message"].value;
    console.log(msg);

    let topic = document.forms["smessage"]["Ptopic"].value;
    message = new Paho.MQTT.Message(msg);
    if (topic === "")
        message.destinationName = "test-topic"
    else
        message.destinationName = topic;

    client.send(message);
    return false;
}