const express = require('express')
//const mongoose = require("mongoose") 
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const app = express()
//mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) 
require('./config/mongoose')

const routes = require('./routes') //預設會去找底下的index.js

// const db = mongoose.connection

// db.on('error', () => {
//     console.log('mongodb error!')
// })

// db.once('open', () => {
//     console.log('mongodb connected!')
// })

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))
app.use(routes)

app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})