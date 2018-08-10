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

const send_sms = sendSMS({
    clientid: 'bxd34kou',
    secretid: 'rfiz45dm'
})

apiRoutes.post('/send_message', async (req, res)=>{

  let data =  await send_sms({
    from:'Wisdom',
    To: "+233248183797", 
    Content: "hello, world!",
    RegisteredDelivery: true
})
console.log(data)
return res.json(data)
})

apiRoutes.post('/get_message', async (req, res)=>{
    let data = await getMessage('jfhfhfjfjfjfhfjhfjfj')
    return res.json(data)
})




app.listen(2000, ()=>{
    console.log('app running on port 2000')
})