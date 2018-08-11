

const request = require('request') 


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
    }

}


module.exports = hubtelsms