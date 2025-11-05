const express = require('express')
const app = express()
const cors = require('cors')
const { partRoute } = require('./controllers/partRoute')

app.use(express.json())
app.use(cors({
  origin:"https://atrr.netlify.app/",
  credentials:true,
}))

app.get('/',(req,res)=>{
    try {
      res.status(200).send(`it is now working properly 😉`)
    } catch (error) {
        res.status(500).json(`some thing is worng 🥳 hurry 💩`)
    }
})

// Participant routes
app.use('/api/participants', partRoute)

module.exports={app}