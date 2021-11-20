require("dotenv").config()
const express = require("express")
const cors = require("cors")

const authRoutes = require('./routes/auth.js')
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_ACCOUNT_AUTH_TOKEN
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID
const twilioClient = require('twilio')(accountSid, authToken); 
 
twilioClient.messages 
      .create({         
         to: '+264856935369' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();

app.get("/", (req, res) => {
 res.send("Hello mack. That's you, right? ")
})

app.post("/", (req, res) => {
    const { message, user: sender, type, members } = req.body

    if(type === 'message.new') {
        members
            .filter((member) => member.user.id !== sender.id )
            .forEach(( { user }) => {
                if(!user.online) {
                    twilioClient.message.create({
                        body: `New message from ${message.user.fullName} => ${message.text}`,
                        messagingServiceSid: messagingServiceSid,
                        to: user.phoneNumber
                    })
                    .then(() => console.log(`Message sent at ${new Date().toUTCString()}`))
                    .catch((error) => console.log(error))
                }
            })

    }
})

app.use('/auth', authRoutes)


app.listen(PORT, () => {
    console.log(`server running on port ${PORT} `)
})