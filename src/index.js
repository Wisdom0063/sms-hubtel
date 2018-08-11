

const request = require('request')
 const querystring = require('querystring')


const hubtelsms = {
    /**
 * Send sms or reschedule sms. Note for rescheduling you must add a time to the request body
 * @param {object} params

 */
    sendSMS: (config)=>(params)=>{
        if(!config.secretid ||  !config.clientid){
            throw ('required parameters not provided')
        }
            return new Promise((resolve, reject) => {
                let url = `https://api.hubtel.com/v1/messages`;
                   let auth = "Basic " + new Buffer(config.clientid + ":" + config.secretid).toString("base64")
                var options = {
                    body: params,
                     headers : {
                              "Authorization" : auth,
                          },
                          json: true
                   }
          
                request.post(url, options, (err, response, body) => {
                    console.log(body)
                    return err? reject(err):resolve(body)
                })
              })

    },
        /**
 * Get the details of already sent messages by providing the messageId
 * @param {string} params
 * @param {object} config

 */
    getMessage:(config)=>(messageId)=>{
        if(!config.secretid ||  !config.clientid){
            throw ('required parameters not provided')
        }
        return new Promise((resolve, reject)=>{
            let url = `https://api.hubtel.com/v1/messages/${messageId}`
            let auth = "Basic " + new Buffer(config.clientid + ":" + config.secretid).toString("base64")
            var options = {
                 headers : {
                          "Authorization" : auth,
                      },
                      json: true
               }
            request.get(url, options, (err, response, body)=>{
                console.log(body)
                return err? reject(err):resolve(body)
            })


        })
    },
/** 
    * get all messages. You can provide in some query parameters
    * @param {string} params
    * @param {object} config
   
    */

    query_message:(config)=>(params)=>{
        if(!config.secretid ||  !config.clientid){
            throw ('required parameters not provided')
        }
    return new Promise((resolve, reject)=>{
        var query_params = querystring.stringify(params)
        var url = `https://api.hubtel.com/v1/messages?${query_params}`
        console.log(url)
        var auth = 'Basic'+ new Buffer(config.clientid + ":" +config.secretid).toString("base64")
        var options = {
            headers : {
                     "Authorization" : auth,
                 },
                 json: true
          }
          request.get(url, options, (err, response, body)=>{
              return err? reject(err):resolve(body)
              console.log(body)
          })
    })


    },
    /** 
    * Rescheduled a scheduled messages by providing the messageId, datetime 
    * @param {string} messageId
    * @param {object} config
    * @param {datetime} time
   
    */
   rescheduleMessage:(config)=>(messageId, time)=>{
    if(!config.secretid ||  !config.clientid){
        throw ('required parameters not provided')
    }
return new Promise((resolve, reject)=>{
    var url = `https://api.hubtel.com/v1/messages/${messageId}`
    var auth = 'Basic'+ new Buffer(config.clientid + ':' + config.secretid).toString('base64')
    var options = {
        body:{"Time": time},
        headers:{
            "Authorization" : auth,
        },
        json: true
    }

    request.put(url, options, (err, response, body)=>{
        return err?reject(err):resolve(body)
    })

})

   },



        /**
 * cancel already scheduled messages by providing the messageId
 * @param {string} messageId
 * @param {object} config

 */

 cancelMessage: (config)=>(messageId)=>{
    if(!config.secretid ||  !config.clientid){
        throw ('required parameters not provided')
    }

    return new Promise((resolve, reject)=>{
        var auth = 'Basic'+ new Buffer(config.clientid + ':' + config.secretid).toString('base64')
        var url = `https://api.smsgh.com/v3/messages/${messageId}`
        var options = {
            headers:{
                "Authorization" : auth,
            },
            json:true
        }

    request.delete(url, options, (err, response, body)=>{
        return err?reject(err):resolve(body)
    })

    })

 }

}


module.exports = hubtelsms