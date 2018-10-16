## An npm package for sending message, scheduling and rescheduling message and retrieving data of an existing message, getting all messages, and cancelling scheduled messages using the hubtel send message api

## Usage

```javascript
const hubtelSMS = require("sms-hubtel");
```

```javascript
const SMS = hubtelSMS({
  clientid: "HubtelApplicationClientId",
  secretid: "HubtelApplicationSecreteId"
});
```

### Send Message

```javascript
SMS.sendSMS({
  From: "Sender", //Sender
  To: "+233509879941", //Receiver
  Content: "hello, world!",
  RegisteredDelivery: true
})
  .then(res => console.log(res))
  .catch(error => console.log(error));
```

```javascript
Sample response
 {
"Status": 0,
"MessageId": "43cceb19d2a242f58fb338692e12c0bb",
"Rate": 0,
"NetworkId": "0"
}
```

NB: To send the message at a particular time (schedule) add Time to the request object
Example is

```javascript
 {
"From": "smsgh",
"To": "+233248183797",
"Content": "hello, world!",
"RegisteredDelivery": "true",
"Time": "2014-01-01 10:00:00"
}
```

### Get message

```javascript
SMS.getMessage("messageID").then(data => {
  console.log(data);
});
```

Sample Response

```javascript
{
    "MessageId": "6f19395db2fb497ea4ebd1e218dd3e4c",
    "From": "Seinti",
    "To": "+233208183783",
    "Time": "2013-06-02 10:56:34",
    "UpdateTime": "2013-08-12 17:11:42",
    "NetworkId": "62001",
    "Units": 1,
    "Rate": 1,
    "Status": "Undeliverable",
    "Content": "hello, Kwadwo!"
}
```

### Query message (Get all your messages)

```javascript
SMS.queryMessage().then(data => {
  console.log(data);
});
```

Sample Response

```javascript
{
  "TotalPages": 1,
  "Messages": [
    {
      "Rate": 0,
      "Units": 1,
      "MessageId": "4e60fb0b-a562-42bd-bf4a-22f1361c853d",
      "Content": "hello, world!",
      "Status": "Out of Credit",
      "NetworkId": "62002",
      "UpdateTime": "2018-10-06 02:43:05",
      "Time": "2018-10-06 02:43:05",
      "Direction": "out",
      "To": "+233509879941",
      "From": "Kwadwo"
    },
    {
      "Rate": 0,
      "Units": 1,
      "MessageId": "c1fc94c4-3c3e-4750-9176-966959d93620",
      "Content": "Hello John",
      "Status": "Out of Credit",
      "NetworkId": "62002",
      "UpdateTime": "2018-10-14 12:17:08",
      "Time": "2018-10-14 12:17:08",
      "Direction": "out",
      "To": "+233509879941",
      "From": "John"
    },
    {
      "Rate": 0,
      "Units": 1,
      "MessageId": "190cbcc7-8368-456c-a412-f5f754abcd71",
      "Content": "Hello John",
      "Status": "Out of Credit",
      "NetworkId": "62002",
      "UpdateTime": "2018-10-14 14:15:05",
      "Time": "2018-10-14 14:15:05",
      "Direction": "out",
      "To": "+233509879941",
      "From": "John"
    }
  ]}
  ,
```

NB:You can provide a query parameter

```javascript
SMS.queryMessage({ limit: 10 }).then(data => {
  console.log(data);
});
```

### Reschedule schedule message

```javascript
SMS.rescheduleMessage(
  "MessageID",
  "2013-08-12 17:11:42" // Time
).then(data => {
  console.log(data);
});
```

### Cancel schedule message

```javascript
SMS.cancelMessage("MessageID").then(data => {
  console.log(data);
});
```

## Test

```javascript
npm run test
```

Please visit https://developers.hubtel.com for more information
