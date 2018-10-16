const request = require("request");
const querystring = require("querystring");
const isRequired = str => {
  throw new Error(`${str} is required`);
};

function hubtelsms(
  {
    clientid = isRequired("clientid"),
    secretid = isRequired("secretid")
  } = isRequired("object parameter with client and secrete Id's is required")
) {
  const config = { clientid, secretid };
  /**
 * Send sms or reschedule sms. Note for rescheduling you must add a time to the request body
 * @param {object} params

 */
  const sendSMS = (params = isRequired("message parameters")) => {
    return new Promise((resolve, reject) => {
      let url = `https://api.hubtel.com/v1/messages`;
      let auth =
        "Basic " +
        new Buffer(config.clientid + ":" + config.secretid).toString("base64");
      var options = {
        body: params,
        headers: {
          Authorization: auth
        },
        json: true
      };

      request.post(url, options, (err, response, body) => {
        return err ? reject(err) : resolve(body);
      });
    });
  };
  /**
 * Get the details of already sent messages by providing the messageId
 * @param {string} messageId

 */
  const getMessage = (messageId = isRequired("messageId")) => {
    return new Promise((resolve, reject) => {
      let url = `https://api.hubtel.com/v1/messages/${messageId}`;
      let auth =
        "Basic " +
        new Buffer(config.clientid + ":" + config.secretid).toString("base64");
      var options = {
        headers: {
          Authorization: auth
        },
        json: true
      };
      request.get(url, options, (err, response, body) => {
        return err ? reject(err) : resolve(body);
      });
    });
  };
  /** 
    * get all messages. You can provide in some query parameters
    * @param {string} params
   
    */

  const queryMessage = params => {
    return new Promise((resolve, reject) => {
      var query_params = querystring.stringify(params);
      var url = params
        ? `https://api.hubtel.com/v1/messages?${query_params}`
        : "https://api.hubtel.com/v1/messages";
      let auth =
        "Basic " +
        new Buffer(config.clientid + ":" + config.secretid).toString("base64");
      var options = {
        headers: {
          Authorization: auth
        },
        json: true
      };
      request.get(url, options, (err, response, body) => {
        return err ? reject(err) : resolve(body);
      });
    });
  };
  /** 
    * Rescheduled a scheduled messages by providing the messageId, datetime 
    * @param {string} messageId
    * @param {datetime} time
   
    */
  const rescheduleMessage = (
    messageId = isRequired("messageId"),
    time = isRequired("time")
  ) => {
    return new Promise((resolve, reject) => {
      var url = `https://api.hubtel.com/v1/messages/${messageId}`;
      let auth =
        "Basic " +
        new Buffer(config.clientid + ":" + config.secretid).toString("base64");
      var options = {
        body: { Time: time },
        headers: {
          Authorization: auth
        },
        json: true
      };

      request.put(url, options, (err, response, body) => {
        return err ? reject(err) : resolve(body);
      });
    });
  };

  /**
 * cancel already scheduled messages by providing the messageId
 * @param {string} messageId


 */

  const cancelMessage = (messageId = isRequired("messageId")) => {
    return new Promise((resolve, reject) => {
      var auth =
        "Basic " +
        new Buffer(config.clientid + ":" + config.secretid).toString("base64");
      var url = `https://api.hubtel.com/v1/messages/${messageId}`;
      var options = {
        headers: {
          Authorization: auth
        },
        json: true
      };

      request.delete(url, options, (err, response, body) => {
        return err ? reject(err) : resolve(body);
      });
    });
  };
  return Object.create({
    sendSMS,
    getMessage,
    queryMessage,
    rescheduleMessage,
    cancelMessage
  });
}

module.exports = hubtelsms;
