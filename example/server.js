const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
const apiRoutes = express.Router(); 
app.use('/api/v1', apiRoutes);

const {sendSMS} = require('../src/index')

const {getMessage} = require('../src/index')

const {query_message} = require('../src/index')

const {rescheduleMessage} = require('../src/index')

const {cancelMessage} = require('../src/index')

const send_sms = sendSMS({
    clientid: 'bxd34kou',
    secretid: 'rfiz45dm'
})

const get_message = getMessage({
    clientid: 'bxd34kou',
    secretid: 'rfiz45dm'
})

const query = query_message({
    clientid: 'bxd34kou',
    secretid: 'rfiz45dm'
})

const reschedule = rescheduleMessage({
    clientid: 'bxd34kou',
    secretid: 'rfiz45dm'
})

const cancel_message = cancelMessage({
    clientid: 'bxd34kou',
    secretid: 'rfiz45dm'
})
// base url is http://localhost:2000/api/v1/
apiRoutes.post('/send_message', async (req, res)=>{

  let data =  await send_sms({
    from:'Wisdom',
    To: "+233509878941", 
    Content: "hello, world!",
    RegisteredDelivery: true
})
console.log(data)
return res.json(data)
})

apiRoutes.post('/get_message', async (req, res)=>{
    let data = await get_message('messageIdHere')
    return res.json(data)
})

apiRoutes.post('/query_message', async (req, res)=>{
    let data = await query({
        "limit":78
    })

    return res.json(data)
})

apiRoutes.post('/reschedule_message', async (req, res)=>{
    let data = await reschedule('messageIdHere', "2014-01-01 05:00:00")
    return res.json(data)
})

apiRoutes.post('/cancel_message', async (req, res)=>{
    var data = await cancel_message('messageIdHere')
    return res.json(data)
})






app.listen(2000, ()=>{
    console.log('app running on port 2000')
})