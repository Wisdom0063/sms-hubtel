## An npm package for sending message, scheduling and rescheduling message and retrieving data of an existing message, getting all messages, and cancelling scheduled messages using the hubtel send message api

### Usage

const hubtelSMS = require("../src/index");

const SMS = hubtelSMS({
clientid: "HubtelApplicationClientId",
secretid: "HubtelApplicationSecreteId"
});

## Send Message

SMS.sendSMS({
From: "Wisdom",
To: "+233509878941",
Content: "hello, world!",
RegisteredDelivery: true
})
.then((res)=>console.log(res))
.catch((error)=>console.log(error))

Example response {
"Status": 0,
"MessageId": "43cceb19d2a242f58fb338692e12c0bb",
"Rate": 0,
"NetworkId": "0"
}

NB: To send the message at a particular time add Time to the request object
Example is {
"From": "smsgh",
"To": "+233248183797",
"Content": "hello, world!",
"RegisteredDelivery": "true",
"Time": "2014-01-01 10:00:00"
}

Please visit https://developers.hubtel.com/documentations/sendmessage for more information
