const { assert, expect } = require("chai");
const should = require("chai").should();
const mock = require("nock");
const hubtelsms = require("../src/index");

describe("hubtel sms", () => {
  let config, sms, hubtelSMSUrl, mockRequest, url;
  beforeEach(() => {
    config = {
      clientid: "v=u+at",
      secretid: "F=ma"
    };
    sms = hubtelsms(config);
    url = "https://api.hubtel.com/v1/messages/";
  });

  describe("send sms", () => {
    beforeEach(() => {
      hubtelSMSUrl = url;
      mockRequest = mock(hubtelSMSUrl, {
        reqheaders: {
          Authorization:
            "Basic " +
            new Buffer(config.clientid + ":" + config.secretid).toString(
              "base64"
            )
        }
      }).post("", {});
    });
    it("it should resolve and return an object", async () => {
      mockRequest.reply(200, {
        Status: 0,
        MessageId: "43cceb19d2a242f58fb338692e12c0bb",
        Rate: 0,
        NetworkId: "0"
      });
      let data = await sms.sendSMS({});
      expect(data.Status).to.equal(0);
      expect(typeof data).to.equal("object");
    });
    it("it should reject and return an error", async () => {
      mockRequest.reply(400, {
        message: "Error occurred"
      });
      let data = await sms.sendSMS({});
      expect(typeof data).to.equal("object");
    });
  });
  describe("get message", () => {
    let messageId = "43cceb19d2a242f58fb338692e12c0bb";
    hubtelSMSUrl = url + messageId;
    beforeEach(() => {
      mockRequest = mock(hubtelSMSUrl, {
        reqheaders: {
          Authorization:
            "Basic " +
            new Buffer(config.clientid + ":" + config.secretid).toString(
              "base64"
            )
        }
      }).get(`/`);
    });
    it("it should resolve and return an object", async () => {
      mockRequest.reply(200, {
        MessageId: "6f19395db2fb497ea4ebd1e218dd3e4c",
        From: "Seinti",
        To: "+233208183783",
        Time: "2013-06-02 10:56:34",
        UpdateTime: "2013-08-12 17:11:42",
        NetworkId: "62001",
        Units: 1,
        Rate: 1,
        Status: "Undeliverable",
        Content: "hello, Kwadwo!"
      });
      let data = await sms.getMessage("");
      expect(typeof data).to.equal("object");
    });
    it("it should reject and return an error", async () => {
      mockRequest.reply(400, {
        message: "No message found"
      });
      let data = await sms.getMessage("");
      expect(typeof data).to.equal("object");
    });
  });
  describe("query message", () => {
    hubtelSMSUrl = url;
    beforeEach(() => {
      mockRequest = mock(hubtelSMSUrl, {
        reqheaders: {
          Authorization:
            "Basic " +
            new Buffer(config.clientid + ":" + config.secretid).toString(
              "base64"
            )
        }
      }).get(``);
    });
    it("it should resolve and return an object", async () => {
      mockRequest.reply(200, {
        TotalPages: 1,
        Messages: [
          {
            Rate: 0,
            Units: 1,
            MessageId: "4e60fb0b-a562-42bd-bf4a-22f1361c853d",
            Content: "hello, world!",
            Status: "Out of Credit",
            NetworkId: "62002",
            UpdateTime: "2018-10-06 02:43:05",
            Time: "2018-10-06 02:43:05",
            Direction: "out",
            To: "+233509878941",
            From: "Wisdom"
          }
        ]
      });
      let data = await sms.queryMessage();
      expect(typeof data).to.equal("object");
    });
    it("it should reject and return an error", async () => {
      mockRequest.reply(400, {
        message: "No message found"
      });
      let data = await sms.queryMessage();
      expect(typeof data).to.equal("object");
    });
  });
  describe("Reschedule scheduled message", () => {
    let messageId = "43cceb19d2a242f58fb338692e12c0bb";
    hubtelSMSUrl = url;
    beforeEach(() => {
      mockRequest = mock(hubtelSMSUrl, {
        reqheaders: {
          Authorization:
            "Basic " +
            new Buffer(config.clientid + ":" + config.secretid).toString(
              "base64"
            )
        }
      }).put("/6f19395db2fb497ea4ebd1e218dd3e4c", {
        Time: "2013-08-12 17:11:42"
      });
    });
    it("it should resolve and return an object", async () => {
      mockRequest.reply(200, {
        Message: "Success"
      });
      let data = await sms.rescheduleMessage(
        "6f19395db2fb497ea4ebd1e218dd3e4c",
        "2013-08-12 17:11:42"
      );
      expect(typeof data).to.equal("object");
    });
    it("it should reject and return an error", async () => {
      mockRequest.reply(400, {
        message: "No message found"
      });
      let data = await sms.rescheduleMessage(
        "6f19395db2fb497ea4ebd1e218dd3e4c",
        "2013-08-12 17:11:42"
      );
      expect(typeof data).to.equal("object");
    });
  });
  describe("Cancel scheduled message", () => {
    let messageId = "43cceb19d2a242f58fb338692e12c0bb";
    hubtelSMSUrl = url;
    beforeEach(() => {
      mockRequest = mock(hubtelSMSUrl, {
        reqheaders: {
          Authorization:
            "Basic " +
            new Buffer(config.clientid + ":" + config.secretid).toString(
              "base64"
            )
        }
      }).delete("/6f19395db2fb497ea4ebd1e218dd3e4c");
    });
    it("it should resolve and return an object", async () => {
      mockRequest.reply(200, {
        Message: "Success"
      });
      let data = await sms.cancelMessage("6f19395db2fb497ea4ebd1e218dd3e4c");
      expect(typeof data).to.equal("object");
    });
    it("it should reject and return an error", async () => {
      mockRequest.reply(400, {
        message: "No message found"
      });
      let data = await sms.cancelMessage("6f19395db2fb497ea4ebd1e218dd3e4c");
      expect(typeof data).to.equal("object");
    });
  });
});
