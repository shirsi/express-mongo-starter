/*
************************************************
DEPENDENCIES
************************************************
*/


const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')

/*
************************************************
CONFIGURATION
************************************************
*/

require('dotenv').config()
const app = express()
const db = mongoose.connection
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/travelguide"




/*
************************************************
MIDDLEWARE
************************************************
*/
console.log(process.env.SECRET);

app.use(express.urlencoded({
  extended: false
}))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

mongoose.connect(
  mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => {
    console.log('the connection with mongod is established at', mongodbURI)
  }
)

db.on('error', err => console.log(err.message + ' is mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))



/*
************************************************
CONTROLLERS
************************************************
*/

const postsController = require('./controllers/posts_controller.js')
const usersController = require('./controllers/users_controller.js')
const sessionsController = require('./controllers/sessions_controller.js')


app.use('/sessions', sessionsController)
app.use('/users', usersController)
app.use('/Travelguide', postsController)






app.get('/', (req, res) => {
  res.redirect('/travelguide')
})

app.listen(PORT, (rea, res) => {
  console.log('listening on port', PORT);
})
