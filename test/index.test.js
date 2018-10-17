const { assert, expect } = require("chai");
const should = require("chai").should();
const mock = require("nock");
const hubtelsms = require("../index");

describe("hubtel sms", () => {
  let config, sms, hubtelSMSUrl, mockRequest, url;
  before(() => {
    config = {
      clientid: "v=u+at",
      secretid: "F=ma"
    };
    sms = hubtelsms(config);
    url = "https://api.hubtel.com/v1/messages/";
  });

  describe("configuration", () => {
    it("it should throw an error with no configuration object provided", async () => {
      expect(() => hubtelsms()).throw(
        "object parameter with client and secrete Id's is required"
      );
    });
    it("it should throw an error with no clientid provided", async () => {
      expect(() => hubtelsms({ secretid: "v=u+at" })).throw(
        "clientid is required"
      );
    });
    it("it should throw an error with no secretid provided", async () => {
      expect(() => hubtelsms({ clientid: "v=u+at" })).throw(
        "secretid is required"
      );
    });
  });

  describe("send sms", () => {
    before(() => {
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
    it("it should throw an error with message parameters is required", async () => {
      expect(() => sms.sendSMS()).throw("message parameters is required");
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
    before(() => {
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
    it("it should throw an error with messageId is required", async () => {
      expect(() => sms.getMessage()).throw("messageId is required");
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
    before(() => {
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
    before(() => {
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
    it("it should throw an error with messageId is required", async () => {
      expect(() => sms.rescheduleMessage()).throw("messageId is required");
    });
    it("it should throw an error with time is required", async () => {
      expect(() => sms.rescheduleMessage("")).throw("time is required");
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
    hubtelSMSUrl = url;
    before(() => {
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
    it("it should throw an error with messageId is required", async () => {
      expect(() => sms.cancelMessage()).throw("messageId is required");
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
