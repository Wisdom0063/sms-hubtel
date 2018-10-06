const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
const apiRoutes = express.Router();
app.use("/api/v1", apiRoutes);

const hubtelSMS = require("../src/index");

const SMS = hubtelSMS({
  clientid: "HubtelApplicationClientId",
  secretid: "HubtelApplicationSecreteId"
});

// base url is http://localhost:2000/api/v1/
apiRoutes.post("/send_message", async (req, res) => {
  let data = await SMS.sendSMS({
    From: "smsgh",
    To: "+233248183797",
    Content: "hello, world!",
    RegisteredDelivery: "true"
  });
  return res.json(data);
});

apiRoutes.post("/get_message", async (req, res) => {
  let data = await SMS.getMessage("messageIdHere");
  return res.json(data);
});

apiRoutes.post("/query_message", async (req, res) => {
  let data = await SMS.queryMessage({
    limit: 78
  });

  return res.json(data);
});

apiRoutes.post("/reschedule_message", async (req, res) => {
  let data = await SMS.rescheduleMessage(
    "messageIdHere",
    "2014-01-01 05:00:00"
  );
  return res.json(data);
});

apiRoutes.post("/cancel_message", async (req, res) => {
  var data = await SMS.cancelMessage("messageIdHere");
  return res.json(data);
});

app.listen(2000, () => {
  console.log("app running on port 2000");
});
